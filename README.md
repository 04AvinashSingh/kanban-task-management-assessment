# Kanban Task Management System & AbleSpace Product Teardown

**Assessment Submission:** Full Stack Developer (Fresher) – Technical Assessment  
**Figma Reference:** [Figma Design File](https://www.figma.com/design/obONCFmoTFN27V5H9PHS2X/Assessment-Task?node-id=0-1&t=y9fJEDSLMzDicrBQ-1)  

---

## 📌 Executive Summary

This repository contains a full stack, production-grade **Kanban Task Management Application** built to the exact specifications of the Figma design, along with an in-depth clinical and UX/UI teardown of the **AbleSpace "Take Data"** screen (**Part 2 – Product Understanding** in [`PART_2_PRODUCT_UNDERSTANDING.md`](./PART_2_PRODUCT_UNDERSTANDING.md)).

---

## 🛠️ Tech Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 14 (App Router)** | Modern SSR, React Server/Client Components, file-based routing |
| **Styling & Design** | **Tailwind CSS** | Custom design system matching Figma tokens, dark/light themes |
| **Backend Framework** | **NestJS 10** | Enterprise TypeScript architecture, modular structure, dependency injection |
| **Database & ORM** | **SQLite + Prisma ORM** | Type-safe schema, migrations, automated seeding (PostgreSQL/MySQL ready) |
| **Language** | **TypeScript** | 100% strict type safety across both frontend and backend |
| **Authentication** | **JWT & Passport.js** | Stateless token auth + **1-Click Guest Login** with seeded data |
| **Documentation** | **Swagger / OpenAPI** | Interactive REST API explorer at `/api/docs` |

---

## ✨ Features & Figma Design Fidelity

### 1. UI & Visual Design Fidelity
- **Typography & Font**: Uses **Plus Jakarta Sans** with clean letter spacing and weights.
- **Color Palette Tokens**:
  - Main Purple: `#635FC7` / Hover: `#A8A4FF`
  - Dark Mode: Background `#20212C` / Card & Header `#2B2C37` / Borders `#3E3F4E` / Text `#FFFFFF`
  - Light Mode: Background `#F4F7FD` / Card & Header `#FFFFFF` / Borders `#E4EBFA` / Text `#000112`
  - Subtext: `#828FA3`
  - Column Dot Indicators: Todo (`#49C4E5`), Doing (`#8471F2`), Done (`#67E2AE`)
  - Destructive: `#EA5555` / Hover: `#FF9898`
- **Theme Switching**: Seamless Light/Dark theme toggle with Sun/Moon icons, with persistent state in `localStorage`.
- **Sidebar & Show Button**: Collapsible desktop sidebar with board list and count, "Hide Sidebar" action, and floating eye button when collapsed.
- **Mobile Responsiveness**: Adaptive top navigation with modal sheet dropdown for mobile viewports.

### 2. Task & Board Management (CRUD)
- **Kanban Drag-and-Drop**: Reorder tasks within columns and move tasks across columns.
- **Task Cards**: Shows task title and real-time subtask completion ratio (`X of Y subtasks`).
- **View Task Modal**: View task details, interactive checkboxes for subtasks (updates completion count and strikethrough), status dropdown to move tasks across columns, and kebab menu for edit/delete.
- **Add / Edit Task Modal**: Title, description, dynamic subtask list (add/remove subtasks), column picker, validation.
- **Add / Edit Board Modal**: Dynamic column creator with color tags and column names.
- **Delete Confirmation Modals**: Destructive safeguards with modal confirmations.
- **1-Click Guest Login**: Instant sandbox workspace with preloaded Figma boards (*Platform Launch*, *Marketing Plan*, *Roadmap*).

---

## 📁 Repository Structure

```
task-management-system/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma           # Prisma models (User, Board, Column, Task, Subtask)
│   │   └── seed.ts                 # Preloaded Figma sample boards
│   └── src/
│       ├── auth/                   # JWT & 1-Click Guest login endpoints
│       ├── boards/                 # Board CRUD service & controller
│       ├── columns/                # Column CRUD service & controller
│       ├── tasks/                  # Task CRUD & drag reordering
│       ├── subtasks/               # Subtask toggles & progress
│       ├── prisma/                 # Database connection service
│       ├── app.module.ts           # Root module
│       └── main.ts                 # Swagger docs, CORS, ValidationPipe
├── frontend/
│   ├── src/
│   │   ├── app/                    # Next.js 14 App Router layout and globals
│   │   ├── components/             # Header, Sidebar, BoardView, Column, TaskCard
│   │   │   └── modals/             # TaskDetail, TaskForm, BoardForm, Delete, Auth, MobileMenu
│   │   ├── context/                # ThemeContext, AuthContext, KanbanContext
│   │   ├── lib/api.ts              # Typed API client
│   │   └── types/kanban.ts         # TypeScript interfaces
│   ├── tailwind.config.js          # Figma theme tokens
│   └── postcss.config.js
├── PART_2_PRODUCT_UNDERSTANDING.md # Clinical & UX analysis of AbleSpace Take Data screen
├── package.json                    # Workspace root scripts
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### 1. Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts
npm run start:dev
```
*Backend runs on `http://localhost:4005/api` (Swagger docs at `http://localhost:4005/api/docs`).*

### 2. Frontend Setup
```bash
cd ../frontend
npm install
npx next dev -p 3005
```
*Frontend runs on `http://localhost:3005`.*

---

## 📡 REST API Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/guest` | 1-Click Guest login with seeded boards |
| `POST` | `/api/auth/register` | Register with email & password |
| `POST` | `/api/auth/login` | Login with credentials |
| `GET` | `/api/boards` | Get all user boards with nested columns & tasks |
| `GET` | `/api/boards/:id` | Get board details |
| `POST` | `/api/boards` | Create a new board with columns |
| `PATCH` | `/api/boards/:id` | Update board name and columns |
| `DELETE` | `/api/boards/:id` | Delete board |
| `POST` | `/api/columns` | Add column to board |
| `PATCH` | `/api/columns/:id` | Update column |
| `DELETE` | `/api/columns/:id` | Delete column |
| `POST` | `/api/tasks` | Create task with subtasks |
| `PATCH` | `/api/tasks/:id` | Update task title, description, subtasks, status |
| `PATCH` | `/api/tasks/:id/move` | Drag-and-drop task reorder across columns |
| `DELETE` | `/api/tasks/:id` | Delete task |
| `PATCH` | `/api/subtasks/:id/toggle` | Check/uncheck subtask |

---

## 📑 Part 2: Product Understanding

For the complete product teardown, clinical workflow analysis, heuristic evaluation, and wireframe enhancement recommendations for the **AbleSpace "Take Data"** screen from the Caseload tab, please refer to:

👉 [`PART_2_PRODUCT_UNDERSTANDING.md`](./PART_2_PRODUCT_UNDERSTANDING.md)
