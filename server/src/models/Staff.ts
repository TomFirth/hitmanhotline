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

export const calculateSalary = (skills: StaffSkills): number => {
  const totalSkills = Object.values(skills).reduce((acc, val) => acc + val, 0);
  const isElite = Object.values(skills).every(s => s >= 5);
  const base = 100;
  const multiplier = totalSkills * 20;
  return isElite ? (base + multiplier) * 1.5 : base + multiplier;
};
