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
    const staffIds = activeMission.staffIds.split(',');
    const assignedStaff = await db_1.default.staff.findMany({
        where: { id: { in: staffIds } }
    });
    const relevantSkill = mission.type === Mission_1.MissionType.WETWORK ? 'combat' :
        mission.type === Mission_1.MissionType.CYBER ? 'technical' :
            mission.type === Mission_1.MissionType.SOCIAL ? 'diplomacy' : 'subterfuge';
    const totalSkill = assignedStaff.reduce((acc, s) => acc + (s[relevantSkill] || 1), 0);
    const seniorityBonus = assignedStaff.reduce((acc, s) => {
        if (s.seniority === Staff_1.Seniority.EXECUTIVE)
            return acc + 0.2;
        if (s.seniority === Staff_1.Seniority.SENIOR)
            return acc + 0.1;
        return acc;
    }, 0);
    const baseRate = (totalSkill / (mission.difficulty * 2)) + seniorityBonus;
    const successChance = Math.min(Math.max(baseRate, 0.1), 0.95);
    const roll = Math.random();
    let status = 'FAILURE';
    let outcomeDetails = "Mission failure. Extraction complete.";
    let xpMultiplier = 1;
    if (roll < successChance * 0.2) {
        status = 'SUCCESS';
        outcomeDetails = "Critical success. Objective secured, all agents extracted safely.";
        xpMultiplier = 2;
    }
    else if (roll < successChance) {
        status = 'SUCCESS';
        outcomeDetails = "Success. Objective secured, agents returned safely.";
    }
    else {
        const riskRoll = Math.random();
        const riskFactor = mission.riskLevel / 10;
        if (riskRoll < riskFactor * 0.3) {
            if (mission.riskLevel >= 9 && Math.random() > 0.8) {
                status = 'DECEASED';
                outcomeDetails = "Catastrophic failure. Asset neutralized in field.";
            }
            else {
                status = 'CAPTURED';
                outcomeDetails = "Failure. Asset captured and held for ransom.";
            }
        }
        else {
            status = 'FAILURE';
            outcomeDetails = "Standard failure. Agents forced to extract prematurely.";
        }
    }
    const cashReward = status === 'SUCCESS' ? mission.cashReward : 0;
    const intelReward = status === 'SUCCESS' ? mission.intelReward : 0;
    const xpReward = Math.floor((mission.difficulty * 50) * xpMultiplier);
    const operations = [
        db_1.default.activeMission.update({
            where: { id: activeMissionId },
            data: { status, outcomeDetails }
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
                status: (status === 'CAPTURED' || status === 'DECEASED') ? status : 'IDLE',
                experience: { increment: xpReward }
            }
        }))
    ];
    if (cashReward > 0) {
        operations.push(db_1.default.transaction.create({
            data: {
                userId: activeMission.userId,
                amount: cashReward,
                type: 'INCOME',
                description: `Mission Payout: ${mission.name}`
            }
        }));
    }
    await db_1.default.$transaction(operations);
    return {
        status,
        rewards: { cash: cashReward, intel: intelReward, xp: xpReward },
        staffIds
    };
};
exports.resolveMission = resolveMission;
const startEngine = () => {
    console.log('Mission Engine Initialised [Mode: Background Ticker]');
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
    }, 10000);
};
exports.startEngine = startEngine;
