# Business Logic & Game Mechanics

## Staff Attributes & Skills
All staff have 5 core skills. Every staff member must have at least 1 point in each.
Staff with 5 points in all skills have their salary reflect their elite status.

### Potential Skills:
1. **Combat:** Proficiency with weapons and physical wetwork.
2. **Subterfuge:** Stealing, social engineering, and stealth.
3. **Technical:** Hacking, surveillance, and gadgetry.
4. **Logistics:** Planning, travel, and resource management.
5. **Diplomacy:** Negotiation, PR, and heat reduction.

### Specials:
Staff and recruits can have "Specials" (e.g., +5% Charisma, +5% Hacking).
Recruits older than 30 come with a pre-defined specialization.

## Staff Seniority & Progression
All staff progress through seniority tiers based on mission experience and skill levels:
1. **Junior:** Entry-level recruits.
2. **Mid-Level:** Experienced assets with specialised skills.
3. **Senior:** Elite operatives with field autonomy.
4. **Executive/Principal:** Top 1% operatives, potential candidates for C-Suite advisory roles.

## Mission Engine Protocols
The Mission Engine is the heart of the agency, resolving field operations in real-time.

### 1. Resolution Logic
When a mission timer reaches zero, the engine executes the following:
- **Success Check:** (Assigned Skills / Difficulty) + Seniority Bonus.
- **Outcome Tiers:**
    - **CRITICAL SUCCESS:** Bonus Rewards + Seniority XP Boost.
    - **SUCCESS:** Standard Payout + Experience.
    - **PARTIAL FAILURE:** Half Payout + High Heat Increase.
    - **CRITICAL FAILURE:** Zero Payout + **Capture Risk** + Agency Reputation Loss.

### 2. The Senior Extension Prompt
For Senior+ assets, a successful resolution triggers an **Intelligence Window**:
- Operative identifies a "Secondary Objective."
- **Window:** 60-second real-time window for the CEO to authorise an extension.
- **Risk:** If authorised, a new timer starts with +50% Difficulty and +200% Reward.

### 3. Rewards & Experience
- **Experience:** Calculated as `(Mission Difficulty * 10) * (Success Tier Multiplier)`.
- **Payouts:** Deposited directly into Agency Capital.
- **Capture Mechanic:** Hitmen aren't killed. If a mission fails badly, they may be captured.
    - Captured hitmen can be traded back for money/intel.
    - Captors can attempt to make them defect.

## Economy & Sponsors
- **Sponsorship Levels:**
    - Knives: $100/day
    - Pistols: $200/day
    - SMGs: $300/day
    - Rifles: $400/day
- **Flexible Design:** Sponsors provide weapons, armor, or rent coverage.
- **Duration:** Last for 1 day or 1 week.

## Recruitment & The Market
- **Scouting:** Better scouts find higher potential recruits.
- **Recruit Flavour:** Recruits come with randomised "goofy" background details (e.g., "Former professional mime," "Allergic to silence").
- **Auction House:** Players can list their staff for sale/auction to other users.

## Customer Relationships & Factions
Missions are provided by various "Customers" (e.g., Weapon Manufacturers, Tech Giants, Shadow Governments).
- **Reputation (By Faction):** Completing a mission for one faction increases standing but may decrease it with their rivals.
- **Mutual Exclusivity:** Some missions appear in pairs—choosing one permanently burns the bridge with the other for a set duration.
- **Sponsorship Hooks:** High standing with a "Weapon Manufacturer" customer unlocks their exclusive sponsorships (e.g., free rifles).

## Financial Resilience (Banking & Billing)
The agency must remain liquid to survive.

### 📅 The Monday "Settlement" (9 AM UTC)
All agency liabilities are settled once a week on **Monday at 09:00 UTC**.
- **Combined Billing:** Total of all Salaries, Rents, and Utility costs.
- **Pro-rated Salaries:** If an asset is hired mid-week, their first Monday payment is calculated by the hour.
    - *Example:* A £70/week hire on Friday 9 AM (72 hours before billing) results in a £30 payment on Monday.
- **Liquidity Check:** If the balance is insufficient, the account enters the "Red Zone."

### 🏛️ The Market & Transfers
- **One-off Fees:** High-tier (Senior/Executive) assets carry a massive "Upfront Procurement Fee" (e.g., £50k) in addition to high weekly salaries.
- **Auction House Fee:** The CMO Office takes a 10% cut of all player-to-player transfers.

### 🛡️ Bankruptcy (The Red Zone)
If balance hits $0 and no loans are available:
- **Asset Liquidation:** Forced sale of hitmen/equipment at 50% market value.
- **The Long Climb:** The CEO must handle high-risk "Desperation Tasks" to return to the black.

## PvP (Agency Rivalry)
- **Intel Raids:** Send hitmen to steal resources or intel from other player agencies.
- **Leagues:** Competitive rankings based on agency prestige and mission success.
