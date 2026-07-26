# Async Race

Async Race is a React + TypeScript application that simulates a garage of cars, allows users to create and manage vehicles, start races, and track winners.

🚀 **Deployed Application:**  
https://car-race-gules.vercel.app/
<!-- ---Sorry for the terrible UI, if you give me time and chance I'll fix it. 😁 -->

# Tech Stack

- React
- TypeScript
- Vite
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Tailwind CSS
- REST API

---

# Project Structure

The project follows a feature-based architecture.

```
src/
 ├── common/
 ├── feature/
 │    ├── Garage/
 │    └── Winners/
 ├── store/
 ├── utils/
```

Each feature contains its own:

- API
- Components
- Hooks
- Types
- Schema
- Store

---

# Garage

Implemented complete CRUD functionality.

## Create Car

- React Hook Form
- Zod validation
- Optimistic Updates
- React Query mutations

Validation:

- Car name is required
- Maximum 30 characters
- Color picker

---

## Update Car

Implemented car editing.

Features:

- Select car
- Auto-fill update form
- Persistent form state using Zustand
- React Query mutation
- Automatic list refresh after update

---

## Delete Car

Implemented car deletion.

Additional behavior:

- Automatically removes the same record from Winners if it exists.

---

## Generate Random Cars

Implemented bulk creation.

Features:

- Generates random names
- Random colors
- Creates multiple cars in parallel
- Refreshes Garage automatically

---

## Reset Garage

Implemented full garage reset.

Features:

- Fetch all cars
- Delete all cars
- Reset pagination
- Refresh data

---

# Pagination

Implemented reusable pagination component.

Features:

- Previous / Next
- Current page
- Total pages
- Disabled buttons
- Automatic page correction after deleting data

---

# Engine

Implemented complete engine API integration.

Supported actions:

- Start Engine
- Stop Engine
- Drive Mode

Flow:

1. Start Engine request
2. Receive velocity and distance
3. Calculate animation duration
4. Animate car
5. Send Drive request
6. Handle engine failure

---

# Car Animation

Implemented animation using Web Animations API.

Features:

- Smooth movement
- Pause on engine failure
- Cancel animation on Stop
- Reset position

---

# Winners

Implemented Winners API.

Supported operations:

- GET Winners
- POST Winner
- PUT Winner
- DELETE Winner

Logic:

- First win creates a new winner
- Existing winner increases wins count
- Stores best race time

---

# Winner + Garage Merge

Winner API only contains:

- id
- wins
- time

Garage API contains:

- name
- color

Both APIs are merged before rendering.

Final table contains:

- Car
- Name
- Wins
- Best Time

---

# Sorting

Implemented server-side sorting.

Supported fields:

- Wins
- Best Time

Supported orders:

- ASC
- DESC

Sorting is handled by API query parameters.

---

# State Management

Used Zustand for:

- Selected car
- Update form
- Garage page
- Winners page
- Active view
- Moving cars state

---

# React Query

Implemented:

## Queries

- Garage
- Winners

## Mutations

- Create
- Update
- Delete
- Generate
- Reset

Implemented:

- Cache invalidation
- Optimistic Updates
- Query Keys
- Automatic refetch

---

# Form Validation

Implemented with:

- React Hook Form
- Zod

Validation rules:

- Required fields
- Maximum length
- Color validation

---

# API

Garage API

- GET
- POST
- PUT
- DELETE

Engine API

- PATCH Start
- PATCH Stop
- PATCH Drive

Winner API

- GET
- POST
- PUT
- DELETE

---

# Current Features

- Create Car
- Update Car
- Delete Car
- Generate Random Cars
- Reset Garage
- Pagination
- Engine Start
- Engine Stop
- Drive Mode
- Car Animation
- Winner Detection
- Winners Table
- Server-side Sorting
- Zustand State Management
- React Query Cache Management

---

# Next Steps

The following features are planned:

- Race All
- Reset Race
- Detect first winner automatically
- Finish line
- Reusable engine hook
- Shared engine service
- Improved component separation
- Shadcn UI integration
