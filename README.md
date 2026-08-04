# Async Race

Async Race is a single-page application built with **React**, **TypeScript**, and **Vite**.

The application allows users to manage a garage of cars, race them using the Engine API, and keep track of winners.

## Live Demo

https://car-race-gules.vercel.app/
<!-- ---Sorry for the terrible UI, if you give me time and chance I'll fix it. 😁 -->

---

# Technologies

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

# Installation

```bash
npm install
npm run dev
```

Production build

```bash
npm run build
```

---

# Project Structure

```
src
│
├── common
├── feature
│   ├── Garage
│   └── Winners
├── store
└── utils
```

Every feature contains:

- api
- components
- hooks
- schema
- types

---

# Features

## Garage

- Create car
- Update car
- Delete car
- Generate random cars
- Reset garage
- Pagination
- Optimistic updates

---

## Engine

- Start engine
- Stop engine
- Drive mode
- Engine failure handling
- Web Animations API

---

## Race

- Start single race
- Race All
- Reset Race
- Winner detection
- Winner banner

---

## Winners

- Winners table
- Save winner
- Update winner
- Delete winner
- Pagination
- Sorting by wins
- Sorting by best time

---

# State Management

Implemented using **Zustand**

Stores:

- Selected car
- Update form
- Garage page
- Winners page
- Active page
- Moving cars

---

# Data Fetching

Implemented using **TanStack Query**

Queries

- Garage
- Winners

Mutations

- Create
- Update
- Delete
- Generate
- Reset

Features

- Cache invalidation
- Optimistic updates
- Automatic refetch

---

# Form Validation

Implemented with

- React Hook Form
- Zod

Validation

- Required name
- Maximum 30 characters
- Color validation

---

# API

## Garage

- GET
- POST
- PUT
- DELETE

## Engine

- PATCH Start
- PATCH Stop
- PATCH Drive

## Winners

- GET
- POST
- PUT
- DELETE

---

 <!--!-- RS School Async Race Checklist  --> -->

## Basic

- [✅] Garage view
- [✅] Winners view
- [✅] TypeScript
- [✅] Pagination
- [✅] Feature-based architecture

## Garage

- [✅] Create Car
- [✅] Update Car
- [✅] Delete Car
- [✅] Generate Random Cars
- [✅] Reset Garage

## Engine

- [✅] Start Engine
- [✅] Stop Engine
- [✅] Drive Mode
- [✅] Engine failure handling
- [✅] Car animation

## Race

- [✅] Race All
- [✅] Reset Race
- [✅] Winner detection
- [✅] Winner banner

## Winners

- [✅] Save Winner
- [✅] Update Winner
- [✅] Delete Winner
- [✅] Winners table
- [✅] Pagination
- [✅] Sort by Wins
- [✅] Sort by Best Time

---

# Self Assessment

## Functional Requirements

| Requirement        | Status |
| ------------------ | ------ |
| Garage CRUD        | ✅     |
| Engine API         | ✅     |
| Drive Mode         | ✅     |
| Car Animation      | ✅     |
| Race All           | ✅     |
| Reset Race         | ✅     |
| Winner Detection   | ✅     |
| Winners API        | ✅     |
| Winners Pagination | ✅     |
| Winners Sorting    | ✅     |

## Non-functional Requirements

| Requirement                | Status |
| -------------------------- | ------ |
| TypeScript                 | ✅     |
| React Query                | ✅     |
| Zustand                    | ✅     |
| Feature-based Architecture | ✅     |
| Form Validation            | ✅     |
| Optimistic Updates         | ✅     |

### Self Score

**-10 points**

Reason:

- Race implementation can still be improved by fully sharing the engine logic between single car start and "Race All" to eliminate duplicated behavior and make both flows use the exact same engine service.

**Score: 375 / 400**

# Author:

Giorgi Jincharadze
