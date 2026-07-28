"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const staff_1 = __importDefault(require("./routes/staff"));
const missions_1 = __importDefault(require("./routes/missions"));
const adminTasks_1 = __importDefault(require("./routes/adminTasks"));
const user_1 = __importDefault(require("./routes/user"));
const missionEngine_1 = require("./services/missionEngine");
const adminTaskService_1 = require("./services/adminTaskService");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
// Start Core Services
(0, missionEngine_1.startEngine)();
(0, adminTaskService_1.startTaskGenerator)();
app.use('/api/staff', staff_1.default);
app.use('/api/missions', missions_1.default);
app.use('/api/tasks', adminTasks_1.default);
app.use('/api/user', user_1.default);
app.get('/api/agency', (_req, res) => {
    res.json({
        name: 'The Hotline',
        level: 1,
        hitmen: 1,
        money: 5000,
        reputation: 10,
    });
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
