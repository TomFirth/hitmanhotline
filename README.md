# Hitman Hotline: Agency OS

**Hitman Hotline** is a high-stakes "Hitman Startup" management simulator. You are the CEO of a shadow agency, tasked with recruiting specialists, managing a corporate C-Suite, and executing global operations—all while maintaining that distinct "Corporate Absurdity" humor.

Inspired by *Planetarion*, *Counter-Strike Manager*, and *Evil Genius*.

## 🕴️ Core Gameplay Loop
1.  **Recruit**: Procure "Assets" (Hitmen, HR, Tech) with goofy backgrounds and unique quirks.
2.  **Assign**: Deploy operatives on real-time missions (Wetwork, Cyber-Heists, Social Infiltration).
3.  **Manage**: Handle CEO admin tasks and secure sponsorships while timers count down.
4.  **Scale**: Grow from a one-room startup to a global shadow empire.

## 📱 Agency OS Features
- **C-Suite Interface**: A collapsible corporate dashboard (CEO, COO, CFO, CTO hubs).
- **Offline-First**: Built with Zustand persistence and SQLite to support single-player gameplay without wifi.
- **Asset Seniority**: Watch your operatives climb the ladder from Junior to Executive tiers.
- **Goofy Recruit Generator**: Backgrounds like "Former Professional Mime" or "Tax Auditor for Clowns."

## 🚀 Deployment & Tech Stack
- **Client**: React 18 + TypeScript + Tailwind CSS + Zustand.
- **Server**: Node.js + Express + Prisma + SQLite.
- **Platform**: Fully optimised for **Raspberry Pi (ARM)** deployment via Docker.

### Raspberry Pi Deployment
To push to your local Agency Mainframe (`192.168.1.81`):

```bash
# Deploy to Pi via SSH & Docker
ssh barber@192.168.1.81 "mkdir -p ~/agency-os"
scp -r ./server ./client docker-compose.yml barber@192.168.1.81:~/agency-os
ssh barber@192.168.1.81 "cd ~/agency-os && docker compose up -d --build"
```

## 📂 Project Navigation
Detailed documentation can be found in the `documentation/` directory:
- [MVP Roadmap](ROADMAP.md)
- [Business Logic & Mechanics](documentation/design/core_mechanics.md)
- [Technical Walkthrough](documentation/project_history.md)
- [Project Tasks](documentation/current_tasks.md)

---
*Classified Information. Agency Eyes Only.*
