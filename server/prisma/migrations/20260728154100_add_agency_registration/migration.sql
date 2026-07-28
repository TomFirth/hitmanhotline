-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "agencyName" TEXT NOT NULL DEFAULT 'The Hotline',
    "balance" INTEGER NOT NULL DEFAULT 5000,
    "reputation" INTEGER NOT NULL DEFAULT 10,
    "lastActiveAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registrationNumber" TEXT NOT NULL DEFAULT 'HH-TEMP-000',
    "entityType" TEXT NOT NULL DEFAULT 'Sole Trader',
    "incorporationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registeredAddress" TEXT NOT NULL DEFAULT 'Sector 7G, Sub-Level 4',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("agencyName", "balance", "createdAt", "email", "id", "lastActiveAt", "password", "reputation", "updatedAt", "username") SELECT "agencyName", "balance", "createdAt", "email", "id", "lastActiveAt", "password", "reputation", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
