
import { PORTFOLIO_DATA } from '../constants';

// Construct a rich context object for the AI
const { personal, professional } = PORTFOLIO_DATA;

const SYSTEM_INSTRUCTION = `
You are the AI assistant for ${personal.name}, a Senior Software Engineer expert in Java backend, cloud microservices, and API design.
Highlight his ability to architect scalable systems and leverage AI-driven workflows (Prompt Engineering, AI Agents, MCP).

**Context:**
- **Role:** ${personal.role}
- **Focus:** ${personal.summary}
- **Skills:** ${professional.skills.map(s => s.items.join(', ')).join('; ')}
- **Experience:** 
  ${professional.experiences.map(e => `- ${e.role} at ${e.company}: ${e.description[0]}`).join('\n  ')}
- **Projects:** 
  ${professional.projects.map(p => `- ${p.title} (${p.techStack.join(', ')}): ${p.description}`).join('\n  ')}
- **Contact:** ${personal.socialLinks.email}

**Response Guidelines:**
1. **Be Concise:** Avoid fluff. Use bullet points.
2. **Be Specific:** Cite specific tools (e.g., Spring Boot, AWS, Docker) and metrics.
3. **Contact:** Provide ${personal.socialLinks.email} clearly when asked.
4. **Boundaries:** Politely decline unrelated queries and pivot back to engineering topics.
`;

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
    // Add current page context if available
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'Unknown';
    const systemInstructionWithContext = `${SYSTEM_INSTRUCTION}\n\nUser Context: Browsing ${currentUrl}`;

    const response = await fetch('/.netlify/functions/ai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message,
            history,
            systemInstruction: systemInstructionWithContext
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server Error: ${response.status}`);
    }

    const data = await response.json();

    // Handle Demo Mode response from backend
    if (data.mode === 'demo') {
        return {
            text: "I'm currently running in **Demo Mode** because the API key is being configured securely on the server. \n\nIn a live environment, I would use Google's Gemini AI to answer your questions about Sayantan's experience with Java, Microservices, and Cloud Architecture.",
            suggestions: ["View Projects", "Contact Sayantan", "Check Skills"]
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
      suggestions: ["Try again later", "Contact Sayantan directly"]
    };
  }
};
