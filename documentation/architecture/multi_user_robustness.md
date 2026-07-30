# Multi-User Robustness: Transition Strategy

Currently, the Agency OS operates in a "Mock Mode" using `mock-user-id`. To support a true multiplayer environment, the following architectural upgrades are required.

---

## 🔐 Authentication & Session Management
- **JWT Implementation**: Replace mock IDs with JSON Web Tokens stored in Secure HttpOnly cookies.
- **Identity Provider**: Implement a simple login/register flow using `bcrypt` for password hashing.
- **Middleware**: Introduce `authMiddleware` to every `/api` route to extract the `userId` from the token rather than query params.

---

## 📡 Scoped Communications
- **Notification Persistence**: Move notifications from Client-side state (Zustand) to a Database table (`Notification`).
    - *Fields*: `id`, `userId`, `message`, `type`, `isRead`.
- **Mission Engine Scoping**: Update the `missionEngine.ts` to process missions for *all* users, but only emit completion signals to the specific user who authorised the mission.
- **API Fetching**: Ensure every `prisma.model.findMany()` call is strictly filtered by `where: { userId: currentUserId }`.

---

## ⚙️ Background Process Optimisation
- **Ticker Scalability**: Transition from a simple `setInterval` to a more robust task queue (e.g., `BullMQ` or simple database-driven polling) to prevent the CPU from spiking when thousands of missions are active.
- **Atomic Transactions**: Ensure all mission resolutions use `prisma.$transaction` to prevent race conditions during multiplayer raids (e.g., two people trying to steal the same Prototype at once).
