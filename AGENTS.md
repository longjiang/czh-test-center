# Repository Guidelines

## Project Structure & Module Organization
- Keep application code in `src/`, grouped by feature or domain (`src/auth/`, `src/api/`), and place shared utilities under `src/lib/`.
- Mirror tests beside code in `__tests__/` or `*.spec.ts` files, or centralize in `tests/` if the suite grows; include fixtures under `tests/fixtures/`.
- Store assets in `assets/` and documentation in `docs/`; configuration lives at the repo root (`.env.example`, `tsconfig.json`, `package.json`, `Makefile` when added).
- When introducing new modules, add a brief `README.md` in the directory to describe purpose and entry points.

## Build, Test, and Development Commands
- Recommended baseline (adjust once the stack is finalized):
  - `npm install` to set up dependencies.
  - `npm run dev` for a hot-reload development server or watch mode.
  - `npm test` to execute the test suite.
  - `npm run lint` and `npm run format` for static checks and formatting.
  - `npm run build` to produce production artifacts.
- If you adopt a different toolchain (e.g., `make`, `pipenv`, `just`), add equivalent targets and update this file.

## Coding Style & Naming Conventions
- Prefer TypeScript with `strict` mode; use 2-space indentation and trailing commas in multiline structures.
- Follow ESLint + Prettier defaults (`eslint:recommended`, `@typescript-eslint/recommended`) and extend rules per domain; keep lint fixes in separate commits when feasible.
- Use descriptive names: functions/actions are verbs (`fetchUser`), data structures are nouns (`UserProfile`), and booleans start with `is/has/should`.
- Keep modules single-responsibility; extract shared logic to `src/lib/` rather than duplicating.

## Testing Guidelines
- Use `vitest` or `jest` for unit tests; prefer fast, deterministic tests with clear Arrange/Act/Assert layout.
- Name tests after behavior, not implementation (`"returns 401 for unknown token"`).
- Aim for meaningful coverage around business logic and boundary conditions; add regression tests for every bug fix.
- Run `npm test` (or equivalent) before pushing; include snapshots only when stable and reviewed.

## Commit & Pull Request Guidelines
- Use Conventional Commits (`feat: add auth middleware`, `fix: handle empty payload`); keep messages imperative and scoped.
- Keep PRs small and focused; include what changed, why, and how to validate. Link issues or tickets when available.
- Add screenshots or terminal output for UI or CLI changes; list new commands, migrations, or breaking changes explicitly.
- Ensure CI/lint/test pass locally before opening or merging a PR.

## Security & Configuration Tips
- Do not commit secrets; store runtime configuration in `.env` and check in `.env.example` with safe placeholders.
- Validate inputs at API boundaries and sanitize any user-provided data.
- When adding dependencies, prefer well-maintained packages and pin versions; remove unused packages promptly.
