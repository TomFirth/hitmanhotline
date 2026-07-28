# Project TODO: Hitman Hotline "Agency OS"

This roadmap tracks the evolution of the Hitman Startup simulator. Current focus: **MVP Polish & Economy.**

## Phase 1 — Corporate Foundation (C-Suite)
- [x] **Agency OS v1.0**: Implement collapsible C-Suite navigation (CEO, COO, CFO, etc.).
- [x] **Global Shadow Map**: Build the COO hub for mission control and world-view briefings.
- [x] **Financial Intelligence**: CFO dashboard for liquid assets, burn rates, and audit trails.
- [x] **The Red Phone**: Implement the core "Hotline" for high-priority contract acquisition.
- [/] **Official Registration**:
    - [ ] **Incorporation Filings**: "Company House" style view of agency registration and history.
    - [ ] **Tax & Compliance**: Implementation of tax brackets and government body data tracking.

## Phase 2 — Asset Procurement & Human Capital
- [x] **Goofy Recruit Generator**: Humorous backstories, quirks, and previous jobs.
- [x] **Experience System**: Persistent XP and progress bars for every asset.
- [ ] **User Account Hub**: Profile editing, security clearances, and session history.
- [ ] **Recognition**: "Employee of the Month" star badges and gold borders.
- [ ] **CEO Admin Tasks**: Small "busy work" tasks (expense reports, HR disputes) to keep the user engaged during long missions.

## Phase 3 — Mission Engine 2.0 (Real-time Ops)
- [x] **Background Resolution**: Server-side ticker to resolve missions.
- [x] **Operational Phases**: Real-time tracking of Infiltration, Objective, and Extraction.
- [ ] **Senior Autonomy**: High-risk mission extension prompts for Senior assets (Post-MVP).
- [ ] **The Captivity Desk**: UI for assets being captured and traded back (Post-MVP).

## Phase 4 — Economy & Infrastructure
- [/] **Financial Resilience**:
    - [ ] **Weekly Settlement Engine**: Automation for Monday 9am UTC billing.
    - [ ] **Pro-rated Payroll**: Logic to calculate mid-week hire salaries.
    - [ ] **Loans & Banking**: CFO-managed loan system with interest.
- [/] **Infrastructure**:
    - [ ] **The Tech Tree**: 50+ research nodes for weapons, rooms, and departments.
    - [ ] **Asset Management**: Buying/Managing buildings and room slots.

## Phase 6 — Technical Foundation (Offline-First)
- [x] **SQLite Persistence**: Portable database ready for Raspberry Pi (ARM) deployment.
- [x] **Zustand LocalStore**: Persistent browser state for offline-capable gameplay.
- [x] **Connectivity Logic**: Automated "Offline" mode gating for non-critical features.
- [x] **Global Notifications**: Toast/Notification system for cross-page mission debriefs.
- [x] **Onboarding**: "First Boot" agency setup flow with starting capital and elite recruit.

## MVP Recommendation (Realistic Launch)
- [x] **Core OS**: C-Suite "Agency OS" (CEO/COO/CFO hubs).
- [x] **Mission Engine**: Real-time resolution, timers, and field results.
- [x] **Talent Pool**: Goofy generator + hiring mechanics + seniority tiers.
- [x] **Persistence**: SQLite + Zustand local-first storage.
- [x] **CEO Admin Ticker**: Small tasks to do while missions are in progress.
- [x] **First Boot**: Agency setup (Starting $5,000 + elite recruit).
- [x] **Global Debriefs**: Toast system to notify mission results anywhere in the app.
