# GymApp

GymApp is a mobile-first web application for managing workouts.

The application allows users to create workouts, organize exercises into groups, and manage training structure through a simple and fast interface.

---

## Tech Stack

- React + Vite
- MUI (Material UI)
- React Router
- Supabase (Auth + Database)

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

---

### 2. Run development server

```bash
npm run dev
```

App will be available at:

http://localhost:5173

---

### 3. Build for production

```bash
npm run build
```

---

### 4. Preview production build

```bash
npm run preview
```

---

## Environment Variables

Create a `.env` file in the root directory based on `.env.example`.

Example:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## Project Structure

```
src/
  app/          # app setup, providers, routing
  pages/        # route-level pages
  features/     # business logic modules (workouts, exercises, groups)
  components/   # shared UI components
  lib/          # utilities and low-level modules (api, helpers)
  constants/    # static values and enums
  styles/       # theme and global styles
```

---

## Import Alias

The project uses path alias:

```
@ -> /src
```

Example:

```js
import WorkoutCard from '@/features/workouts/components/WorkoutCard';
```

---

## Scripts

```
npm run dev       # start dev server
npm run build     # build production bundle
npm run preview   # preview production build
```

---

## Notes

- This project is JavaScript-based (no TypeScript)
- All data access should go through the service layer
- Direct calls to backend from UI components are not allowed

---

## Status

Foundation phase (Project setup and architecture baseline)
