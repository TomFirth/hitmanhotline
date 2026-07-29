"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSalary = exports.DEGRADATION_START_AGE = exports.PEAK_PERFORMANCE_AGE = exports.STAFF_RETIREMENT_AGE = exports.AGENT_RETIREMENT_AGE = exports.Seniority = exports.StaffType = void 0;
var StaffType;
(function (StaffType) {
    StaffType["HITMAN"] = "HITMAN";
    StaffType["HR"] = "HR";
    StaffType["SECRETARY"] = "SECRETARY";
    StaffType["TRAINER"] = "TRAINER";
    StaffType["MARKETING"] = "MARKETING";
    StaffType["HANDLER"] = "HANDLER";
    StaffType["PR"] = "PR";
    StaffType["THERAPIST"] = "THERAPIST";
    StaffType["SCOUT"] = "SCOUT";
})(StaffType || (exports.StaffType = StaffType = {}));
var Seniority;
(function (Seniority) {
    Seniority["JUNIOR"] = "JUNIOR";
    Seniority["MID"] = "MID";
    Seniority["SENIOR"] = "SENIOR";
    Seniority["EXECUTIVE"] = "EXECUTIVE";
})(Seniority || (exports.Seniority = Seniority = {}));
exports.AGENT_RETIREMENT_AGE = 35;
exports.STAFF_RETIREMENT_AGE = 65;
exports.PEAK_PERFORMANCE_AGE = 25;
exports.DEGRADATION_START_AGE = 30;
const calculateSalary = (skills, age, seniority) => {
    const totalSkills = Object.values(skills).reduce((acc, val) => acc + val, 0);
    const base = 100;
    const skillFactor = totalSkills * 25;
    const ageBonus = Math.max(0, (age - 16) * 5);
    const seniorityMultiplier = {
        [Seniority.JUNIOR]: 1,
        [Seniority.MID]: 1.5,
        [Seniority.SENIOR]: 2,
        [Seniority.EXECUTIVE]: 3,
    };
    const multiplier = seniorityMultiplier[seniority] || 1;
    return Math.floor((base + skillFactor + ageBonus) * multiplier);
};
exports.calculateSalary = calculateSalary;
