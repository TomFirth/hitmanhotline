# Project TODO: Hitman Hotline "Agency OS"

This roadmap tracks the evolution of the Hitman Startup simulator. Current focus: **MVP Polish & Economy.**

## Phase 1 — Corporate Foundation (C-Suite)
- [x] **Agency OS v1.0**: Implement collapsible C-Suite navigation (CEO, COO, CFO, etc.).
- [x] **Global Shadow Map**: Build the COO hub for mission control and world-view briefings.
- [x] **Financial Intelligence**: CFO dashboard for liquid assets, burn rates, and audit trails.
- [x] **The Red Phone**: Implement the core "Hotline" for high-priority contract acquisition.
- [x] **Official Registration**:
    - [x] **Incorporation Filings**: "Company House" style view of agency registration and history.
    - [x] **Legal Entities**: Support for Sole Trader, Ltd, and PLC structures with milestone triggers.
- [ ] **Corporate Evolution**:
    - [ ] **Tax Brackets**: Implement logic to increase tax penalties when exceeding bracket limits.
    - [ ] **Restructuring Workflow**: 2-day real-time transition between legal entities.

## Phase 2 — Asset Procurement & Human Capital
- [x] **Goofy Recruit Generator**: Humorous backstories, quirks, and previous jobs.
- [x] **Experience System**: Persistent XP and progress bars for every asset.
- [x] **Aging & Performance**: 
    - [x] **Temporal Scaling**: 1 year = 2 real-time months.
    - [x] **Stat Caps**: Age-based skill peaks (25) and degradation (30-35).
    - [x] **Retirement**: Field retirement at 35; full staff retirement at 65.
- [x] **Market Evolution**:
    - [x] **Split Recruitment**: Dedicated pages for Field Agents vs Support Staff.
    - [x] **Dynamic Search**: Filter by skills/roles with auto-backfill spawner.
    - [x] **Auction House**: User-to-user bidding system with safe Escrow funds.
- [ ] **HR & Mental Load**:
    - [ ] **Stress Meter**: Missions increase burnout; Stress acts as a negative skill multiplier.
    - [ ] **Recovery**: Corporate retreats and Therapist assignments to reset stress.
    - [ ] **Professional Synergy**: Bonus success rates for agents who work together frequently.

## Phase 3 — Mission Engine 2.0 (Real-time Ops)
- [x] **Background Resolution**: Server-side ticker to resolve missions.
- [x] **Operational Phases**: Real-time tracking of Infiltration, Objective, and Extraction.
- [x] **Intelligence-Led Ops**:
    - [x] **Difficulty vs Risk**: 10-point scales for skill gates vs failure consequences.
    - [x] **Mission Decay**: Unauthorised missions evolve and get harder over 24 hours.
- [ ] **Senior Autonomy**: High-risk mission extension prompts for Senior assets.
- [ ] **The Captivity Desk**: UI for assets being captured and traded back.

## Phase 4 — Economy & Infrastructure
- [x] **Financial Resilience**:
    - [x] **Salary Formula**: Logic-based pay: `(Base + Stats + Age) * Seniority`.
    - [x] **Annual Reviews**: Auto-adjustment of salaries every financial year (60 days).
    - [ ] **Weekly Settlement Engine**: Automation for Monday 9am UTC billing.
    - [ ] **Emergency Loans**: Implement the 3-tier loan system (Seed, Growth, Enterprise).
- [/] **Infrastructure**:
    - [ ] **The Tech Tree**: 50+ research nodes for weapons, rooms, and departments.
    - [ ] **Blueprint System**: Unlock tech nodes using fragments found on Intel missions.
    - [ ] **Front Businesses**: Buy legitimate shops (Dry Cleaners, etc.) to launder "Dirty Cash".

## Phase 5 — Community & Virality
- [x] **Project Cleanup**:
    - [x] **UK English**: Full standardisation of docs and code properties.
    - [x] **Style Migration**: 100% external stylesheets; removed inline/component styles.
- [ ] **Social Expansion**:
    - [ ] **Expansion Uplinks**: Unique invite links with tiered milestones.
    - [ ] **The Headhunter**: Exclusive recruitment staff unlocked via referrals.
    - [ ] **Shareable Dossiers**: Social-ready images of critical mission successes.

## Phase 6 — Technical Foundation (Offline-First)
- [x] **SQLite Persistence**: Portable database ready for Raspberry Pi deployment.
- [x] **Zustand LocalStore**: Persistent browser state for offline-capable gameplay.
- [x] **Connectivity Logic**: Automated "Offline" mode gating for non-critical features.
- [x] **Population Auditor**: Automatic restocking of missions/market if items < 10.
- [x] **Onboarding**: "First Boot" agency setup with Agent 47 and $5k capital.
- [ ] **Starter Objectives**: Logic to track and reward the 5 "First Week" tasks ($5k bonus).

## MVP Recommendation (Realistic Launch)
- [x] **Core OS**: C-Suite "Agency OS" with Strategic Oversight Dashboard.
- [x] **Mission Engine**: Real-time resolution, 10-point scaling, and risk/difficulty logic.
- [x] **Talent Pool**: Split market + Auction House + Aging system.
- [x] **Persistence**: SQLite + Zustand local-first storage.
- [x] **Initialisation**: "First Boot" setup + logical Salary reviews.
- [x] **Global Debriefs**: Toast system to notify mission results anywhere in the app.
- [x] **Documentation**: Full UK English architecture and feature guides.
