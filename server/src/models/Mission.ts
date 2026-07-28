export enum MissionType {
  WETWORK = 'WETWORK',
  INTEL = 'INTEL',
  CYBER = 'CYBER',
  SOCIAL = 'SOCIAL',
  RECON = 'RECON',
}

export interface Mission {
  id: string;
  name: string;
  type: MissionType;
  description: string;
  difficulty: number;
  durationSeconds: number;
  rewards: {
    cash: number;
    intel?: number;
    items?: string[];
  };
  riskLevel: number;
}

export interface ActiveMission {
  id: string;
  missionId: string;
  userId: string;
  staffIds: string[];
  startTime: Date;
  endTime: Date;
  status: 'IN_PROGRESS' | 'SUCCESS' | 'FAILURE' | 'CAPTURED';
}

export const calculateSuccessRate = (mission: Mission, assignedStaff: { skills: any }[]): number => {
  const relevantSkill = mission.type === MissionType.WETWORK ? 'combat' :
                       mission.type === MissionType.CYBER ? 'technical' :
                       mission.type === MissionType.SOCIAL ? 'diplomacy' : 'subterfuge';

  const totalSkill = assignedStaff.reduce((acc, s) => acc + (s.skills[relevantSkill] || 1), 0);
  const baseRate = (totalSkill / (mission.difficulty * 2)) * 100;

  return Math.min(Math.max(baseRate, 10), 100);
};
