# Deployment Guide for PetMatchr V7

This project is designed as a **Static Site** with **Programmatic Content**. The recommended workflow is to generate content locally, commit the data, and then deploy to a hosting provider like Vercel.

## 1. The "Generate Locally, Deploy Static" Workflow

Because this project can generate thousands of pages using AI, running the generation script during the deployment build process is **not recommended** (it will take too long and likely time out).

**Correct Workflow:**

1.  **Generate Content Locally**:
    Run the generation scripts on your machine to create the JSON data files.
    ```bash
    npm run gen:matrix
    npm run gen:content
    ```
    *This saves files to `src/data/pages/`.*

2.  **Verify Content**:
    Run QA to make sure everything looks good.
    ```bash
    npm run qa
    ```

3.  **Commit Data to Git**:
    Add the generated JSON files to your git repository.
    ```bash
    git add src/data/pages
    git commit -m "Update generated content"
    git push origin main
    ```

4.  **Deploy**:
    When you push to GitHub, Vercel (or your host) will pull the code *and* the data, then build the static site.

---

## 2. Deploying to Vercel (Recommended)

Vercel is the creators of Next.js and provides the easiest deployment experience.

### Step-by-Step:

1.  **Push your code to GitHub**.
2.  **Log in to [Vercel](https://vercel.com)**.
3.  **Add New Project**:
    *   Click "Add New..." -> "Project".
    *   Import your `petmatchr-v7` repository.
4.  **Configure Project**:
    *   **Framework Preset**: Next.js (should be auto-detected).
    *   **Root Directory**: `./` (default).
    *   **Build Command**: `next build` (default).
    *   **Output Directory**: `.next` (default).
5.  **Environment Variables**:
    *   If you only generate content locally, you **DO NOT** need `OPENAI_API_KEY` on Vercel.
    *   If you plan to run any server-side AI features in the future, add `OPENAI_API_KEY` here.
6.  **Deploy**:
    *   Click "Deploy".

Vercel will build your site. Since the JSON data is already in the repo (from Step 1), Next.js will statically generate all the pages (`/breeds/golden-retriever`, `/cost/french-bulldog-austin`, etc.) during the build.

---

## 3. Running Locally

To run the project on your own machine:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Setup Environment**:
    Create `.env.local` file:
    ```env
    OPENAI_API_KEY=sk-your-key-here
    ```

3.  **Generate Data** (if you haven't already):
    ```bash
    npm run gen:matrix
    npm run gen:content
    ```

4.  **Start Dev Server**:
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000`.

---

## 4. Troubleshooting

*   **Build Timeout**: If you have too many pages (e.g., >10,000), the `next build` process might be slow. Vercel has a limit.
    *   *Solution*: Use **Incremental Static Regeneration (ISR)**. The current setup uses SSG (Static Site Generation). If build times become an issue, we can adjust `generateStaticParams` to only build top pages and let others generate on demand.
*   **Missing Content**: If pages return 404 in production but work locally, ensure you actually **committed** the `src/data/pages` folder to Git.
