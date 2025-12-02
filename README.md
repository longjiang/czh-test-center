# Chinese Zero to Hero Quiz Center

React + Tailwind interface for running quizzes/exams for Chinese Zero to Hero courses. Quiz content is JSON-backed and currently includes the "Introduction to Chinese" course (Lessons 1-12).

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Project Layout
- `src/data/introduction-to-chinese/` — JSON quizzes by lesson.
- `src/utils/quizData.js` — course/quiz registry and loaders.
- `src/components/` — UI building blocks (selector, progress, questions, runner).
- `src/App.jsx` — main application shell.
- `index.html`, `src/main.jsx`, `src/index.css` — app entry and Tailwind styles.

## Notes
- Questions stay hidden until "Start Quiz" is clicked; timer runs and auto-submits at 00:00.
- Tailwind and Vite configs are included; adjust time limits per quiz in the JSON files.
