-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Staff" (
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
    "seniority" TEXT NOT NULL DEFAULT 'JUNIOR',
    "experience" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'IDLE',
    "salary" INTEGER NOT NULL,
    "hireDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Staff" ("age", "combat", "diplomacy", "hireDate", "id", "logistics", "name", "salary", "specialTraitId", "status", "subterfuge", "technical", "type", "userId") SELECT "age", "combat", "diplomacy", "hireDate", "id", "logistics", "name", "salary", "specialTraitId", "status", "subterfuge", "technical", "type", "userId" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
