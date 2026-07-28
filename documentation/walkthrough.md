# Walkthrough - Hitman Hotline Core Systems

I have implemented the foundational systems for "Hitman Hotline," including the core models, server-side APIs, and a responsive, mobile-friendly dashboard.

## Features Implemented

### 1. Core Models & Business Logic
- **Staff System:** Defined `Staff` and `StaffType` (Hitman, HR, Secretary, etc.) with a 5-skill system (Combat, Subterfuge, Technical, Logistics, Diplomacy).
- **Salary Calculation:** Automated salary logic based on skill levels, with a 1.5x multiplier for "Elite" staff (skills ≥ 5).
- **Mission System:** Defined `Mission` types (Wetwork, Cyber, Social, etc.) and `ActiveMission` tracking.
- **Success Rate Logic:** Initial implementation of success rate calculation based on staff skills vs mission difficulty.

### 2. Server-Side (Express & TypeScript)
- **API Routes:**
    - `GET /api/staff`: View current agency personnel.
    - `POST /api/staff/recruit`: Recruit new assets.
    - `GET /api/missions/available`: Browse contracts.
    - `POST /api/missions/start`: Assign staff and begin real-time operations.
- **Mock Data:** Integrated initial mock data to allow for immediate testing and UI development.

### 3. Client-Side (React & Tailwind CSS)
- **Responsive Dashboard:** A mobile-first UI using Tailwind CSS, featuring:
    - **Agency HQ Overview:** Real-time display of capital and prestige.
    - **Personnel Grid:** Detailed cards for each staff member with skill progress bars.
    - **Mission Hub Placeholder:** Prepared section for ongoing operations.
- **Layout & Navigation:**
    - Mobile: Bottom navigation for easy thumb access.
    - Desktop: Persistent sidebar for a professional management feel.

## Technical Details

