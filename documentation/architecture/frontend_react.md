# Client-Side Architecture

## Technology
- **Framework:** React 18
- **Language:** TypeScript
- **Styling:** Needs to be "Mobile Friendly" and "Responsive" (Tailwind CSS).
- **State Management:** **TanStack Query (React Query)** + **Zustand**.
    - *Offline Strategy:* Use Zustand with persistence (Local Storage/IndexedDB) to allow single-player gameplay without a connection.
- **Communication:** REST API (Express) with a synchronization layer.

## Corporate OS Interface (C-Suite Navigation)
The navigation is structured as a collapsible menu, mapping game features to executive roles:
- **CEO (Executive Suite):** Home, News Feed, Agency Overview, "The Red Phone".
- **CHRO (Human Capital):** Staff Roster, 1:21 Meetings, Agency-wide Summits.
- **COO (Operations):** Active Missions, World Map, Operations Statistics.
- **CFO (Finances):** Sponsorships, Weekly Reviews, Payroll Management.
- **CTO (Research & Development):** Training Modules, Equipment Upgrades.
- **CMO (Market & PR):** Recruitment, Brand Management, Market Intelligence.
- **CLO (Legal & Compliance):** Captivity Negotiations, Heat Management.

## Offline-First Features
- **Local-First State:** Single-player mission timers and staff management should function offline.
- **Connectivity Awareness:** Gray out online-only features (CMO/Market) when the device is offline.
- **Sync Engine:** Automatic upload/download of agency state when a connection is established.
