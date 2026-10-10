import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { ECOSORT_SYSTEM_PROMPT } from '@/lib/prompts';
import { WasteAnalysisResult } from '@/lib/types';

// Force nodejs runtime for serverless execution with @google/genai
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json(
        {
          success: false,
          error: 'Gemini API key is not configured on the server. Please set GEMINI_API_KEY in .env.local or Vercel environment variables.',
        },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || !body.image) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request: No image payload provided. Please supply a valid base64 image string.',
        },
        { status: 400 }
      );
    }

    const rawImage = String(body.image);
    // Strip data URL prefixes (e.g., data:image/jpeg;base64,)
    const base64Data = rawImage.replace(/^data:image\/[a-zA-Z+]+;base64,/, '').trim();

    if (!base64Data || base64Data.length < 50) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid image data: The uploaded image string is malformed or empty.',
        },
        { status: 400 }
      );
    }

    // Rough check on decoded size (base64 is ~1.33x raw binary)
    const approxBytes = (base64Data.length * 3) / 4;
    if (approxBytes > 4.2 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          error: 'Payload Too Large: Image exceeds 4MB serverless threshold. Please ensure client compression is applied.',
        },
        { status: 413 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Models to try in order of capability & availability
    const candidateModels = ['gemini-3.8-flash', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
    let lastError: Error | null = null;
    let rawText: string | null = null;

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: [
            ECOSORT_SYSTEM_PROMPT,
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: base64Data,
              },
            },
          ],
        });

        if (response && response.text) {
          rawText = response.text;
          break;
        }
      } catch (err: any) {
        lastError = err;
        // If it's a 404 for model availability, continue to next candidate
        if (err?.message?.includes('NOT_FOUND') || err?.message?.includes('404')) {
          continue;
        }
        // If it's a quota or permission issue, break immediately
        throw err;
      }
    }

    if (!rawText) {
      throw lastError || new Error('No response returned by AI model.');
    }

    // Defensive parsing: Clean markdown code fences if model enclosed JSON
    let cleanedJson = rawText.trim();
    if (cleanedJson.startsWith('```')) {
      cleanedJson = cleanedJson.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    }

    // Extract first JSON object boundaries if extra commentary surrounds it
    const firstBrace = cleanedJson.indexOf('{');
    const lastBrace = cleanedJson.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleanedJson = cleanedJson.slice(firstBrace, lastBrace + 1);
    }

    let parsed: WasteAnalysisResult;
    try {
      parsed = JSON.parse(cleanedJson);
    } catch (parseErr) {
      console.error('Failed to parse Gemini output:', cleanedJson);
      return NextResponse.json(
        {
          success: false,
          error: 'AI Parsing Failure: The model output could not be formatted into structured waste instructions.',
          rawOutput: process.env.NODE_ENV === 'development' ? cleanedJson : undefined,
        },
        { status: 502 }
      );
    }

    // Validate essential keys
    if (!parsed.item_name || !parsed.category || !parsed.preparation_steps || !parsed.disposal_instructions) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid AI schema: Missing critical waste segregation fields.',
        },
        { status: 502 }
      );
    }

    // Normalize category to official SBM-U 2.0 list
    const validStreams = ['Wet Waste', 'Dry Waste', 'Sanitary Waste', 'Domestic Hazardous Waste'];
    if (!validStreams.includes(parsed.category)) {
      if (parsed.category.toLowerCase().includes('wet') || parsed.category.toLowerCase().includes('organic')) {
        parsed.category = 'Wet Waste';
      } else if (parsed.category.toLowerCase().includes('hazard') || parsed.category.toLowerCase().includes('battery')) {
        parsed.category = 'Domestic Hazardous Waste';
      } else if (parsed.category.toLowerCase().includes('sanitary')) {
        parsed.category = 'Sanitary Waste';
      } else {
        parsed.category = 'Dry Waste';
      }
    }

    return NextResponse.json({
      success: true,
      data: parsed,
    });
  } catch (error: any) {
    console.error('EcoSort API Analysis error:', error?.message || error);
    const isRateLimit = error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED');
    
    return NextResponse.json(
      {
        success: false,
        error: isRateLimit
          ? 'API rate limit reached. Please wait a moment and retry.'
          : error?.message || 'Unexpected error analyzing waste item. Please try again.',
      },
      { status: isRateLimit ? 429 : 500 }
    );
  }
}
