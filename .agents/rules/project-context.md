---
trigger: always_on
---

# LeadFlow CRM - Development Guidelines

This document outlines the development guidelines for the LeadFlow CRM project to ensure consistency, maintainability, and security across the codebase.

## 1. Code Standards
- **Language**: TypeScript is the primary language for both the frontend (React) and the backend (Node.js/Express). Strong typing should be enforced.
- **Module System**: The project uses ES Modules (`"type": "module"` in `package.json`).
- **Database**: `better-sqlite3` is used for synchronous SQLite operations. Do not use an ORM for this project; write raw SQL queries safely.

## 2. Naming Conventions
- **React Components**: Use `PascalCase` (e.g., `StatCard`, `ChatView`).
- **Functions & Variables**: Use `camelCase` (e.g., `handleSaveLead`, `filteredLeads`).
- **Types & Interfaces**: Use `PascalCase` (e.g., `Lead`, `Meeting`, `LeadNote`).
- **API Routes**: Use kebab-case and plurals for endpoints (e.g., `/api/leads`, `/api/meetings`).
- **Database Tables & Columns**: Use `snake_case` (e.g., `lead_notes`, `lead_id`, `created_at`).

## 3. Component Patterns
- **Functional Components**: Use React Functional Components and Hooks (`useState`, `useEffect`, `useMemo`).
- **Utility Functions**: Use the customized `cn` utility function (combining `clsx` and `tailwind-merge`) for conditional and complex class names.

## 4. Styling Approach
- **Framework**: Use Tailwind CSS v4 (`@tailwindcss/vite`).
- **Icons**: Use `lucide-react` for all UI icons to maintain a consistent look.
- **Animations**: Use `motion` (Framer Motion) for seamless and interactive UI animations (`<motion.div>`, `<AnimatePresence>`).
- **Inline Styling**: Avoid custom CSS files unless absolutely necessary. Rely on utility classes within components.

## 5. API Patterns
- **Architecture**: RESTful APIs defined in `server.ts` using Express.
- **Response Format**: Return JSON objects `res.json(...)`.
- **Error Handling**: Use `try/catch` blocks for all database operations and route handling. Return proper HTTP status codes, typically `500` with a JSON object `{ error: "Message" }` on failure, and `201` for successful creation.

## 6. Security Practices
- **SQL Injection Prevention**: **Always** use parameterized queries via `db.prepare(...).run/all/get(...)` from `better-sqlite3`. Never construct raw SQL strings using string interpolation.
- **Secret Management**: API keys and environment variables (e.g., `GEMINI_API_KEY`) must be accessed securely via `process.env`. Do not expose `.env` files or hardcode sensitive information.
- **Dependency Sandboxing**: Run external AI/LLM requests securely with proper error management in the event of upstream API failure or malformed inputs.
