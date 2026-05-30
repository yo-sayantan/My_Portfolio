<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Sayantan Biswas - Personal Portfolio

This repository contains the source code for my personal portfolio website. It serves as a comprehensive digital resume, showcasing my professional experience, skills in enterprise software development (Java, AWS, AI), and highlighted projects. The application is built using a modern stack featuring React, TypeScript, Vite, and TailwindCSS for a highly dynamic, interactive user experience.

## Getting Started

Follow these steps to run the portfolio website locally on your machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

### Local Development Setup

1. **Install dependencies:**
   Open your terminal in the root directory of the project and run:
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create or modify the `.env.local` file in the root directory if you plan on using the AI chatbot feature.
   Set your API key like so:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

3. **Run the application:**
   Start the Vite development server by running:
   ```bash
   npm run dev
   ```

4. **View the site:**
   Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal) to view the portfolio.

### Building for Production

To create a production-ready build of the site:
```bash
npm run build
```
This will compile the optimized application into the `dist/` directory, which can be deployed to any static hosting provider.
