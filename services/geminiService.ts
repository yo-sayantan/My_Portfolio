
import { OWNER } from '../ownerConfig';

export interface ChatHistoryItem {
  role: 'user' | 'model';
  text: string;
}

export interface AIResponse {
  text: string;
  suggestions: string[];
}

/**
 * Sends a message to the Netlify Function proxy to avoid exposing API keys.
 */
export const sendMessageToGemini = async (
  message: string,
  history: ChatHistoryItem[] = []
): Promise<AIResponse> => {
  try {
    // The system prompt is built server-side (see services/aiContext.ts); only page context is sent.
    const currentPath = typeof window !== 'undefined' ? `${window.location.pathname}${window.location.hash}` : '/';

    const response = await fetch('/.netlify/functions/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history,
        pagePath: currentPath
      })
    });

    if (!response.ok) {
      if (response.status === 404 && typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        return {
          text: `I'm currently running in **Local Frontend-only Mode**.\n\nIn the live production environment, I connect seamlessly to Google's Gemini AI to answer questions about ${OWNER.firstName}'s experience!`,
          suggestions: ["View Projects", `Contact ${OWNER.firstName}`, "Check Skills"]
        };
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server Error: ${response.status}`);
    }

    const data = await response.json();

    // Handle Demo Mode response from backend
    if (data.mode === 'demo') {
      return {
        text: `I'm currently running in **Demo Mode** because the API key is being configured securely on the server. \n\nIn a live environment, I would use Google's Gemini AI to answer your questions about ${OWNER.firstName}'s experience with Java, Microservices, and Cloud Architecture.`,
        suggestions: ["View Projects", `Contact ${OWNER.firstName}`, "Check Skills"]
      };
    }

    // Parse the JSON response from Gemini
    // The backend returns the raw text which should be a JSON string due to the schema
    let parsedContent;
    try {
      parsedContent = typeof data.text === 'string' ? JSON.parse(data.text) : data.text;
    } catch (e) {
      console.error("Failed to parse AI JSON response", e);
      parsedContent = { answer: data.text, suggestions: [] };
    }

    return {
      text: parsedContent.answer || "I'm thinking... but I couldn't generate a response right now.",
      suggestions: parsedContent.suggestions || []
    };

  } catch (error) {
    console.error("Gemini Service Error:", error);
    return {
      text: "I'm having a bit of trouble connecting to the server right now. Please try again in a moment!",
      suggestions: ["Try again later", `Contact ${OWNER.firstName} directly`]
    };
  }
};
