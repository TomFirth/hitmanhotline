# Server-Side Architecture

## Technology
- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **Database:** **SQLite** (using Prisma or Drizzle ORM).
    - *Rationale:* Lightweight, zero-config, and perfect for Raspberry Pi deployment.
- **Authentication:** Firebase Auth (initial) / Local Auth fallback.

## Raspberry Pi Deployment
- Dockerised setup (current `docker-compose.yml` should be optimised for ARM architecture).
- SQLite database file stored in a persistent volume.

## Real-time Requirements
- Periodic checks for finished missions.
- Notification push for mission completion or staff capture.
