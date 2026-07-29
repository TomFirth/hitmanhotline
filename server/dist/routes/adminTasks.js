"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../services/db"));
const adminTaskService_1 = require("../services/adminTaskService");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const userId = req.query.userId || 'mock-user-id';
    const tasks = await db_1.default.adminTask.findMany({
        where: { userId }
    });
    const parsedTasks = tasks.map(t => ({
        ...t,
        options: JSON.parse(t.options)
    }));
    res.json(parsedTasks);
});
router.post('/resolve', async (req, res) => {
    const { taskId, optionIndex } = req.body;
    try {
        const result = await (0, adminTaskService_1.resolveTask)(taskId, optionIndex);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post('/generate', async (req, res) => {
    const userId = req.body.userId || 'mock-user-id';
    const task = await (0, adminTaskService_1.generateRandomTask)(userId);
    res.status(201).json({ ...task, options: JSON.parse(task.options) });
});
exports.default = router;
