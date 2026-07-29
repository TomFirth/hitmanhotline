import { StaffType, Seniority, StaffSkills, AGENT_RETIREMENT_AGE, PEAK_PERFORMANCE_AGE, DEGRADATION_START_AGE } from '../models/Staff';
import { generateFlavour } from './flavourGenerator';

export const calculateStatCap = (age: number): number => {
  if (age <= 16) return 2;
  if (age <= 21) return 4;
  if (age <= PEAK_PERFORMANCE_AGE) return 10;
  if (age <= DEGRADATION_START_AGE) return 10;

  
  const yearsPast30 = age - DEGRADATION_START_AGE;
  return Math.max(1, 10 - yearsPast30 * 1.5);
};

export const generateRandomSkills = (age: number, isEliteProspect: boolean = false): StaffSkills => {
  const cap = calculateStatCap(age);

  const genStat = () => {
    if (isEliteProspect) return cap;
    
    const min = Math.max(1, Math.floor(cap * 0.4));
    return min + Math.floor(Math.random() * (cap - min + 1));
  };

  return {
    combat: genStat(),
    subterfuge: genStat(),
    technical: genStat(),
    logistics: genStat(),
    diplomacy: genStat(),
  };
};

export const generateRecruit = (overrides: any = {}) => {
  const isElite = overrides.age === 16;
  const age = overrides.age || (18 + Math.floor(Math.random() * 13)); 

  
  const types = Object.values(StaffType);
  const type = overrides.type || (Math.random() > 0.3 ? StaffType.HITMAN : types[Math.floor(Math.random() * types.length)]);

  const skills = generateRandomSkills(age, isElite);
  const flavour = generateFlavour();

  let seniority = Seniority.JUNIOR;
  if (age > 30) seniority = Seniority.SENIOR;
  else if (age > 24) seniority = Seniority.MID;

  const experience = seniority === Seniority.SENIOR ? 500 : seniority === Seniority.MID ? 200 : 0;

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: `Recruit ${Math.floor(Math.random() * 1000)}`,
    type,
    age,
    seniority,
    experience,
    combat: skills.combat,
    subterfuge: skills.subterfuge,
    technical: skills.technical,
    logistics: skills.logistics,
    diplomacy: skills.diplomacy,
    status: 'IDLE',
    hireDate: new Date(),
    ...flavour,
    awards: '',
    cost: calculateRecruitCost(age, seniority, skills, isElite)
  };
};

const calculateRecruitCost = (age: number, seniority: Seniority, skills: StaffSkills, isElite: boolean): number => {
  const skillSum = Object.values(skills).reduce((a, b) => a + b, 0);
  let base = 500;

  if (seniority === Seniority.SENIOR) base = 5000;
  else if (seniority === Seniority.MID) base = 2500;

  if (isElite) base *= 3; 

  return base + (skillSum * 100) + Math.floor(Math.random() * 1000);
};

export const generateMarketPool = (count: number = 10) => {
  return Array.from({ length: count }).map(() => generateRecruit());
};
