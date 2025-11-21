# PetMatchr V7

PetMatchr V7 is a programmatic SEO-driven website for dog breed information, costs, and problem-solving guides. Built with Next.js 14 App Router and TypeScript.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Create a `.env.local` file in the root directory and add your OpenAI API key (required for content generation):
   ```env
   OPENAI_API_KEY=your_api_key_here
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## Programmatic Content Generation

This project uses a programmatic approach to generate thousands of pages.

1. **Generate Page Matrix**:
   Creates a plan of all pages to be generated based on breeds, cities, and problems.
   ```bash
   npm run gen:matrix
   ```

2. **Generate Content (Batch)**:
   Uses OpenAI to generate content for the pages in the matrix.
   ```bash
   npm run gen:content
   ```

3. **QA Check**:
   Validates all generated JSON files against the schema.
   ```bash
   npm run qa
   ```

4. **Generate Sitemap**:
   Creates `public/sitemap.xml` based on existing content.
   ```bash
   npm run sitemap
   ```

## Project Structure

- `src/app`: Next.js App Router pages.
- `src/components`: React components.
- `src/data`: JSON data storage (seed data + generated pages).
- `src/lib`: Utility functions, types, and data loaders.
- `scripts`: TypeScript scripts for content generation and tooling.

## Key Features

- **Programmatic Pages**: Breeds, Costs (by City), Problems, Lists.
- **Answers Hub**: Quick answers and quizzes.
- **Quiz Engine**: Interactive quizzes for lead generation.
- **Public API**: JSON endpoints for AEO (Answer Engine Optimization).
