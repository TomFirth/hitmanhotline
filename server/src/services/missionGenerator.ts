import { MissionType } from '../models/Mission';

const MISSION_NAMES = {
  [MissionType.WETWORK]: ["Quiet Disposal", "The VIP Problem", "Midnight Contract", "Silenced Asset"],
  [MissionType.INTEL]: ["Data Retrieval", "Shadow Surveillance", "Blueprint Heist", "Contact Tracer"],
  [MissionType.CYBER]: ["Mainframe Breach", "Crypto Siphon", "Ghost Protocol", "Firewall Bypass"],
  [MissionType.SOCIAL]: ["Gala Infiltration", "Deep Cover", "The Honeypot", "Diplomatic Shakedown"],
  [MissionType.RECON]: ["Sector Scan", "Safehouse Watch", "Border Crossing", "High-Ground Survey"]
};

const MISSION_DESCRIPTIONS = [
  "A high-stakes operation requiring precision and steady nerves.",
  "The client is offering a premium for absolute discretion.",
  "Minimal footprint required. Failure is not an option.",
  "Expect heavy resistance in the extraction phase.",
  "A straightforward contract for a disciplined professional."
];

export const generateRandomMission = () => {
  const types = Object.values(MissionType);
  const type = types[Math.floor(Math.random() * types.length)] as MissionType;
  const nameList = MISSION_NAMES[type];
  const name = nameList[Math.floor(Math.random() * nameList.length)] + " " + (Math.floor(Math.random() * 900) + 100);

  const difficulty = Math.floor(Math.random() * 10) + 1; 
  const riskLevel = Math.floor(Math.random() * 10) + 1; 

  
  let durationSeconds = 0;
  const roll = Math.random();
  if (roll < 0.1) {
    
    durationSeconds = (Math.floor(Math.random() * 31) + 15) * 60;
  } else if (roll < 0.7) {
    
    durationSeconds = (Math.floor(Math.random() * 7) + 2) * 3600;
  } else {
    
    durationSeconds = (Math.floor(Math.random() * 3) + 1) * 86400;
  }

  const durationHours = durationSeconds / 3600;
  const cashReward = (difficulty * 500) + (riskLevel * 500) + Math.floor(durationHours * 200);
  const intelReward = Math.floor(Math.random() * 10) + (difficulty * 3);

  return {
    name,
    type,
    description: MISSION_DESCRIPTIONS[Math.floor(Math.random() * MISSION_DESCRIPTIONS.length)],
    difficulty,
    durationSeconds,
    cashReward,
    intelReward,
    riskLevel
  };
};

export const generateMissionPool = (count: number = 10) => {
  return Array.from({ length: count }).map(() => generateRandomMission());
};
