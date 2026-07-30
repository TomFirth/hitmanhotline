# MVP Roadmap - Hitman Hotline

To transform the current prototype into a Minimum Viable Product (MVP), we need to close the loop on the core gameplay: **Recruit -> Assign -> Wait -> Reward.**

## 1. Persistent Storage (Database Integration)
Currently, staff and missions are stored in memory and reset on server restart.
- **Goal:** Connect a database (PostgreSQL or MongoDB) to store User profiles, Staff rosters, and Active Missions.
- **Priority:** Critical

## 2. Real-time Mission Engine
The "First Mission" takes 5 minutes, but the server doesn't currently "process" the completion automatically.
- **Goal:** Implement a background worker or a periodic check to calculate mission outcomes when the `endTime` is reached.
- **Mechanics:** Calculate success/failure, update user balance, and handle the "Capture" logic for failed high-risk missions.
- **Priority:** High

## 3. Personnel Management (The HR Loop)
- **Recruitment:** Turn the mock "Recruit" button into a functional market where users spend capital to hire staff.
- **Training:** Implement a basic "Training Room" where staff can increase their skills over time (taking real hours/days).
- **Priority:** High

## 4. Admin Tasks (Engagement during Missions)
Since missions can take days, the user needs "busy work" to keep them in the app.
- **Goal:** Implement "CEO Admin Tasks" (e.g., signing off on expense reports, dealing with HR disputes, choosing minor office upgrades).
- **Priority:** Medium

## 5. First Sponsorships
- **Goal:** Add the "Sponsor" system where users sign daily/weekly contracts for gear (Knives/Pistols) that provide stat bonuses to missions.
- **Priority:** Medium

## 6. Authentication & User Onboarding
- **Goal:** Fully integrate Firebase Auth (already in client) and create a "First Mission" tutorial flow that guarantees success and grants the first $1,000.
- **Priority:** Medium

---

## Technical Debt to Address
- **Client/Server Sync:** Replace basic `fetch` with a more robust state management solution (Zustand or TanStack Query) to handle real-time timer updates.
- **Error Handling:** Add proper API validation (Zod) and error boundaries in the UI.
- **Styling Consistency:** Fully migrate all remaining CSS to Tailwind classes.
