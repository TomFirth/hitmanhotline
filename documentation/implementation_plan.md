# Implementation Plan - Hitman Hotline Core Systems

This plan outlines the initial steps to bring the "Hitman Startup" concept to life, focusing on the core Hitman/Staff model, the first mission logic, and a basic responsive UI.

## User Review Required

> [!IMPORTANT]
> - **Database Choice:** I'm assuming a relational database (PostgreSQL) is best for the complex staff/mission relationships, but the client currently has `firebase` dependencies. Should I stick with Firebase or move to a dedicated SQL/NoSQL DB?
> - **UI Framework:** I'll use Tailwind CSS for the "mobile-friendly/responsive" requirement unless you prefer another library (e.g., Material UI, Bootstrap).

## Proposed Changes

### 1. Database & Models
Define the core schema for Users, Staff, and Missions.

- **Staff Model:** Includes the 5 core skills (Combat, Subterfuge, Technical, Logistics, Diplomacy) and the "Special" trait.
- **Mission Model:** Includes duration, difficulty, and rewards.

### 2. Server-Side (Express)
Implement the first set of APIs.

#### `server/src/models/`
- [NEW] `Staff.ts`: Define the Staff interface and skill logic.
- [NEW] `Mission.ts`: Define the Mission interface and success calculation logic.

#### `server/src/routes/`
- [NEW] `staff.ts`: Endpoints to hire/view staff.
- [NEW] `missions.ts`: Endpoints to start missions and check status.

### 3. Client-Side (React)
Create a responsive dashboard and management views.

#### `client/src/components/`
- [NEW] `Dashboard.tsx`: Overview of agency stats.
- [NEW] `StaffCard.tsx`: Responsive card for hitman/staff stats.
- [NEW] `MissionTimer.tsx`: Visual countdown for active missions.

#### `client/src/pages/`
- [NEW] `Office.tsx`: Main management hub.
- [NEW] `Recruitment.tsx`: The "market" or scouting interface.

---

## Verification Plan

### Automated Tests
- `npm test` in the client directory (existing Jest setup).
- [NEW] Add Vitest or Jest to the server for business logic validation (success rates, salary calculations).

### Manual Verification
- Use Chrome DevTools (Mobile Emulation) to verify responsive layouts.
- Test the "First Mission" flow: Recruit -> Assign -> Wait 5 mins -> Receive Reward.
