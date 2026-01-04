
import { GoogleGenAI, Type } from "@google/genai";

// Always use the named parameter 'apiKey' and the process.env.API_KEY directly as required.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMediaSuggestions = async (prompt: string) => {
  // Use gemini-3-flash-preview for basic text recommendation tasks.
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Recommend 3 songs or videos based on this request: ${prompt}. Focus on popular and evergreen content.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ["title", "description", "reason"]
            }
          }
        },
        required: ["suggestions"]
      }
    }
  });

  try {
    // The response text is accessed as a property, not a method.
    const jsonStr = response.text?.trim() || '{"suggestions": []}';
    return JSON.parse(jsonStr) as { suggestions: any[] };
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    return { suggestions: [] };
  }
};
