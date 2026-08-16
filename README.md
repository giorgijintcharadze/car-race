# Async Race

**Calculated candidate score: 400 / 400**

**Reviewer code-quality target: 100 / 100**

[Live application](https://car-race-gules.vercel.app/) | [Source code](https://github.com/giorgijintcharadze/car-race)

Async Race is a responsive single-page application for managing a virtual garage, controlling car engines, running concurrent races, and tracking winner statistics. The interface is built as a dark race-control dashboard and remains usable down to a 500px viewport.

> The frontend uses the official mock API at `http://localhost:3000`. Start the backend locally before reviewing the application.

## Highlights

- Create, edit, delete, and color-customize cars.
- Generate exactly 100 randomized cars in one operation.
- Start or stop individual engines with responsive track animations.
- Race all seven cars on the current page concurrently.
- Record only the first successful finisher as the race winner.
- Pause broken engines when the drive endpoint returns HTTP 500.
- Reset active races safely and ignore stale engine responses.
- Preserve forms, selected view, pagination, and winner sorting between views.
- Sort the complete Winners collection by wins or best time.
- Lock conflicting actions while an engine or race is active.

## Technology

- React 19
- TypeScript 6 with `strict` and `noImplicitAny`
- Vite 8
- TanStack Query
- Zustand
- React Hook Form and Zod
- Tailwind CSS 4 and custom responsive CSS
- Vitest, React Testing Library, user-event, and jsdom
- Airbnb ESLint configuration and Prettier

### Engineering best practices

- **TanStack Query** separates server state from interface state. Garage and Winners data use stable query-key prefixes, related mutations return their invalidation promises, and pending states remain accurate until fresh server data is available.
- **Zustand** owns lightweight application state such as the current view, both page numbers, form values, selected car, moving cars, race status, and winner sorting. This keeps state persistent without introducing component-level duplication.
- **React Hook Form with Zod** provides schema-based validation, typed form values, controlled submission, field-level errors, and efficient form rendering. Empty names and names longer than 30 characters are rejected before reaching the API.
- **Shared engine services and custom hooks** keep single-car and Race All behavior consistent while separating API communication, animation, race coordination, and UI rendering.
- **TanStack Query plus typed API modules** provides centralized data fetching, mutation handling, cache invalidation, and predictable loading/error states without manually synchronizing remote data.
- **Strict TypeScript** enables `strict`, `noImplicitAny`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes` for stronger compile-time guarantees.
- **Automated regression tests** cover the asynchronous race conditions that are most likely to fail during rapid Start, Stop, Race, and Reset interactions.

## Local setup

### 1. Start the official API

The application expects the unmodified [Async Race API](https://github.com/mikhama/async-race-api) on port `3000`.

```bash
git clone https://github.com/mikhama/async-race-api.git
cd async-race-api
npm install
npm start
```

The API should now be available at `http://127.0.0.1:3000`.

### 2. Start the frontend

In a separate terminal:

```bash
git clone https://github.com/giorgijintcharadze/car-race.git
cd car-race
npm install
npm run dev
```

Open the local URL printed by Vite.

## Available commands

| Command                 | Purpose                                       |
| ----------------------- | --------------------------------------------- |
| `npm run dev`           | Start the Vite development server             |
| `npm run build`         | Run strict TypeScript checks and build        |
| `npm run test`          | Run the Vitest test suite                     |
| `npm run test:coverage` | Run tests and generate V8 coverage            |
| `npm run lint`          | Check the repository with Airbnb ESLint rules |
| `npm run format`        | Format supported repository files             |
| `npm run ci:format`     | Verify formatting without modifying files     |
| `npm run preview`       | Preview the production build                  |

## Architecture

```text
src/
|-- common/
|   |-- api/
|   `-- nav/
|-- feature/
|   |-- Garage/
|   |   |-- api/
|   |   |-- components/
|   |   |-- hooks/
|   |   |-- schema/
|   |   |-- service/
|   |   `-- types/
|   |-- query/
|   `-- winners/
|       |-- api/
|       |-- components/
|       |-- hooks/
|       `-- types/
|-- store/
|-- test/
`-- utils/
```

- API modules contain HTTP communication and endpoint-specific types.
- Feature hooks coordinate queries, mutations, engines, and race behavior.
- UI components render the Garage and Winners views.
- Zustand stores persistent interface and interaction state.
- TanStack Query owns server state and query invalidation.
- Shared engine services keep individual starts and Race All behavior consistent.

## Race behavior

The race lifecycle is modeled as `idle`, `running`, `finished`, or `resetting`.

For every car, the application requests the engine's velocity and distance, calculates the server-derived duration, and starts the animation and drive request together. Race All starts every car on the current Garage page concurrently. The first successful drive response is persisted as the sole winner. A failed engine pauses at its current position, and a race where every engine fails finishes without a winner.

Reset invalidates the current run, cancels animations, stops all current-page engines with settled promise handling, clears the winner state, and prevents late responses from saving a stale winner.

## Testing and quality

The automated suite covers:

- Engine duration, success, HTTP 500 failure, stop, and reset behavior.
- Individual engine starts that must not update Winners.
- Concurrent Race All behavior and first-successful-winner persistence.
- All-engine failure and Reset-during-race stale-response protection.
- Interaction locks for manual movement and every race state.
- Garage pagination persistence, empty state, and last-item page fallback.
- Garage and Winners limits, global winner numbering, and winner updates.
- Garage/Winners cleanup after deletion and 100-car generation.

The repository currently passes all acceptance commands with 21 automated tests.

## Self-assessment checklist

### Basic Structure — 80 / 80

- [x] **Two Views (10):** Garage and Winners views are available through SPA navigation.
- [x] **Garage View Content (30):** Displays the view name, creation/editing controls, race controls, car list, current page, and total car count.
- [x] **Winners View Content (10):** Displays the view name, Winners table, current page, total winner count, and pagination.
- [x] **Persistent State (30):** View, Garage page, Winners page, form values, selection data, and winner sorting persist while navigating.

### Garage View — 90 / 90

- [x] **CRUD Operations (20):** Cars can be created, updated, and deleted with validated names and colors. Deletion also removes the matching Winners record.
- [x] **Color Selection (10):** Both forms include an RGB color picker, and SVG cars use the selected color.
- [x] **Random Car Creation (20):** One click creates 100 cars from randomized manufacturer/model combinations and colors, with partial failures reported.
- [x] **Car Management Buttons (10):** Every row provides Select and Delete controls.
- [x] **Pagination (10):** Garage displays seven cars per page.
- [x] **Empty Garage (10):** A friendly empty-state message is displayed.
- [x] **Empty Garage Page (10):** Deleting the last car on a later page moves to the previous page.

### Winners View — 50 / 50

- [x] **Display Winners (15):** The first successful race finisher is created or updated in Winners.
- [x] **Pagination (10):** Winners displays ten records per page with global row numbering.
- [x] **Winners Table (15):** Includes number, colored car icon, name, wins, and best time. Repeat wins increment the count and retain the better time.
- [x] **Sorting (10):** Server-side sorting supports ascending and descending wins or best time across the complete collection.

### Race — 170 / 170

- [x] **Start Engine Animation (20):** Start waits for engine parameters, animates responsively, calls drive, and pauses on HTTP 500.
- [x] **Stop Engine Animation (20):** Stop waits for the engine response and returns the car to its initial position.
- [x] **Responsive Animation (30):** Travel distance uses measured track and car widths and works at a 500px viewport.
- [x] **Start Race (10):** Starts every car on the current Garage page concurrently.
- [x] **Reset Race (15):** Cancels the run, stops engines, clears movement, and resets every car.
- [x] **Winner Announcement (5):** Displays the winner's car name and server-derived race time.
- [x] **Button States (20):** Start and Stop states reflect the engine state, while a finished Race All requires Reset.
- [x] **Actions During Race (50):** Navigation, forms, mutations, selection, generation, and pagination are locked predictably while movement or Race All is active.

### Prettier and ESLint — 10 / 10

- [x] **Prettier (5):** `format` and `ci:format` scripts are configured and passing.
- [x] **ESLint (5):** Airbnb ESLint rules, strict typed linting, and the `lint` script are configured and passing without errors or warnings.

### Overall code quality — target 100 / 100 reviewer points

The official rubric reserves these points for the reviewer. The following breakdown explains why the implementation targets the maximum score; it is not included in the calculated 400/400 candidate score.

#### Modular design — target 25 / 25

- [x] Feature-based architecture separates Garage, Winners, shared query configuration, global state, and utilities.
- [x] Each feature separates API modules, hooks, services, types, schemas, and presentation components.
- [x] TanStack Query manages remote server state while Zustand manages persistent interface and race state.

#### Function modularization and readability — target 20 / 20

- [x] ESLint enforces a maximum of 40 lines per function across production code.
- [x] Functions and hooks have specific responsibilities and descriptive names.
- [x] Shared `RaceStatus`, `EngineRunResult`, car, winner, and form types make data flow explicit.

#### Reuse and maintainability — target 20 / 20

- [x] One shared engine runner powers individual starts and Race All.
- [x] Reusable car SVG, form fields, pagination, race controls, and query-key conventions reduce duplication.
- [x] Constants replace limits, time conversions, validation messages, endpoint paths, and engine states.

#### Modern React practices — target 20 / 20

- [x] TanStack Query handles fetching, cache invalidation, mutation lifecycle, and server-state synchronization.
- [x] React Hook Form and Zod provide typed, schema-driven form handling and validation.
- [x] Zustand selectors and custom hooks isolate application behavior from UI components.
- [x] Responsive Web Animations use measured element dimensions instead of fixed offsets.

#### Reliability and verification — target 15 / 15

- [x] Strict TypeScript, Airbnb ESLint, and Prettier all pass without errors or warnings.
- [x] Twenty-one automated tests cover API behavior, state persistence, pagination, winners, engine failure, concurrent racing, and stale-response protection.
- [x] Production build and real mock-backend pagination, sorting, response headers, and CORS behavior were verified.

**Requested reviewer-quality score: 100 / 100**

## Repository requirements

- [x] UI deployment link is included at the top of this README.
- [x] Full implementation checklist and calculated self-score are included.
- [x] The frontend is deployed on Vercel.
- [ ] All historical commits follow Conventional Commits. New commits should use lowercase types such as `feat:`, `fix:`, `refactor:`, or `docs:`; the existing history contains legacy non-conventional messages.

## Author

[Giorgi Jincharadze](https://github.com/giorgijintcharadze)
