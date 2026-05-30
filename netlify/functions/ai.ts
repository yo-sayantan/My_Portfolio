
import { GoogleGenAI, Type } from "@google/genai";

// Support both variable names
const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

export default async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Graceful fallback if keys are missing (Demo Mode)
  if (!apiKey) {
    console.warn("Server: API_KEY (or GEMINI_API_KEY) is missing.");
    return new Response(JSON.stringify({ mode: 'demo', text: '' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  try {
    const body = await req.json();
    const { message, history, systemInstruction } = body;

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Define Schema for structured output
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        answer: {
          type: Type.STRING,
          description: "The natural language response to the user's query. Use Markdown for formatting.",
        },
        suggestions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "3 to 4 short, relevant follow-up questions the user might want to ask next based on this answer. Keep them under 6 words.",
        },
      },
      required: ["answer", "suggestions"],
    };

    // Format history for Gemini API
    // Frontend sends: { role: 'user' | 'model', text: string }
    // SDK expects: { role: string, parts: [{ text: string }] }
    const contents = (history || []).map((msg: any) => ({
        role: msg.role,
        parts: [{ text: msg.text }]
    }));

    // Add the current user message
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    return new Response(JSON.stringify({ text: response.text }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error: any) {
    console.error("Gemini Function Error:", error);
    return new Response(JSON.stringify({ error: error.message || "AI Service Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
