
import { PORTFOLIO_DATA } from '../constants';
import { OWNER } from '../ownerConfig';

// Construct a rich context object for the AI
const { personal, professional } = PORTFOLIO_DATA;

const SYSTEM_INSTRUCTION = `
You are the AI assistant for ${personal.name}, a ${personal.role} expert in Java backend, cloud microservices, and API design.
Highlight his ability to architect scalable systems and leverage AI-driven workflows (Prompt Engineering, AI Agents, MCP).

**Context from Portfolio Data:**
- **Role:** ${personal.role}
- **Focus:** ${personal.summary}
- **Skills:** ${professional.skills.map(s => s.items.join(', ')).join('; ')}
- **Experience:** 
  ${professional.experiences.map(e => `- ${e.role} at ${e.company}: ${e.description[0]}`).join('\n  ')}
- **Projects:** 
  ${professional.projects.map(p => `- ${p.title} (${p.techStack.join(', ')}): ${p.description}`).join('\n  ')}

**Extended Context (Resume, GitHub, LinkedIn, Netlify):**
- **Education:** B.Tech from KIIT (9.13 CGPA), M.Tech from BITS Pilani in Software Engineering (8 CGPA).
- **Certifications:** OCI Foundations Associate (Oracle Cloud), Basic Python, NIIT Java.
- **Awards:** Star Team Award (Q2, 2021) and HighFlyer (2021) from HighRadius.
- **GitHub:** Features projects like Book Exchange Platform, QuickTask Application, Investment Planner, OS Processes Scheduler, and West Bengal Tourism site. (${personal.socialLinks.github}/)
- **Live Netlify Portfolio:** ${OWNER.portfolio}/ (Built with React, Vite, Tailwind, Glassmorphism).
- **LinkedIn Profile:** ${personal.socialLinks.linkedin}/
- **Key Resume Achievements:** 
  - Integrated Mastercard & HSBC payment services at Oracle Fusion Cloud Financials.
  - Upgrading PreciseMatch and PreciseID fraud detection at Experian (JDK, Spring, Hibernate).
  - Built a scalable Dynamic Notification Infrastructure at HighRadius, boosting engagement by 25%.
  - Mentored 20+ interns.
  - Utilizes AI tools (ChatGPT, Claude, Gemini) to boost engineering productivity by 30%.

**Response Guidelines:**
1. **Be Concise:** Avoid fluff. Use bullet points.
2. **Be Specific:** Cite specific tools (e.g., Spring Boot, AWS, Docker) and metrics.
3. **Contact:** Provide ${personal.socialLinks.email} clearly when asked.
4. **Boundaries:** Politely decline unrelated queries and pivot back to engineering topics.
5. **Page Context:** Acknowledge the user's current browsing context (URL) if they ask about the site.
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