### Key Files
- [Staff.ts](file:///home/tom/Code/hitmanhotline/server/src/models/Staff.ts): Core staff interface and salary logic.
- [Mission.ts](file:///home/tom/Code/hitmanhotline/server/src/models/Mission.ts): Mission interfaces and success rate calculations.
- [Dashboard.tsx](file:///home/tom/Code/hitmanhotline/client/src/components/Dashboard.tsx): Main responsive UI.
- [tailwind.config.js](file:///home/tom/Code/hitmanhotline/client/tailwind.config.js): Custom theme with "Hitman Red" and "Hitman Black" branding.

### 4. Database & Persistence (Offline-First)
- **Server Persistence:** Implemented **SQLite** with **Prisma ORM**. This provides a robust, zero-config database perfect for Raspberry Pi deployment.
- **Client Persistence:** Integrated **Zustand** with middleware to save the game state to the browser's `localStorage`.
- **Offline Capability:**
    - The game is now playable without a connection. Single-player data (Staff, Agency stats) is persisted locally.
    - **UI Feedback:** Added a connectivity indicator (Green/Red dot) in the dashboard.
    - **Feature Gating:** Online-only features like "The Market" are automatically disabled and labeled "Offline" when no connection is detected.
- **Sync Infrastructure:** Prepared the foundation for background synchronization between the local store and the server.

### 5. Recruitment Loop & Staff Flavour
- **Goofy Recruit Generator:** Implemented a server-side service that generates humorous backstories, previous jobs (e.g., "Tax Auditor for Clowns"), and quirks (e.g., "Allergic to the colour blue") for all new recruits.
- **Visual Identity:**
    - **Silhouette Passport Photos:** All staff cards now feature a mysterious silhouette placeholder, adding to the agency's "classified" aesthetic.
    - **Quirks & History:** Staff cards display their previous professional lives and unique behaviours.
- **Rewards System:**
    - **Employee of the Month:** Integrated a visual "Star" badge and gold-bordered highlight for staff with special awards.
    - **Bonus Infrastructure:** Prepared the store and models to handle financial bonuses and KPI-based rewards.
- **Recruit API:** Updated the recruitment endpoint to automatically inject these flavour details into the staff roster.
- **Recruitment UI (The Market):**
    - Implemented a functional "Asset Procurement" page where users can browse a pool of generated recruits.
    - **Hiring Logic:** Added the ability to spend agency capital to hire assets. Capital is deducted from the global store, and the new staff member is added to the personnel roster.
    - **Dynamic Pool:** Users can refresh the talent pool to find new assets with different skills and goofy backgrounds.

### 6. Corporate C-Suite Navigation (Agency OS)
- **Executive Hierarchy:** Redesigned the entire navigation system into a collapsible "C-Suite" corporate structure, mapping game features to specific executive offices:
    - **CEO (Executive Suite):** Core dashboard and "Red Phone" hotline.
    - **CHRO (Human Capital):** Roster management, 1:21 meetings, and summits.
    - **COO (Operations):** Mission control, world maps, and performance stats.
    - **CFO (Finances):** sponsorship deals, weekly reviews, and payroll.
    - **CTO (R&D):** Training modules and equipment upgrades.
    - **CMO (Market & PR):** Recruitment and brand intelligence.
    - **CLO (Legal & Compliance):** Heat management and captivity desk.
- **Enhanced UI Aesthetics:**
    - **Collapsible Sections:** A clean, accordion-style sidebar to manage the complexity of a growing agency.
    - **Visual Branding:** Added agency-themed icons (Lucide React), carbon-fiber backgrounds, and a persistent "Director" profile.
    - **Stylised Dashboards:** Implemented dedicated layouts for Finance, Operations, HR, and Tech, complete with flavour text and mock metrics to provide immediate immersion.
    - **Mobile Optimization:** A fully responsive, scrollable navigation drawer for mobile users.

### 7. Asset Seniority & Career Progression
- **Seniority Tiers:** Implemented a four-tier career ladder: **Junior**, **Mid-Level**, **Senior**, and **Executive**. 
- **Experience Tracking:** Added a persistent experience system and visual progress bars on Staff Cards to track career advancement.
- **Visual Badging:** Introduced seniority badges (Shield icons) that scale with the operative's rank, providing immediate visual feedback on roster quality.
- **Smart Recruitment:** The talent pool now generates higher-tier recruits based on age, with Senior operatives carrying significantly higher hiring costs and skill baselines.
- **Foundation for Extensions:** The seniority system is now ready to support high-risk "Mission Extensions" for Senior+ operatives.

### 9. Deployment & Persistence Hardening
- **SQLite Volume Mapping:** Configured `docker-compose.yml` to map the SQLite database file (`dev.db`) to a persistent volume. This ensures that recruitment, mission history, and agency capital survive container restarts or software updates on the Raspberry Pi.
- **Pi-Specific Uplink:** Created an automated deployment script (`deploy-pi.sh`) that uses `rsync` for efficient code transfers to the Agency Mainframe (`192.168.1.81`).
- **Optimization:** Excluded `node_modules` and other heavy artifacts from the deployment payload to keep the uplink fast and clean.

### 8. Mission Engine & Real-time Resolution
- **Resolution Engine:** Implemented a server-side background service that monitors active missions and resolves them in real-time.
- **Outcome Logic:** Integrated complex resolution algorithms that factor in:
    - **Skill Tiers:** Matching asset skills (Combat, Tech, etc.) against mission requirements.
    - **Seniority Bonuses:** Senior and Executive assets provide a cumulative success multiplier.
    - **Critical Outcomes:** Chance for critical success (double XP) or critical failure (Capture).
- **Persistent Operations:** Missions are now persisted in the SQLite database, ensuring operational continuity across server restarts.
- **COO Dashboard Integration:**
    - **Live Countdown Timers:** Active missions display real-time progress bars and phase status (Infiltration, Objective, Extraction).
    - **Mission Authorization:** A functional "Available Contracts" interface allowing users to deploy assets directly from the COO hub.
    - **Real-time Sync:** The UI automatically polls for results upon mission completion, updating the agency's balance, reputation, and staff experience immediately.
- **Seeded Data:** Initial missions ("First Blood", "Data Heist", "Social Infiltration") have been added to the world map.

### 10. CEO Admin Tasks & Secure Inbox
- **Humorous "Busy Work" Loop:** Implemented the CEO Admin Task system to provide engaging decisions during long missions. Tasks are themed around corporate absurdity (e.g., "The Missing Silenced Stapler").
- **Secure Inbox UI:** Added a stylised, email-like interface to the CEO Dashboard where users can manage incoming transmissions from HR, R&D, and Legal.
- **Instant Resolution:** Decisions are made directly within the inbox, providing immediate flavour feedback and minor agency impacts (Cash, Reputation, Intel, etc.).
- **Red Phone Integration:** Added a "Red Phone" status indicator to the dashboard header that pulses and "rings" when new urgent tasks are available.
- **Background Generator:** The server now features a task generator that periodically populates the inbox with fresh inter-office drama and corporate reports.

### 11. Onboarding & Global Debriefs
- **Automated Agency Setup:** Implemented a "First Boot" initialization flow. New players now automatically start with **$5,000** in capital and **Agent 47** (Senior Asset) pre-recruited to their roster.
- **Global Toast System:** Created a high-visibility notification system that provides real-time updates across all executive offices.
- **Cross-App Communication:** Whether you are in the CFO's office or the Talent Pool, a red "Classified" toast will notify you the second a mission resolves or an urgent CEO directive arrives.
- **Persistence Hardening:** Updated the database schema to handle asset flavour text, career history, and career awards (e.g., Employee of the Month) persistently.

### 13. User Account Hub & Official Registration
- **Director Profile:** Implemented a dedicated Account Hub where the CEO can update their username, email, and encryption key (password).
- **Official Corporate Filings:** Framed the agency management as an official government-monitored entity. Users can manage:
    - **Trading Name:** Rebrand the agency through official filings.
    - **Legal Structure:** Select between Sole Trader, Ltd, PLC, or a "Non-Profit Foundation" (Front).
    - **Registration Data:** Persistent tracking of unique registration numbers, incorporation dates, and registered HQ addresses.
- **Tax & Compliance:** Integrated a placeholder for tax bracket monitoring (Startup 0% Tier), reinforcing the corporate simulation.
- **System Settings:** Added toggles for real-time notifications and low-power mainframe modes.

### 14. Mobile Foundation (Capacitor & Android)
- **Native Android Wrapper:** Initialised **Capacitor** in the client project, enabling the React app to run as a native Android application.
- **Emulator Networking:** Configured the mobile bridge to allow the Android emulator to communicate with the local desktop server using the `10.0.2.2` routing protocol.
- **Sync Pipeline:** Established the build-and-sync workflow (`npm run build && npx cap sync`), ensuring web changes are immediately available for native testing in Android Studio.

### 12. Active Monitoring (Red Phone Logic)
- **Heartbeat System:** Implemented a real-time activity tracker. The client sends a silent "Director is present" signal to the server every 60 seconds while the app is active.
- **Activity-Aware Generation:** The CEO Task Generator now checks for recent user activity. Urgent "Red Phone" transmissions are only triggered if the CEO has been active within the last 5 minutes.
- **Protocol Adherence:** This prevents a backlog of urgent tasks from accumulating while the user is offline, ensuring the phone only rings when there is a Director present to answer it.
- **Server Build:** Verified with `npm run build` after fixing `tsconfig.json` and installing missing dependencies.
- **Client Build:** Verified with `npm run build` after cleaning up empty placeholder files and setting up Tailwind CSS.
- **UI Responsiveness:** Layout designed with mobile-first breakpoints (`md:`, `sm:`) to ensure usability on all devices.
