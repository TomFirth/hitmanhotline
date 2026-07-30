import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Staff, ActiveMission, AdminTask, User, Transaction, Mission } from '../types/game';

export interface GameNotification {
  id: string;
  type: 'SUCCESS' | 'FAILURE' | 'INFO' | 'URGENT';
  message: string;
}

interface GameState {
  agency: User;
  staff: Staff[];
  activeMissions: ActiveMission[];
  archivedMissions: ActiveMission[];
  missionTemplates: Mission[];
  transactions: Transaction[];
  adminTasks: AdminTask[];
  notifications: GameNotification[];
  isOnline: boolean;
  lastSyncedAt: string | null;

  setAgency: (agency: User) => void;
  setStaff: (staff: Staff[]) => void;
  setActiveMissions: (missions: ActiveMission[]) => void;
  setArchivedMissions: (missions: ActiveMission[]) => void;
  setMissionTemplates: (templates: Mission[]) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setAdminTasks: (tasks: AdminTask[]) => void;
  removeAdminTask: (taskId: string) => void;
  resolveActiveMission: (result: ActiveMission) => void;
  removeAvailableMission: (missionId: string) => void;
  addNotification: (type: GameNotification['type'], message: string) => void;
  removeNotification: (id: string) => void;
  setOnlineStatus: (status: boolean) => void;
  addStaff: (member: Staff) => void;
  deductMoney: (amount: number) => void;
  startMission: (activeMission: ActiveMission) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      agency: {
        id: 'mock-user-id',
        email: 'ceo@agency.com',
        username: 'Director Tom',
        agencyName: 'The Hotline',
        balance: 5000,
        reputation: 10,
        level: 1,
        registrationNumber: 'HH-000-00',
        entityType: 'Sole Trader',
        incorporationDate: new Date().toISOString(),
        registeredAddress: 'Sector 7G, Sub-Level 4',
      },
      staff: [],
      activeMissions: [],
      archivedMissions: [],
      missionTemplates: [],
      transactions: [],
      adminTasks: [],
      notifications: [],
      isOnline: navigator.onLine,
      lastSyncedAt: null,

      setAgency: (agency) => set({ agency }),
      setStaff: (staff) => set({ staff }),
      setActiveMissions: (activeMissions) => set({ activeMissions }),
      setArchivedMissions: (archivedMissions) => set({ archivedMissions }),
      setMissionTemplates: (missionTemplates) => set({ missionTemplates }),
      setTransactions: (transactions) => set({ transactions }),
      setAdminTasks: (adminTasks) => set({ adminTasks }),
      removeAdminTask: (taskId) => set((state) => ({
        adminTasks: state.adminTasks.filter(t => t.id !== taskId)
      })),
      resolveActiveMission: (result) => set((state) => ({
        activeMissions: state.activeMissions.filter(m => m.id !== result.id),
        archivedMissions: [result, ...state.archivedMissions]
      })),
      removeAvailableMission: (missionId) => set((state) => ({
        activeMissions: state.activeMissions.filter(m => m.missionId !== missionId)
      })),
      addNotification: (type, message) => set((state) => ({
        notifications: [...state.notifications, { id: Math.random().toString(36).substr(2, 9), type, message }]
      })),
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      setOnlineStatus: (isOnline) => set({ isOnline }),
      addStaff: (member) => set((state) => ({ staff: [...state.staff, member] })),
      deductMoney: (amount) => set((state) => ({
        agency: { ...state.agency, balance: state.agency.balance - amount }
      })),
      startMission: (mission) => set((state) => ({ activeMissions: [...state.activeMissions, mission] })),
    }),
    {
      name: 'hitman-hotline-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
