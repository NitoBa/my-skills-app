/*
  Warnings:

  - Added the required column `watermelon_id` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_skills" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "watermelon_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "user_id" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "skills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_skills" ("createdAt", "id", "title", "type", "updatedAt", "user_id") SELECT "createdAt", "id", "title", "type", "updatedAt", "user_id" FROM "skills";
DROP TABLE "skills";
ALTER TABLE "new_skills" RENAME TO "skills";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
