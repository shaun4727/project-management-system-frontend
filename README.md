# # Modern Project Management System (MPMS) — Frontend

A high-performance, responsive corporate project tracking dashboard built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS v4**. MPMS enables software teams to organize projects, orchestrate sprint tasks via an interactive Kanban board, monitor visual milestone telemetry, and enforce structured role-based access control.

---

## User Credentials:

- admin - admin@alien-tech.com (supersecure123)
- member - shaun.mononsoft@gmail.com (tempPassword123)

## ## Core Architecture & Features

### 1. Advanced Layout System (`AppShell`)

- **Responsive Multi-Mode Navigation:** Adapts natively across viewports. Features a persistent sidebar panel for desktop views and an optimized dual-mode layout for mobile devices (a bottom tab rail combined with an accessible left-hand slide drawer powered by **Shadcn UI**).
- **Isolation of Guest Workflows:** Intelligently intercept paths utilizing real-time route tracing. Completely strips navigation scaffolding out of active viewports for standalone verification windows like `/login` and `/register`.

### 2. High-Fidelity Client Operations

- **Interactive Task Board:** Implements frictionless task boards using `@hello-pangea/dnd` to map project development cycles seamlessly.
- **Cinematic Micro-Interactions:** Integrates core layout animations using **GSAP (GreenSock Animation Platform)** and `@gsap/react` for elegant visual feedback.
- **Contextual Access Restrictions:** Enforces explicit client-side Role-Based Access Control (RBAC). Restricts sensitive analytical screens (such as the _Team Management Panel_) strictly to accounts matching the `ADMIN` security flag.
- **Granular Route Tracking:** Evaluates deep route matches dynamically. Ensures navigation highlights (e.g., highlighting the main `Projects` tab while actively deep-linking into `/projects/123/task/board`) remain contextually accurate.

---

## ## Technology Stack

| Domain                     | Selected Framework / Library           |
| -------------------------- | -------------------------------------- |
| **Core Framework**         | Next.js 16 (App Router) & React 19     |
| **Language**               | TypeScript (Strict Typing)             |
| **State & Authentication** | React Context API (`AuthProvider`)     |
| **UI Primitive Library**   | Shadcn UI & Radix UI                   |
| **Styling Engine**         | Tailwind CSS v4 & PostCSS              |
| **Data Visualization**     | Recharts (Responsive Analytics Charts) |
| **Animations**             | GSAP (GreenSock Animation Platform)    |
| **Drag & Drop**            | @hello-pangea/dnd                      |
| **Iconography**            | Lucide React                           |

---

## ## Getting Started

### Prerequisites

Ensure you have the following environments configured locally on your operating system:

- **Node.js** (v18.x or later recommended)
- **pnpm** (Package Manager)

### Local Installation Steps

**1. Clone the repository:**

```bash
git clone https://github.com/your-username/project-management-system.git
cd project-management-system

```

**2. Synchronize project dependencies:**

```bash
pnpm install

```

**3. Configure Environment Variables:**
Create a `.env.local` file in the root directory of your project:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

```

> **Note:** During production deployment, update this variable to point to your live backend endpoint (e.g., `https://your-backend.onrender.com`).

---

## ## Development & Deployment Workflows

Available pipeline scripts defined within `package.json`:

### Launch Local Development Server

Boot up the concurrent hot-reloading pipeline for routine feature building:

```bash
pnpm dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) inside your web browser to view the active application interface.

### Production Compiling

Compile a highly optimized production build. Next.js bakes standard environment variables starting with `NEXT_PUBLIC_` straight into static assets during this compilation window:

```bash
pnpm build

```

### Run Production Server Locally

Instantiate the production node server locally to audit target performance metrics:

```bash
pnpm start

```

### Code Quality Auditing (Linting)

Scan the active codebase for potential syntax formatting gaps or TypeScript architectural standard variations:

```bash
pnpm lint

```

---

## ## Production Environment Checklist (e.g., Vercel / Netlify)

When shipping this application layout to live cloud architectures, verify the following properties:

1. **Framework Preset:** Ensure target hosting providers select **Next.js**.
2. **Environment Configuration:** Inject `NEXT_PUBLIC_API_URL` matching your live deployed backend server address.
3. **Build Command:** `pnpm build`
4. **Output Directory:** `.next`
