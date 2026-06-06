
/**
 * Owner Configuration — Single Source of Truth
 * 
 * All personal identity data (name, email, social links, etc.) is defined here.
 * This file has ZERO external dependencies so it can be safely imported by:
 *   - Frontend components (via constants.ts)
 *   - Netlify serverless functions (via direct import)
 * 
 * ⚠️  Update credentials HERE — they propagate everywhere automatically.
 */

export const OWNER = {
  name: "Sayantan Biswas",
  firstName: "Sayantan",
  role: "Senior Software Engineer",
  company: "Experian",
  email: "sayantanbiswas.mycareer@gmail.com",
  phone: "+917381183721",
  github: "https://github.com/yo-sayantan",
  linkedin: "https://www.linkedin.com/in/yo-sayantan",
  portfolio: "https://sayantan-myportfolio.netlify.app",
  avatarUrl: "https://github.com/yo-sayantan.png",
  location: "Kondapur, Hyderabad",
  locationUrl: "https://maps.google.com/?q=Kondapur,+Hyderabad,+Telangana",
} as const;
