"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../services/db"));
const missionGenerator_1 = require("../services/missionGenerator");
const router = (0, express_1.Router)();
router.post('/refresh', async (req, res) => {
    const count = 10;
    const missions = (0, missionGenerator_1.generateMissionPool)(count);
    await db_1.default.mission.deleteMany();
    const created = [];
    for (const m of missions) {
        created.push(await db_1.default.mission.create({ data: m }));
    }
    res.json(created);
});
router.get('/available', async (req, res) => {
    const missions = await db_1.default.mission.findMany();
    res.json(missions);
});
router.get('/active', async (req, res) => {
    const active = await db_1.default.activeMission.findMany({
        where: { status: 'IN_PROGRESS' }
    });
    res.json(active);
});
router.post('/start', async (req, res) => {
    const { missionId, staffIds, userId } = req.body;
    const mission = await db_1.default.mission.findUnique({ where: { id: missionId } });
    if (!mission)
        return res.status(404).json({ error: 'Mission not found' });
    const targetUserId = userId || 'mock-user-id';
    const user = await db_1.default.user.findUnique({ where: { id: targetUserId } });
    if (!user) {
        return res.status(403).json({ error: 'User registration not found. Please re-initialise.' });
    }
    const activeMission = await db_1.default.activeMission.create({
        data: {
            missionId,
            userId: targetUserId,
            staffIds: staffIds.join(','),
            startTime: new Date(),
            endTime: new Date(Date.now() + mission.durationSeconds * 1000),
            status: 'IN_PROGRESS'
        }
    });
    await db_1.default.staff.updateMany({
        where: { id: { in: staffIds } },
        data: { status: 'ON_MISSION' }
    });
    res.status(201).json(activeMission);
});
router.get('/status/:id', async (req, res) => {
    const { id } = req.params;
    const activeMission = await db_1.default.activeMission.findUnique({
        where: { id: id }
    });
    res.json(activeMission);
});
exports.default = router;
