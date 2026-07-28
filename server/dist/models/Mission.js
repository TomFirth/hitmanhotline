"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSuccessRate = exports.MissionType = void 0;
var MissionType;
(function (MissionType) {
    MissionType["WETWORK"] = "WETWORK";
    MissionType["INTEL"] = "INTEL";
    MissionType["CYBER"] = "CYBER";
    MissionType["SOCIAL"] = "SOCIAL";
    MissionType["RECON"] = "RECON";
})(MissionType || (exports.MissionType = MissionType = {}));
const calculateSuccessRate = (mission, assignedStaff) => {
    // Simplistic calculation for now
    // Sum of relevant skills vs difficulty
    const relevantSkill = mission.type === MissionType.WETWORK ? 'combat' :
        mission.type === MissionType.CYBER ? 'technical' :
            mission.type === MissionType.SOCIAL ? 'diplomacy' : 'subterfuge';
    const totalSkill = assignedStaff.reduce((acc, s) => acc + (s.skills[relevantSkill] || 1), 0);
    const baseRate = (totalSkill / (mission.difficulty * 2)) * 100;
    return Math.min(Math.max(baseRate, 10), 100); // 10% min, 100% max
};
exports.calculateSuccessRate = calculateSuccessRate;
