/*
  Warnings:

  - You are about to drop the column `name` on the `Wrestler` table. All the data in the column will be lost.
  - You are about to drop the column `unique` on the `Wrestler` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Wrestler.name_unique";

-- CreateTable
CREATE TABLE "WrestlerName" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "unique" BOOLEAN NOT NULL DEFAULT true,
    "wrestlerId" INTEGER NOT NULL,
    FOREIGN KEY ("wrestlerId") REFERENCES "Wrestler" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wrestler" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Wrestler" ("id", "createdAt", "updatedAt") SELECT "id", "createdAt", "updatedAt" FROM "Wrestler";
DROP TABLE "Wrestler";
ALTER TABLE "new_Wrestler" RENAME TO "Wrestler";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "WrestlerName.name_unique" ON "WrestlerName"("name");
