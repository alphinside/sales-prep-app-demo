---
name: Fullstack Testing & Code Review Protocol
description: A mandatory protocol defining the complete testing and quality assurance workflow to execute before considering any feature complete.
---

# Fullstack Testing & Code Review Protocol

This skill MUST be invoked as the final step of every implementation. You MUST complete this protocol systematically before considering any feature "done". Execute each phase and address any issues found.

## 1. Code Review & Standards Check
Review the implemented code against the project guidelines:
- **Typing**: Ensure thorough usage of TypeScript types for both React frontend and Node.js/Express backend. No implicit `any`.
- **Naming Conventions**:
  - React Components: `PascalCase`
  - Functions & Variables: `camelCase`
  - Types & Interfaces: `PascalCase`
  - API Routes: `kebab-case` (plurals)
  - DB Tables & Columns: `snake_case`
- **React Patterns**: Confirm functional components and hooks (`useState`, `useEffect`, `useMemo`) are used correctly.
- **Styling**: Verify use of Tailwind CSS v4 utility classes and the custom `cn` utility (clsx + tailwind-merge) for conditional styling. Ensure `lucide-react` is used for icons.

## 2. Security & Data Integrity Verification
- **SQL Injection Prevention**: Double-check ALL new database interactions. Make sure parameterized queries (`db.prepare(...).run/all/get(...)`) via `better-sqlite3` are used. Fail the review immediately if raw SQL strings use string interpolation.
- **Secret Management**: Ensure no `.env` credentials or API keys (e.g., AI/LLM keys) are hardcoded or exposed to the client.

## 3. Backend API Validation
- **Response Format**: Verify that API endpoints return appropriate JSON objects (`res.json(...)`).
- **Error Handling**: Check `try/catch` blocks are present for all database operations and route handling.
- **Status Codes**: Confirm failed responses return proper HTTP status codes (e.g., 500 with `{ error: "Message" }`) and successful creations return `201`.

## 4. Execution & Functional Testing
- Test the core user flows introduced by the feature.
- Verify that interactive UI elements trigger correct backend state changes and gracefully handle network latency or errors (e.g., loading spinners, error toasts).
- Ensure animations use `motion` (Framer Motion) for seamless and interactive UI.

## 5. Final Walkthrough Output 
- Once all checks pass, document the testing process and validation results in a `walkthrough.md` file (or update the existing one).
- Detail exactly what was tested, both on the frontend and backend, and the validation results to provide proof of work.

**Execution Directive**: Do not end the implementation phase until you have explicitly verified every item in this protocol. If an issue is found, switch back to fixing the issue, and then restart the verification protocol.
