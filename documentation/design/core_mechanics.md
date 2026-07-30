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
Recruits older than 30 come with a pre-defined specialisation.

## Staff Seniority & Progression
All staff progress through seniority tiers based on mission experience and skill levels:
1. **Junior:** Entry-level recruits.
2. **Mid-Level:** Experienced assets with specialised skills.
3. **Senior:** Elite operatives with field autonomy.
4. **Executive/Principal:** Top 1% operatives, potential candidates for C-Suite advisory roles.

## Mission Engine Protocols
The Mission Engine is the heart of the agency, resolving field operations in real-time.

### 1. Intelligence-Led Resolution
Missions are no longer static; they are influenced by "Shadow Levels" and Intel gathering.
- **Difficulty (1-10):** This is the **Skill Gate**. It dictates the skill points required for success. Higher difficulty reduces the success chance for the same agent stats.
- **Risk (1-10):** This is the **Price of Failure**. It dictates the severity of consequences if a mission fails.
    - *Low Risk (1-3):* Minor reputation loss and financial penalties.
    - *High Risk (7-10):* Significant danger of agents being **Captured** or **Killed**.
- **Hidden Threats:** Every mission has a "Security Rating." Low intel only shows base difficulty. High intel reveals specific threats (e.g., "Advanced Biometrics").
- **Synergy Bonus:** Matching agent skills to specific threats (e.g., Tech for Biometrics) provides a +25% success boost.
- **Loud vs. Quiet:** Using a "loud" solution (Combat) on a "stealth" mission (Intelligence) may succeed but doubles the agent's **Wanted Rating** (Heat).
- **Mission Evolution (Decay):** Missions that are ignored evolve over 24 hours. A simple "Data Heist" may become a "Security Breach Investigation" as the target tightens security, making it significantly harder.

### 2. Resolution Logic
When a mission timer reaches zero, the engine executes the following:
- **Success Check:** (Assigned Skills / Difficulty) + Seniority Bonus + **Synergy Bonus**.
- **Outcome Tiers:**
    - **CRITICAL SUCCESS:** Bonus Rewards + Seniority XP Boost + **Blueprint Fragment**.
    - **SUCCESS:** Standard Payout + Experience.
    - **PARTIAL FAILURE:** Half Payout + High Heat Increase.
    - **CRITICAL FAILURE:** Zero Payout + **Capture Risk** + Agency Reputation Loss.

### 3. Rewards & Experience
- **Experience:** Calculated as `(Mission Difficulty * 10) * (Success Tier Multiplier)`.
- **Payouts (Dirty Cash):** Payouts are initially "Dirty." See [corporate_evolution.md](file:///home/tom/Code/hitmanhotline/documentation/corporate_evolution.md) for laundering mechanics.
- **Risk & Consequences:**
    - **Capture:** Failed missions carry a risk of capture. Captured agents can be traded back or may attempt to defect.
    - **Defection:** Overworked, stressed, or dissatisfied agents may defect.
    - **Death:** Agents can die in high-risk operations. If the agency has **Insurance**, a payout is triggered.
    - **Wanted Rating:** Missions increase an agent's "Star Rating." At 5 stars, an agent must lay low (hand themselves in for a season or train recruits) until the rating drops.

### 4. Loyalty & Retention
- **Loyalty Passport:** Every agent has a "Passport" with a 10-slot loyalty card.
- **Retention:** Earning loyalty points reduces the chance of defection. At 10 slots filled, the agent is 0% likely to defect.
- **Specialised Defection Risks:** Specific roles have higher base defection chances (e.g., Firearms, Scouting, Interrogation, Protection).

## 🌍 World Events & Funding
The Agency can secure additional funds by participating in or exploiting global milestones:
- **Major Summits:** G20, UN General Assembly, World Economic Forum, Asean Summit, Nato Summit.
- **Security Events:** Munich Security Conference.
- **Global Spectacles:** Olympic Games.
- **Diplomatic Milestones:** Bilateral state visits, Government Funerals.
- **Thematic Events:** Global Health Summit, National Days.

## 🔬 Research & Strategy
The CTO and COO offices collaborate on expanding the agency's capabilities:
- **Methods of Attack:** Researching new ways to strike targets.
- **Arsenal Expansion:** Weapons, new room builds, and creating new staff specialities.
- **Geopolitical Expansion:** Discovering new continents and identifying structures of interest (creating time-limited missions).
- **Strategic Doctrines:** Developing high-level field strategies.

## Economy & Sponsors
- **Sponsorship Challenges:** Sponsors no longer provide passive income only. They issue specific performance-based contracts:
    - **Operational:** "Complete 10 Wetwork missions this week."
    - **Growth:** "Promote 2 Junior agents to Mid-Level."
    - **Efficiency:** "Earn $20k with 0 mission failures."
- **Rewards:** Successfully completing a challenge grants a bulk payout or unique equipment blueprints.
- **Micro-Incentives:** Some sponsors provide a per-mission bonus (e.g., "$100 per mission completed").

## 🏦 Banking & Liquidity (CFO Office)

The CFO provides essential banking services to keep the agency operational during dry spells.

### 💳 Emergency Loans
CEOs have access to 3 standard loan tiers to bridge gaps in cash flow:
1. **The "Seed" Loan:** $5,000 (Low interest). Ideal for initial roster expansion.
2. **The "Growth" Loan:** $25,000 (Moderate interest). Used for building new rooms.
3. **The "Enterprise" Loan:** $100,000 (Market interest). For continental expansion.

**Protocols:**
- **Simultaneous Loans:** All 3 tiers can be taken at once.
- **Lock-out:** Once a loan is active, that tier is unavailable until the principal plus interest is repaid.
- **Repayment:** Loans can be repaid instantly at any time to restore tier availability.

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

## 🏢 Corporate Evolution & Compliance
To maintain maximum profit, the CEO must manage the agency's legal entity and tax efficiency.
- **Thresholds**: Increasing staff size or revenue triggers the need for restructuring.
- **Tax Brackets**: Scaling from Sole Trader to PLC reduces effective tax but increases admin overhead.
- **Penalties**: Failing to restructure before crossing a threshold results in "Penalty Taxation" and increased Heat.
- **Documentation**: See [corporate_evolution.md](file:///home/tom/Code/hitmanhotline/documentation/corporate_evolution.md) for full details.

## 🤝 Social Virality
The agency grows faster through networking.
- **Referrals**: Invite friends for mutual financial bonuses and exclusive assets.
- **Influencers**: Public uplink links for streamers with reward caps and prestige conversion.
- **Duo Contracts**: Unlock cooperative missions with referred affiliates.
- **Documentation**: See [social_mechanics.md](file:///home/tom/Code/hitmanhotline/documentation/social_mechanics.md) for full details.

## PvP (Agency Rivalry)
- **Intel Raids:** Send hitmen to steal resources or intel from other player agencies.
- **Leagues:** Competitive rankings based on agency prestige and mission success.
