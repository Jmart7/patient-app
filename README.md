# Patient Management App

A frontend application for managing patient records, built with React and TypeScript.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm run test:run
```

The app fetches patient data from a remote API on startup. No additional setup or environment variables are needed.

## Features

- Fetches and displays patient records from an external API
- Patient cards with expand/collapse for viewing details
- Create new patients and edit existing ones via modal form
- Form validation with real-time feedback on blur
- Delete patients with a confirmation dialog
- Search/filter patients by name, description, or ID
- Toast notifications for user feedback on actions
- Responsive grid layout that adapts to screen size
- Avatar component with initials fallback for broken images

## Tech stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool and dev server |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Available for animations (CSS animations used for lightweight transitions) |
| Vitest | Test runner |
| React Testing Library | Component testing |
| ESLint + Prettier | Code quality and formatting |

## Project structure

```
src/
├── components/
│   ├── ui/                  — Reusable generic components
│   │   ├── Avatar           — Image with initials fallback
│   │   ├── Button           — Multi-variant button
│   │   ├── ConfirmDialog    — Destructive action confirmation
│   │   ├── Input            — Text input with label and error state
│   │   ├── Modal            — Overlay dialog with keyboard support
│   │   ├── SearchBar        — Search input with icon
│   │   └── TextArea         — Multiline input with label and error state
│   └── patients/            — Domain-specific components
│       ├── PatientCard      — Individual patient display
│       ├── PatientForm      — Create/edit form with validation
│       └── PatientList      — Main view orchestrating everything
├── context/                 — Toast notification system
├── hooks/                   — usePatients, useNotify
├── services/                — API fetch layer
├── types/                   — TypeScript interfaces
└── utils/                   — Form validation logic
```

## Design decisions

**State management** — I used `useReducer` + Context for this. Redux or Zustand felt like overkill for a single entity with basic CRUD, and the reducer pattern already gives a predictable state flow.

**No UI library** — The challenge explicitly asks for custom components, so everything is built with Tailwind utilities. No shadcn, no MUI, no component library.

**Validation** — I considered react-hook-form + zod but the validation rules here are pretty simple (required fields and a URL check), so I just wrote a plain function. Less dependencies, same result.

**Local-only mutations** — Since the API is shared by everyone doing this challenge, I only use it for the initial fetch. All creates, edits, and deletes happen in local state. The hook is set up so you could wire in real API calls without changing the components.

**Component structure** — Generic UI stuff (`Button`, `Modal`, `Input`) lives in `components/ui`, patient-specific stuff (`PatientCard`, `PatientForm`) lives in `components/patients`. Keeps things easy to find.

**Testing** — Went with Vitest since it picks up the Vite config automatically (aliases, jsx transform, etc). Tests cover validation logic, component rendering, and user interactions.
