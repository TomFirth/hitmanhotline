export enum StaffType {
  HITMAN = 'HITMAN',
  HR = 'HR',
  SECRETARY = 'SECRETARY',
  TRAINER = 'TRAINER',
  MARKETING = 'MARKETING',
  HANDLER = 'HANDLER',
  PR = 'PR',
  THERAPIST = 'THERAPIST',
  SCOUT = 'SCOUT',
}

export interface StaffSkills {
  combat: number;
  subterfuge: number;
  technical: number;
  logistics: number;
  diplomacy: number;
}

export enum Seniority {
  JUNIOR = 'JUNIOR',
  MID = 'MID',
  SENIOR = 'SENIOR',
  EXECUTIVE = 'EXECUTIVE',
}

export const AGENT_RETIREMENT_AGE = 35;
export const STAFF_RETIREMENT_AGE = 65;
export const PEAK_PERFORMANCE_AGE = 25;
export const DEGRADATION_START_AGE = 30;

export interface Staff {
  id: string;
  userId: string;
  name: string;
  type: StaffType;
  age: number;
  seniority: Seniority;
  experience: number;
  skills: StaffSkills;
  specialTraitId?: string;
  status: 'IDLE' | 'ON_MISSION' | 'CAPTURED' | 'TRAINING';
  salary: number;
  hireDate: Date;
  previousJob?: string;
  quirk?: string;
  backstory?: string;
  flavourText?: string;
  awards?: string[];
}

export const calculateSalary = (skills: StaffSkills, age: number, seniority: Seniority): number => {
  const totalSkills = Object.values(skills).reduce((acc, val) => acc + val, 0);

  const base = 100;
  const skillFactor = totalSkills * 25;
  const ageBonus = Math.max(0, (age - 16) * 5);

  const seniorityMultiplier = {
    [Seniority.JUNIOR]: 1,
    [Seniority.MID]: 1.5,
    [Seniority.SENIOR]: 2,
    [Seniority.EXECUTIVE]: 3,
  };

  const multiplier = seniorityMultiplier[seniority] || 1;

  return Math.floor((base + skillFactor + ageBonus) * multiplier);
};
