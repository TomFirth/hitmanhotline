-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "agencyName" TEXT NOT NULL DEFAULT 'The Hotline',
    "balance" INTEGER NOT NULL DEFAULT 5000,
    "reputation" INTEGER NOT NULL DEFAULT 10,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "combat" INTEGER NOT NULL DEFAULT 1,
    "subterfuge" INTEGER NOT NULL DEFAULT 1,
    "technical" INTEGER NOT NULL DEFAULT 1,
    "logistics" INTEGER NOT NULL DEFAULT 1,
    "diplomacy" INTEGER NOT NULL DEFAULT 1,
    "specialTraitId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'IDLE',
    "salary" INTEGER NOT NULL,
    "hireDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Mission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "cashReward" INTEGER NOT NULL,
    "intelReward" INTEGER NOT NULL DEFAULT 0,
    "riskLevel" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ActiveMission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "missionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "staffIds" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    CONSTRAINT "ActiveMission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
