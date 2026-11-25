# MathMate

Learn Maths. Use Maths. Make Life Easier.

Vite + React + TypeScript + Tailwind. No backend, no accounts, no paid services.
Progress is saved only in the visitor's own browser (localStorage).

## Run on a computer
    npm install
    npm run dev

## Build for Cloudflare Pages
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 22 (set by the `.node-version` file)

## What is inside
- Daily Life Maths: Shopping & Discounts, Budget Planning, Travel Expenses, Savings & Percentages, Cooking Measurements
- Learning Zone: Kids, Students, Adults (explanations plus practice questions)
- Challenge Zone: random questions, hints, points
- Maths Assistant: built-in help library and practice question maker (NOT a live AI service)
- My Progress: questions attempted, correct answers, points

The Maths Assistant is a built-in library. A real AI service is a later phase and
would need a secure server so no API key is exposed in the browser.
