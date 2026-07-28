"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSalary = exports.Seniority = exports.StaffType = void 0;
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
const calculateSalary = (skills) => {
    const totalSkills = Object.values(skills).reduce((acc, val) => acc + val, 0);
    // Base salary + skill multiplier
    // If all skills are 5 (max), salary is higher.
    const isElite = Object.values(skills).every(s => s >= 5);
    const base = 100;
    const multiplier = totalSkills * 20;
    return isElite ? (base + multiplier) * 1.5 : base + multiplier;
};
exports.calculateSalary = calculateSalary;
