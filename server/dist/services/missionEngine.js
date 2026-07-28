"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startEngine = exports.resolveMission = void 0;
const db_1 = __importDefault(require("./db"));
const Mission_1 = require("../models/Mission");
const Staff_1 = require("../models/Staff");
const resolveMission = async (activeMissionId) => {
    const activeMission = await db_1.default.activeMission.findUnique({
        where: { id: activeMissionId },
        include: { user: true }
    });
    if (!activeMission || activeMission.status !== 'IN_PROGRESS')
        return null;
    const mission = await db_1.default.mission.findUnique({
        where: { id: activeMission.missionId }
    });
    if (!mission)
        return null;
    // For this implementation, staffIds is stored as a comma-separated string
    const staffIds = activeMission.staffIds.split(',');
    const assignedStaff = await db_1.default.staff.findMany({
        where: { id: { in: staffIds } }
    });
    // Calculate Success Rate
    const relevantSkill = mission.type === Mission_1.MissionType.WETWORK ? 'combat' :
        mission.type === Mission_1.MissionType.CYBER ? 'technical' :
            mission.type === Mission_1.MissionType.SOCIAL ? 'diplomacy' : 'subterfuge';
    const totalSkill = assignedStaff.reduce((acc, s) => acc + (s[relevantSkill] || 1), 0);
    // Seniority Bonus: Each senior gives +10%, Executive gives +20%
    const seniorityBonus = assignedStaff.reduce((acc, s) => {
        if (s.seniority === Staff_1.Seniority.EXECUTIVE)
            return acc + 0.2;
        if (s.seniority === Staff_1.Seniority.SENIOR)
            return acc + 0.1;
        return acc;
    }, 0);
    const baseRate = (totalSkill / (mission.difficulty * 2)) + seniorityBonus;
    const successChance = Math.min(Math.max(baseRate, 0.1), 0.95); // Max 95% to keep risk
    const roll = Math.random();
    let status = 'FAILURE';
    let xpMultiplier = 1;
    if (roll < successChance * 0.2) {
        status = 'SUCCESS'; // Critical Success (imagined)
        xpMultiplier = 2;
    }
    else if (roll < successChance) {
        status = 'SUCCESS';
    }
    else if (roll > 0.9 && mission.riskLevel > 2) {
        status = 'CAPTURED';
    }
    // Handle Rewards
    const cashReward = status === 'SUCCESS' ? mission.cashReward : 0;
    const intelReward = status === 'SUCCESS' ? mission.intelReward : 0;
    const xpReward = Math.floor((mission.difficulty * 50) * xpMultiplier);
    // Update Database
    await db_1.default.$transaction([
        db_1.default.activeMission.update({
            where: { id: activeMissionId },
            data: { status }
        }),
        db_1.default.user.update({
            where: { id: activeMission.userId },
            data: {
                balance: { increment: cashReward },
                reputation: { increment: status === 'SUCCESS' ? 1 : -2 }
            }
        }),
        ...assignedStaff.map(s => db_1.default.staff.update({
            where: { id: s.id },
            data: {
                status: status === 'CAPTURED' ? 'CAPTURED' : 'IDLE',
                experience: { increment: xpReward }
            }
        }))
    ]);
    return {
        status,
        rewards: { cash: cashReward, intel: intelReward, xp: xpReward },
        staffIds
    };
};
exports.resolveMission = resolveMission;
const startEngine = () => {
    console.log('Mission Engine Initialized [Mode: Background Ticker]');
    setInterval(async () => {
        const expiredMissions = await db_1.default.activeMission.findMany({
            where: {
                status: 'IN_PROGRESS',
                endTime: { lte: new Date() }
            }
        });
        for (const mission of expiredMissions) {
            console.log(`Resolving Mission: ${mission.id}`);
            await (0, exports.resolveMission)(mission.id);
        }
    }, 10000); // Check every 10 seconds
};
exports.startEngine = startEngine;
