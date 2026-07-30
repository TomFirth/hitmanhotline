export interface User {
  id: string;
  email: string;
  username: string;
  agencyName: string;
  balance: number;
  reputation: number;
  level: number;
  registrationNumber: string;
  entityType: string;
  incorporationDate: string;
  registeredAddress: string;
}

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
  hireDate: string;
  previousJob?: string;
  quirk?: string;
  backstory?: string;
  flavourText?: string;
  awards?: string[];
  lastSalaryReview?: string;

  
  auctionExpiry?: string;
  startingPrice?: number;
  auctionBids?: {
    id: string;
    userId: string;
    amount: number;
    user: User;
  }[];
}

export interface Mission {
  id: string;
  name: string;
  type: string;
  description: string;
  difficulty: number;
  durationSeconds: number;
  cashReward: number;
  intelReward: number;
  riskLevel: number;
  requiredSpeciality?: string;
  requiredStaffCount?: number;
}

export interface ActiveMission {
  id: string;
  missionId: string;
  userId: string;
  staffIds: string;
  startTime: string;
  endTime: string;
  status: 'IN_PROGRESS' | 'SUCCESS' | 'FAILURE' | 'CAPTURED' | 'DECEASED';
  outcomeDetails?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  description: string;
  createdAt: string;
}

export interface AdminTask {
  id: string;
  category: 'HR' | 'FINANCE' | 'LEGAL' | 'MARKETING' | 'NEWS';
  sender: string;
  subject: string;
  content: string;
  options: {
    label: string;
    flavourResponse: string;
    impact: any;
  }[];
  createdAt: string;
}
