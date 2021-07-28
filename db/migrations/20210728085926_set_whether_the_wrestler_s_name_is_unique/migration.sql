-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wrestler" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "unique" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Wrestler" ("id", "createdAt", "updatedAt", "name") SELECT "id", "createdAt", "updatedAt", "name" FROM "Wrestler";
DROP TABLE "Wrestler";
ALTER TABLE "new_Wrestler" RENAME TO "Wrestler";
CREATE UNIQUE INDEX "Wrestler.name_unique" ON "Wrestler"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
