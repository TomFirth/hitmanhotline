"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Staff_1 = require("../models/Staff");
const flavorGenerator_1 = require("../services/flavorGenerator");
const db_1 = __importDefault(require("../services/db"));
const router = (0, express_1.Router)();
// Mock data for initial implementation
let mockStaff = [
    {
        id: '1',
        userId: 'user123',
        name: 'Agent 47',
        type: Staff_1.StaffType.HITMAN,
        age: 35,
        seniority: Staff_1.Seniority.SENIOR,
        experience: 850,
        skills: {
            combat: 5,
            subterfuge: 4,
            technical: 2,
            logistics: 3,
            diplomacy: 1,
        },
        status: 'IDLE',
        salary: 500,
        hireDate: new Date(),
    }
];
router.get('/', async (req, res) => {
    const staff = await db_1.default.staff.findMany();
    // Map string awards to array
    const formattedStaff = staff.map(s => ({
        ...s,
        awards: s.awards ? s.awards.split(',') : []
    }));
    res.json(formattedStaff);
});
router.post('/init-agency', async (req, res) => {
    const userId = 'mock-user-id';
    // Check if user already has staff
    const existingStaff = await db_1.default.staff.findMany({ where: { userId } });
    if (existingStaff.length > 0) {
        return res.status(200).json({ message: 'Agency already initialized' });
    }
    // Ensure default user exists
    let user = await db_1.default.user.findUnique({ where: { id: userId } });
    if (!user) {
        user = await db_1.default.user.create({
            data: {
                id: userId,
                email: 'ceo@agency.com',
                username: 'Director Tom',
                password: 'hashed_password', // Mock
                balance: 5000,
                reputation: 10,
                registrationNumber: `HH-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 90 + 10)}`,
                entityType: 'Sole Trader',
                incorporationDate: new Date(),
                registeredAddress: 'Sector 7G, Sub-Level 4, Agency HQ'
            }
        });
    }
    // Recruit Agent 47 (The Legend)
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
            flavorText: 'A legend among shadows.',
            awards: ''
        }
    });
    res.status(201).json({
        user,
        staff: [{ ...agent47, awards: [] }]
    });
});
router.get('/pool', (req, res) => {
    const pool = Array.from({ length: 3 }).map(() => {
        const flavor = (0, flavorGenerator_1.generateFlavor)();
        const skills = {
            combat: 1 + Math.floor(Math.random() * 2),
            subterfuge: 1 + Math.floor(Math.random() * 2),
            technical: 1 + Math.floor(Math.random() * 2),
            logistics: 1 + Math.floor(Math.random() * 2),
            diplomacy: 1 + Math.floor(Math.random() * 2),
        };
        const age = 20 + Math.floor(Math.random() * 25);
        const seniority = age > 38 ? Staff_1.Seniority.SENIOR : age > 30 ? Staff_1.Seniority.MID : Staff_1.Seniority.JUNIOR;
        return {
            id: Math.random().toString(36).substr(2, 9),
            name: `Recruit ${Math.floor(Math.random() * 1000)}`,
            type: Staff_1.StaffType.HITMAN,
            age,
            seniority,
            experience: seniority === Staff_1.Seniority.SENIOR ? 500 : seniority === Staff_1.Seniority.MID ? 200 : 0,
            skills,
            salary: (0, Staff_1.calculateSalary)(skills),
            ...flavor,
            cost: (seniority === Staff_1.Seniority.SENIOR ? 5000 : seniority === Staff_1.Seniority.MID ? 2500 : 500) + Math.floor(Math.random() * 1000),
        };
    });
    res.json(pool);
});
router.post('/recruit', (req, res) => {
    const { name, type } = req.body;
    const flavor = (0, flavorGenerator_1.generateFlavor)();
    const newStaff = {
        id: Math.random().toString(36).substr(2, 9),
        userId: 'user123',
        name: name || 'New Recruit',
        type: type || Staff_1.StaffType.HITMAN,
        age: 20 + Math.floor(Math.random() * 20),
        seniority: Staff_1.Seniority.JUNIOR,
        experience: 0,
        skills: {
            combat: 1,
            subterfuge: 1,
            technical: 1,
            logistics: 1,
            diplomacy: 1,
        },
        status: 'IDLE',
        hireDate: new Date(),
        ...flavor,
        awards: [],
    };
    newStaff.salary = (0, Staff_1.calculateSalary)(newStaff.skills);
    mockStaff.push(newStaff);
    res.status(201).json(newStaff);
});
exports.default = router;
