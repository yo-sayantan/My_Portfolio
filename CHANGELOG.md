# Changelog

All notable changes to this portfolio are documented here. GitHub Releases use the same notes.

The site is a React 19, TypeScript, and Vite portfolio for Sayantan Biswas. It deploys to [Netlify](https://sayantan-myportfolio.netlify.app) and GitHub Pages.

## [3.0.0] — 2026-10-25

The About workflow card and the Education column. This release sits on top of [v2.1](https://github.com/yo-sayantan/My_Portfolio/releases/tag/v2.1).

### Added

- Three certifications: Basics of Mutual Funds (INDmoney, 05/2023), Microsoft Technology Associate (NIIT, 07/2019), and Microsoft Imagine Academy (NIIT, 07/2019). The list stays newest first.
- The Intelligent Workflow card names three practices: MCP servers wired to Jira, Bitbucket, Jenkins, and Dynatrace; agent-assisted coding, tests, and documentation across the SDLC; and AI Jira Board, where local Ollama or cloud models write ticket briefs and PR readiness reports.
- Tool chips for Claude Code, Cursor, ChatGPT, Gemini, Ollama, and MCP Servers.
- Two result figures on that card: about 50% team productivity at Experian, and a 30% productivity gain at Oracle.

### Changed

- The Intelligent Workflow card is a static dark panel. It no longer scales on hover. A cyan grid, a top wash, and a border glow are the only motion.
- Education and certification columns stretch to the same height. Certificate rows share that height equally, so adding certificates does not leave a short column beside Education. Dates stay on one line.
- Skills, Projects, Education, and Contact grids set an explicit single column on small screens, with slightly tighter gaps until the `md` breakpoint.

## [2.1.0] — 2026-10-25

Project cards and the skills section now explain the work instead of only listing it. This release sits on top of [v2.0](https://github.com/yo-sayantan/My_Portfolio/releases/tag/v2.0).

### Added

- Each project can carry a one-line `summary`, a `requirements` list ("Run it with"), and a `skills` list ("Skills demonstrated"). Personal projects and the portfolio entry itself include both lists. The detail window renders them under the write-up.
- `Project` in `types.ts` documents those fields so the card, the modal, and the AI context stay aligned.
- Eight skill categories, up from four: Backend Engineering, Architecture & Integration, Cloud & Containers, Databases & Performance, AI & Agentic Engineering, Frontend & Mobile, DevOps, Quality & Tooling, and Domain Expertise. Each category has its own icon and color.
- SchoolConnect v3.0 replaces the generic School Connect blurb: Java 21 and Spring Boot 3 microservices (auth, academic, communication, calendar), Netflix Eureka, Spring Cloud Gateway, and a Next.js 14 front end with five role dashboards.
- Investment Planner now describes the real Investment Portfolio Tracker: CAMS and KFintech PDF parsing, JWT APIs, MySQL, Liquibase, Quartz, Recharts, and a Docker Compose stack with nginx, plus the original goal-based planning.
- Product Essentials Program records HighRadius as the issuer.

### Changed

- Project cards show the one-line summary, with the longer description kept for the AI assistant. Title, summary, and tag rows use a fixed height so cards in a row line up.
- Tech stacks and feature lists were rewritten from the actual repositories: AI Jira Board (Ollama or cloud models, Vitest, GitHub Actions), ReadNTrade (Google sign-in, MUI X, Recharts), QuickTask (Parse SDK), PDF Unlocker Pro (Rayon, Ratatui, Clap, lopdf), PC Part Picker India (dnd-kit, Puppeteer, Cheerio, Nodemailer), and Beautiful Bengal v3 (Vite on Rolldown, ESLint 9).
- Work-project summaries were tightened for Enterprise Legacy Modernization, QuickBooks Integration, Legal Entity Localization, Parallel Invoice Engine, and Dynamic Notification Engine.
- The skills grid is wider (`max-w-[1760px]`), and pills grow to fill each row so the last row does not leave a ragged edge. A zero-height spacer absorbs the leftover space on that last row.
- Illustrated project scenes fade out at the bottom of a card, where the text sits, and stay solid in the detail-window header. The mutual-fund scene is drawn for `investment-planner`.
- About, Experience, and Skills cards no longer lift on hover. Shadow, border, and (where it already existed) scale still change, so the page does not reflow under the pointer.

### Removed

- The separate Mutual Fund Portfolio Tracker entry. Its statement-parsing behavior now lives on Investment Planner, which links to `Investment_Portfolio_Tracker`. The old `mf-portfolio-tracker` scene id went with it.

## [2.0.0] — 2026-10-24

The first release that builds the way the site ships. [v1.0](https://github.com/yo-sayantan/My_Portfolio/releases/tag/v1.0) styled itself with the Tailwind CDN and an AI Studio import map. v2.0 compiles Tailwind, keeps the theme, and stops trusting the browser with the AI prompt. Shipped in [PR #1](https://github.com/yo-sayantan/My_Portfolio/pull/1), commit `b1d3192`.

### Added

- A real Tailwind 3 pipeline: `tailwind.config.js`, `postcss.config.js`, `index.css`, `autoprefixer`, and `tailwindcss-animate`. The theme (primary scale, Inter, and the existing keyframes) moved out of the CDN `<script>` and into that config.
- `npm run typecheck` (`tsc --noEmit`), plus `@types/react` and `@types/react-dom`. `vite-env.d.ts` types `import.meta.env`.
- Theme persistence. An inline script in `index.html` applies the saved theme, or the system theme, before first paint. React reads that class back so state and the DOM start together. The choice is stored in `localStorage`.
- A View Transitions theme reveal. The new theme expands in a circle from the toggle. `prefers-reduced-motion`, and browsers without `startViewTransition`, get one shared color fade instead of each element animating on its own clock.
- A mobile navigation panel in the header. It closes on Escape, on a link click, and when the viewport grows past the `lg` breakpoint. The menu button exposes `aria-expanded` and `aria-controls`.
- SEO metadata: description, author, `theme-color`, Open Graph title, description, URL, and image, a Twitter card, and an inline "SB" favicon. The document title names Java, AWS, and AI.
- `services/aiContext.ts`. The Netlify `ai` function builds the system prompt on the server from `PORTFOLIO_DATA` (summary, skills, experience, projects, awards, education, certifications, and links). The browser sends the visitor message, a capped history, and the current path. It cannot supply its own system instruction.
- Request limits on the AI function: 2,000 characters per message, 20 history turns, 4,000 characters per turn. Only `user` and `model` roles are forwarded.
- Contact-form limits and checks: name 100, email 254, subject 200, message 5,000, transcript 60 turns. The address must match a simple email pattern. User text is HTML-escaped before it enters the email template. Failures no longer return the underlying error message.
- `getExperienceYears()`, with a career start of 1 June 2020, shared by the hero and the AI prompt.
- Personal projects that were not in v1.0: AI Jira Board, PDF Unlocker Pro, PC Part Picker: India Edition, and Mutual Fund Portfolio Tracker. ReadNTrade and Beautiful Bengal v3 were rewritten to match the current repositories.
- Project scene illustrations (`components/ProjectScenes.tsx`) in the card header and the detail window.
- A resume download in the header that respects Vite `BASE_URL`, so GitHub Pages (`/My_Portfolio/`) and Netlify (`/`) both resolve `Sayantan_Resume.pdf`.

### Changed

- `index.html` no longer loads `cdn.tailwindcss.com` or the AI Studio import map. `index.tsx` imports `index.css`.
- Runtime dependencies are React, React DOM, `lucide-react`, `@google/genai`, and `nodemailer`. Vite and `@vitejs/plugin-react` stay in `devDependencies` only.
- Header scroll handling is passive and coalesced with `requestAnimationFrame`. The active section is the one crossing the middle of the viewport. `aria-current="page"` marks it. The URL hash updates only when a click-driven smooth scroll is not already in progress.
- Hero copy now leads with cloud platforms, real-time fraud detection, and AI-assisted work with Claude, Cursor, and MCP. The portrait has an explicit alt string, dimensions, `fetchPriority="high"`, and async decoding. The scroll cue is hidden below the `md` breakpoint.
- The particle background was rewritten. The v2 project write-up describes it as a canvas simulation with a spatial hash grid.
- Experience, About, and Projects layouts were tightened for the compiled utility classes, including brand-colored experience cards.
- LinkedIn profile URL is `https://in.linkedin.com/in/yo-sayantan`.
- Resume-processing scripts moved from `public/resume_processing/` to `scripts/resume_processing/` so they are not deployed as site assets. The PDF itself stays in `public/`.

### Removed

- The empty root `ScrollReveal.tsx`. The component that the app actually imports lives in `components/ScrollReveal.tsx`.
- The client-side Gemini system prompt in `services/geminiService.ts`. Grounding data is no longer duplicated in the browser bundle.

### Verified for v2.0

- `npm run typecheck`
- `npm run build` (Vite 6.4.2; CSS and JS emitted)
- GitHub Pages workflow [run 40120846322](https://github.com/yo-sayantan/My_Portfolio/actions/runs/40120846322) succeeded on the merge to `main`

## [1.0.0] — 2026-10-24

First stable release. The tag points at `2b4f39d` (21 June 2026), which is the portfolio as it stood before the v2.0 rebuild. The notes below describe the product that tag contains.

### Added

- Project scaffold (21 November 2025): Vite, React, TypeScript, Tailwind loaded from the CDN in `index.html`, and the section components the site still uses.
- Identity in one module, `ownerConfig.ts`: name, role (Senior Software Engineer, Experian), email, phone, GitHub, LinkedIn, portfolio URL, avatar, and Hyderabad location. Components and Netlify functions both import it.
- Page sections: Hero, About, Skills, Experience, Projects, Education (including certifications and awards), Contact, and Footer.
- Hero with a live years-of-experience counter, GitHub profile image, and links to GitHub, LinkedIn, and email.
- About section describing an AI-assisted engineering workflow.
- Experience timeline for Experian, Oracle, and HighRadius, with scroll-linked motion and per-company hover color. Awards include NIKE Technology Transformation, Spot Award, and Star Performer.
- Skills in four groups: Backend Engineering, Cloud & Database, AI & Productivity, and DevOps & Tools.
- Projects, filterable as All / Work / Personal. Work entries cover Enterprise Legacy Modernization, QuickBooks Integration, Legal Entity Localization, Parallel Invoice Engine, and Dynamic Notification Infrastructure. Personal entries cover Book Exchange, QuickTask, My Career Portfolio, Algorithmic Investment Tracker, Investment Planner, OS CPU Scheduler Simulator, School Connect, and Beautiful Bengal. Private work projects stay locked in the UI.
- Canvas particle-network background, scroll-reveal on sections, and a scroll-to-top button.
- Dark mode toggled from the header.
- Contact form with name, email, subject, and message. Mail is sent by a Netlify function (`nodemailer`) so the Gmail app password never ships to the browser. The chatbot can email a transcript of the conversation.
- Gemini assistant. The browser calls `services/geminiService.ts`, which posts to `netlify/functions/ai.ts`. The function accepts `GEMINI_API_KEY` or `API_KEY`. Suggested questions and portfolio context were part of the assistant from the start. Vite does not inline the API key into the client bundle.
- Resume PDF at `public/Sayantan_Resume.pdf`, plus `public/resume_processing/` scripts to extract text and to inspect and rewrite PDF metadata.
- Deployment. `netlify.toml` for Netlify. `.github/workflows/deploy.yml` builds with Node 24 and publishes `dist/` to GitHub Pages. `vite.config.ts` sets `base` to `/My_Portfolio/` when `DEPLOY_TARGET=github`, and `/` otherwise.
- README with local setup: Node 18+, `npm install`, `VITE_GEMINI_API_KEY` in `.env.local`, `npm run dev` on port 3000, and `npm run build`.

### Changed along the way to 1.0

- Assistant product copy moved from a GPT-style setup toward Claude, while the live chat path remained Gemini through the Netlify proxy.
- Contact form gained a subject field, clearer validation, and LinkedIn plus map links.
- A hash on reload is stripped and the page scrolls to the top, so a refresh does not land mid-section.
- Header, hero, and email template spacing were tightened, including a wider email layout and two-letter initials in the transcript template.

### Known shape of the 1.0 build

- Styling depended on `https://cdn.tailwindcss.com` and an inline `tailwind.config` script. An import map pointed React, Lucide, Vite, and Nodemailer at `aistudiocdn.com`. Those were removed in v2.0.
- There was no `npm run typecheck` script and no committed Tailwind or PostCSS config.
- The AI system prompt was assembled in the browser and sent to the function. v2.0 moved that prompt server-side.
