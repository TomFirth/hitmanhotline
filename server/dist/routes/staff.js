"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Staff_1 = require("../models/Staff");
const flavourGenerator_1 = require("../services/flavourGenerator");
const staffGenerator_1 = require("../services/staffGenerator");
const db_1 = __importDefault(require("../services/db"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const staff = await db_1.default.staff.findMany();
        const formattedStaff = staff.map(s => ({
            ...s,
            awards: s.awards ? s.awards.split(',') : []
        }));
        res.json(formattedStaff);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch staff' });
    }
});
router.post('/init-agency', async (req, res) => {
    const userId = 'mock-user-id';
    const existingStaff = await db_1.default.staff.findMany({ where: { userId } });
    if (existingStaff.length > 0) {
        return res.status(200).json({ message: 'Agency already initialised' });
    }
    let user = await db_1.default.user.findUnique({ where: { id: userId } });
    if (!user) {
        user = await db_1.default.user.create({
            data: {
                id: userId,
                email: 'ceo@agency.com',
                username: 'Director Tom',
                password: 'hashed_password',
                balance: 5000,
                reputation: 10,
                registrationNumber: `HH-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 90 + 10)}`,
                entityType: 'Sole Trader',
                incorporationDate: new Date(),
                registeredAddress: 'Sector 7G, Sub-Level 4, Agency HQ'
            }
        });
    }
    const agent47 = await db_1.default.staff.create({
        data: {
            userId,
            name: 'Agent 47',
            type: Staff_1.StaffType.HITMAN,
            age: 35,
            seniority: Staff_1.Seniority.SENIOR,
            experience: 850,
            combat: 5,
            subterfuge: 4,
            technical: 2,
            logistics: 3,
            diplomacy: 1,
            salary: 500,
            status: 'IDLE',
            previousJob: 'Unknown',
            quirk: 'Refuses to wear anything but a suit',
            backstory: 'The most efficient asset in the history of the industry.',
            flavourText: 'A legend among shadows.',
            awards: ''
        }
    });
    res.status(201).json({
        user,
        staff: await db_1.default.staff.findMany({ where: { userId } })
    });
});
router.get('/pool', async (req, res) => {
    try {
        const { typeGroup, role, minCombat, minSubterfuge, minTechnical, minLogistics, minDiplomacy, search } = req.query;
        const where = { userId: 'market-user-id' };
        if (typeGroup === 'AGENT') {
            where.type = Staff_1.StaffType.HITMAN;
        }
        else if (typeGroup === 'STAFF') {
            where.type = { not: Staff_1.StaffType.HITMAN };
        }
        if (role) {
            where.type = role;
        }
        if (search) {
            where.OR = [
                { name: { contains: String(search) } },
                { flavourText: { contains: String(search) } }
            ];
        }
        if (minCombat)
            where.combat = { gte: parseInt(String(minCombat)) };
        if (minSubterfuge)
            where.subterfuge = { gte: parseInt(String(minSubterfuge)) };
        if (minTechnical)
            where.technical = { gte: parseInt(String(minTechnical)) };
        if (minLogistics)
            where.logistics = { gte: parseInt(String(minLogistics)) };
        if (minDiplomacy)
            where.diplomacy = { gte: parseInt(String(minDiplomacy)) };
        let pool = await db_1.default.staff.findMany({ where });
        if (pool.length < 10) {
            console.log(`Auditor: Market low on ${typeGroup || 'assets'} (${pool.length} found). Backfilling...`);
            const countToGenerate = 10;
            const newRecruits = Array.from({ length: countToGenerate }).map(() => (0, staffGenerator_1.generateRecruit)({
                type: typeGroup === 'AGENT' ? Staff_1.StaffType.HITMAN : (typeGroup === 'STAFF' ? undefined : null)
            }));
            for (const r of newRecruits) {
                const { id, cost, ...data } = r;
                if (typeGroup === 'STAFF' && data.type === Staff_1.StaffType.HITMAN) {
                    const types = Object.values(Staff_1.StaffType).filter(t => t !== Staff_1.StaffType.HITMAN);
                    data.type = types[Math.floor(Math.random() * types.length)];
                }
                await db_1.default.staff.create({
                    data: {
                        ...data,
                        salary: (0, Staff_1.calculateSalary)({
                            combat: r.combat,
                            subterfuge: r.subterfuge,
                            technical: r.technical,
                            logistics: r.logistics,
                            diplomacy: r.diplomacy
                        }, r.age, r.seniority),
                        userId: 'market-user-id',
                        awards: ''
                    }
                });
            }
            pool = await db_1.default.staff.findMany({ where });
        }
        const formattedPool = pool.map(s => {
            const skillSum = s.combat + s.subterfuge + s.technical + s.logistics + s.diplomacy;
            let base = 500;
            if (s.seniority === 'SENIOR')
                base = 5000;
            else if (s.seniority === 'MID')
                base = 2500;
            if (s.age === 16)
                base *= 3;
            return {
                ...s,
                awards: s.awards ? s.awards.split(',') : [],
                cost: base + (skillSum * 100) + Math.floor(Math.random() * 500)
            };
        });
        res.json(formattedPool);
    }
    catch (error) {
        console.error('Error fetching market pool:', error);
        res.status(500).json({ error: 'Failed to fetch market' });
    }
});
router.post('/spawn-market', (req, res) => {
    const pool = (0, staffGenerator_1.generateMarketPool)(10);
    res.json(pool);
});
router.post('/recruit', (req, res) => {
    const { name, type } = req.body;
    const flavour = (0, flavourGenerator_1.generateFlavour)();
    const age = 20 + Math.floor(Math.random() * 20);
    const seniority = Staff_1.Seniority.JUNIOR;
    const skills = {
        combat: 1,
        subterfuge: 1,
        technical: 1,
        logistics: 1,
        diplomacy: 1,
    };
    const newStaff = {
        id: Math.random().toString(36).substr(2, 9),
        userId: 'user123',
        name: name || 'New Recruit',
        type: type || Staff_1.StaffType.HITMAN,
        age,
        seniority,
        experience: 0,
        skills,
        status: 'IDLE',
        hireDate: new Date(),
        ...flavour,
        awards: [],
    };
    newStaff.salary = (0, Staff_1.calculateSalary)(newStaff.skills, age, seniority);
    res.status(201).json(newStaff);
});
router.post('/hire/:id', async (req, res) => {
    const { id } = req.params;
    const { userId, cost } = req.body;
    const targetUserId = userId || 'mock-user-id';
    try {
        const agent = await db_1.default.staff.findUnique({ where: { id: id } });
        if (!agent || agent.userId !== 'market-user-id') {
            return res.status(404).json({ error: 'Asset not available in market' });
        }
        const user = await db_1.default.user.findUnique({ where: { id: targetUserId } });
        if (!user || user.balance < cost) {
            return res.status(400).json({ error: 'Insufficient funds' });
        }
        const updated = await db_1.default.$transaction([
            db_1.default.user.update({
                where: { id: targetUserId },
                data: { balance: { decrement: cost } }
            }),
            db_1.default.staff.update({
                where: { id: id },
                data: {
                    userId: targetUserId,
                    hireDate: new Date(),
                    status: 'IDLE'
                }
            })
        ]);
        res.json(updated[1]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/fire/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    const targetUserId = userId || 'mock-user-id';
    try {
        const agent = await db_1.default.staff.findUnique({ where: { id: id } });
        if (!agent || agent.userId !== targetUserId) {
            return res.status(403).json({ error: 'Unauthorised: You do not own this asset' });
        }
        const updated = await db_1.default.staff.update({
            where: { id: id },
            data: {
                userId: 'market-user-id',
                status: 'IDLE',
                hireDate: new Date()
            }
        });
        res.json({ message: 'Asset terminated and returned to public market pool', asset: updated });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
