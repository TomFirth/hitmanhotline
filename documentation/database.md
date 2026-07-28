# Database & Persistence Strategy

## Engine: SQLite
SQLite is chosen for its portability and performance on low-power devices like Raspberry Pi. It will be the "Source of Truth" on the server.

## Sync Strategy (Offline-First)
1. **Client Persistence:** The React app uses `zustand/middleware` to persist the agency state to `IndexedDB`.
2. **Background Sync:** When the client detects internet connectivity, it pushes local changes to the Express server.
3. **Conflict Resolution:** The server timestamp (last modified) wins for agency state.

## Tables (SQL Schema)

### Users
- id, email, username, hashed_password
- agency_name, balance, prestige

### Staff
- id, user_id (owner)
- name, type (Hitman, HR, etc.), age
- skills (combat, subterfuge, tech, logistics, diplomacy)
- special_trait_id
- status (Idle, On Mission, Captured, Training)
- salary, hire_date

### Missions
- id, type, difficulty
- duration_seconds, rewards (cash, items, intel)
- risk_level

### Active_Missions
- id, staff_ids (assigned)
- start_time, end_time
- status (In Progress, Success, Failure, Captured)

### Sponsors
- id, name, type (Weapon, Rent, etc.)
- daily_value, duration_days

### User_Sponsors
- user_id, sponsor_id
- start_date, expiry_date

### Market_Listings
- id, seller_id, staff_id
- listing_type (Fixed, Auction)
- price, end_time
