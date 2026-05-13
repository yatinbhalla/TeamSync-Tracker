# TeamSync Tracker

TeamSync Tracker is a lightweight AI-assisted project tracking dashboard for small teams that need clarity, ownership, and delivery visibility without the operational weight of enterprise tools.

The product is built around a simple insight: early-stage teams often need project accountability before they need a full Jira-style workflow. TeamSync Tracker focuses on fast project capture, clear ownership, status visibility, searchable execution data, and AI-generated sample workstreams that make onboarding or demos faster.

## Table of Contents

- [Product Context](#product-context)
- [Core Capabilities](#core-capabilities)
- [Project Layout](#project-layout)
- [Tech Stack](#tech-stack)
- [Auth and Login Flow](#auth-and-login-flow)
- [Roles and RBAC](#roles-and-rbac)
- [Application State - AppContext](#application-state---appcontext)
- [Pages](#pages)
- [Components](#components)
- [Canvas System](#canvas-system)
- [NLP and AI Routing](#nlp-and-ai-routing)
- [Hooks and Utilities](#hooks-and-utilities)
- [Known Limitations](#known-limitations)
- [Run Locally](#run-locally)
- [Collaboration](#collaboration)
- [Author](#author)

## Product Context

TeamSync Tracker is designed as a product-management MVP that demonstrates how a focused workflow can replace spreadsheet-based coordination for small teams.

It helps teams:

- Capture project work with owner, status, and description fields.
- Assign accountability by making every project owner visible.
- Track delivery progress through searchable and sortable status data.
- Edit or delete project records through lightweight modal workflows.
- Use Gemini-powered generation to quickly seed realistic project examples.
- Keep the interface simple enough for non-technical teammates to adopt quickly.

For product manager and builder interviews, this project highlights user-centric scoping, MVP prioritization, AI integration, state management, component design, and tradeoff-aware execution.

## Core Capabilities

- **Create projects:** Add project name, owner, status, and description.
- **Generate sample projects with AI:** Use Gemini to create realistic project examples for demo data or onboarding.
- **Search execution data:** Filter projects by name, owner, or status.
- **Sort project records:** Sort by project name, owner, or status in ascending or descending order.
- **Inspect project details:** Expand rows to view descriptions and timestamps.
- **Update work items:** Edit project metadata through a dedicated modal.
- **Delete safely:** Confirm destructive actions before removing a project.
- **Use responsive UI patterns:** Support desktop and mobile table usage with horizontal scroll guidance.

## Project Layout

```text
TeamSync-Tracker/
├── App.tsx
├── constants.ts
├── index.html
├── index.tsx
├── metadata.json
├── package.json
├── README.md
├── tsconfig.json
├── types.ts
├── vite.config.ts
├── components/
│   ├── Button.tsx
│   ├── ConfirmationModal.tsx
│   ├── EditProjectModal.tsx
│   ├── ProjectForm.tsx
│   └── ProjectTable.tsx
└── services/
    └── geminiService.ts
```

## Tech Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Frontend | React 19 | Component-based interface and state-driven rendering |
| Language | TypeScript | Typed project models, props, and status enums |
| Build tool | Vite | Fast local development and production builds |
| Styling | Tailwind CSS utility classes | Responsive layout, status badges, modals, and form styling |
| AI | Google Gemini via `@google/genai` | Structured sample project generation |
| State | React `useState` and `useMemo` | Local project list, form state, sorting, filtering, and modal state |

## Auth and Login Flow

Authentication is not implemented in the current MVP.

This is an intentional early-stage scope decision: the app currently optimizes for zero-friction demos and local project tracking. A production-ready version could add:

- Email or Google OAuth login.
- Workspace-level project separation.
- User-owned project records.
- Session persistence and protected routes.
- Audit history for project edits and deletions.

## Roles and RBAC

Role-based access control is not implemented yet.

The current data model includes an `owner` field to create accountability at the project level, but every user of the local app can create, edit, and delete records. A future RBAC layer could introduce:

- **Admin:** Manage workspace settings, members, and all project records.
- **Manager:** Create projects, update statuses, and assign owners.
- **Contributor:** Update assigned project status and descriptions.
- **Viewer:** Read-only access for stakeholders.

## Application State - AppContext

The current version does not use a dedicated `AppContext`.

Application state is managed locally in `App.tsx` and child components:

- `projects` stores the active project list.
- `isGenerating` controls the Gemini generation loading state.
- `ProjectForm` manages draft project input state.
- `ProjectTable` manages search, sort, expanded row, edit modal, and delete confirmation state.
- `useMemo` derives filtered and sorted project records from current table controls.

A future `AppContext` would be useful once the app adds authentication, persistent storage, cross-page navigation, team workspaces, or server-backed project sync.

## Pages

The app currently uses a single-page dashboard architecture:

- **Header:** Positions the product as a simple team project tracker.
- **Project Form:** Captures new project records and triggers AI sample generation.
- **Project Table:** Displays searchable, sortable, expandable project records.
- **Modals:** Handles edit and delete flows without leaving the main dashboard.

## Components

| Component | Responsibility |
| --- | --- |
| `App.tsx` | Owns top-level project state and passes create, update, delete, and AI generation handlers into child components. |
| `ProjectForm.tsx` | Captures project inputs, validates required fields, submits new records, and exposes the AI Fill action. |
| `ProjectTable.tsx` | Renders the project list, search, sorting, expandable details, row actions, and empty states. |
| `EditProjectModal.tsx` | Lets users update project name, owner, status, and description. |
| `ConfirmationModal.tsx` | Adds a confirmation step before deleting a project. |
| `Button.tsx` | Centralizes button variants, loading state, and shared button styling. |

## Canvas System

A canvas system is not part of the current implementation.

If TeamSync Tracker evolves into a planning workspace, a canvas layer could support:

- Roadmap mapping.
- Sprint planning boards.
- Dependency visualization.
- AI-assisted project decomposition.
- Team capacity planning.

## NLP and AI Routing

AI functionality is currently routed through `services/geminiService.ts`.

The current AI flow:

1. User clicks **AI Fill** in the project form.
2. `App.tsx` calls `generateSampleProjects()`.
3. `geminiService.ts` sends a prompt to Gemini using `gemini-2.5-flash`.
4. Gemini returns structured JSON using a response schema.
5. The app adds generated projects to the dashboard with local IDs and timestamps.

Current AI behavior focuses on structured sample generation, not natural-language command execution. Future NLP routing could support prompts like:

- "Create three onboarding tasks for the design team."
- "Mark all launch checklist items as in process."
- "Summarize blocked projects by owner."
- "Suggest next actions for projects that have not started."

## Hooks and Utilities

Current React hooks:

- `useState` for project data, form fields, modal state, search, sorting, and loading indicators.
- `useMemo` for efficient filtering and sorting of visible project rows.
- `useEffect` in `EditProjectModal` to hydrate edit fields when a project is selected.

Current utilities and shared constants:

- `ProjectStatus` enum in `types.ts`.
- `Project` interface in `types.ts`.
- `STATUS_OPTIONS` in `constants.ts`.
- `AI_MODEL_FLASH` in `constants.ts`.
- `generateSampleProjects()` in `services/geminiService.ts`.

## Known Limitations

- Project data is stored only in React memory and resets on refresh.
- No authentication, login, multi-user workspace, or RBAC layer is implemented.
- No database or backend API is connected.
- No drag-and-drop Kanban board exists in the current codebase.
- No sprint planning, analytics dashboard, notifications, or comments are implemented yet.
- AI generation depends on a valid Gemini API key and available network access.
- Error handling for failed AI generation is currently limited to console logging and empty fallback data.
- The UI uses inline SVG icons rather than a dedicated icon library.
- Automated tests are not currently included.

## Run Locally

```bash
git clone https://github.com/yatinbhalla/TeamSync-Tracker.git
cd TeamSync-Tracker
npm install
```

Create a local environment file:

```bash
echo "API_KEY=your_gemini_api_key_here" > .env.local
```

Start the app:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Collaboration

This project is intentionally small, practical, and open to iteration. Useful contributions include:

- Add persistence through localStorage, Supabase, Firebase, or a lightweight backend.
- Introduce authentication and workspace-level access control.
- Convert the table view into optional Kanban and timeline views.
- Expand AI workflows from sample generation into project summarization and next-step recommendations.
- Add tests for project creation, editing, deletion, sorting, filtering, and AI fallback behavior.
- Improve accessibility, keyboard navigation, and mobile table ergonomics.

Ideas, issues, and pull requests are welcome. The goal is to keep TeamSync Tracker useful for real teams while making the product thinking behind each feature easy to understand.

## Author

Yatin Bhalla · Product Manager & AI Builder

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Yatin%20Bhalla-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/yatinbhalla42)
[![Gmail](https://img.shields.io/badge/Gmail-yatinbhalla42%40gmail.com-EA4335?logo=gmail&logoColor=white)](mailto:yatinbhalla42@gmail.com)
[![X](https://img.shields.io/badge/X-@yatinbhalla42-000000?logo=x&logoColor=white)](https://x.com/yatinbhalla42)
