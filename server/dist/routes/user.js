"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../services/db"));
const router = (0, express_1.Router)();
router.post('/heartbeat', async (req, res) => {
    const userId = req.body.userId || 'mock-user-id';
    try {
        await db_1.default.user.update({
            where: { id: userId },
            data: { lastActiveAt: new Date() }
        });
        res.json({ status: 'ok' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/me', async (req, res) => {
    const userId = req.query.userId || 'mock-user-id';
    const user = await db_1.default.user.findUnique({
        where: { id: userId }
    });
    res.json(user);
});
router.post('/update-profile', async (req, res) => {
    const { userId, username, email, password } = req.body;
    const targetId = userId || 'mock-user-id';
    try {
        const updatedUser = await db_1.default.user.update({
            where: { id: targetId },
            data: {
                username,
                email,
                password
            }
        });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post('/update-agency', async (req, res) => {
    const { userId, agencyName, entityType, registeredAddress } = req.body;
    const targetId = userId || 'mock-user-id';
    try {
        const updatedUser = await db_1.default.user.update({
            where: { id: targetId },
            data: {
                agencyName,
                entityType,
                registeredAddress
            }
        });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
