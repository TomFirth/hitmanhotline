"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTaskGenerator = exports.resolveTask = exports.generateRandomTask = void 0;
const db_1 = __importDefault(require("./db"));
const adminTaskData_1 = require("./adminTaskData");
const generateRandomTask = async (userId) => {
    const template = adminTaskData_1.ADMIN_TASK_TEMPLATES[Math.floor(Math.random() * adminTaskData_1.ADMIN_TASK_TEMPLATES.length)];
    return await db_1.default.adminTask.create({
        data: {
            userId,
            category: template.category,
            sender: template.sender,
            subject: template.subject,
            content: template.content,
            options: JSON.stringify(template.options)
        }
    });
};
exports.generateRandomTask = generateRandomTask;
const resolveTask = async (taskId, optionIndex) => {
    const task = await db_1.default.adminTask.findUnique({
        where: { id: taskId },
        include: { user: true }
    });
    if (!task)
        throw new Error('Task not found');
    const options = JSON.parse(task.options);
    const selectedOption = options[optionIndex];
    if (!selectedOption)
        throw new Error('Invalid option selected');
    const { impact } = selectedOption;
    await db_1.default.user.update({
        where: { id: task.userId },
        data: {
            balance: { increment: impact.cash || 0 },
            reputation: { increment: impact.reputation || 0 }
        }
    });
    await db_1.default.adminTask.delete({
        where: { id: taskId }
    });
    return {
        response: selectedOption.label,
        flavourResponse: selectedOption.flavourResponse,
        impact
    };
};
exports.resolveTask = resolveTask;
const startTaskGenerator = () => {
    console.log('CEO Inbox Service Initialised [Mode: Daily Briefing Generator]');
    setInterval(async () => {
        const users = await db_1.default.user.findMany();
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        for (const user of users) {
            if (user.lastActiveAt < fiveMinutesAgo) {
                continue;
            }
            const taskCount = await db_1.default.adminTask.count({ where: { userId: user.id } });
            if (taskCount < 3) {
                await (0, exports.generateRandomTask)(user.id);
                console.log(`Generated daily briefing task for active user: ${user.username}`);
            }
        }
    }, 43200000);
};
exports.startTaskGenerator = startTaskGenerator;
