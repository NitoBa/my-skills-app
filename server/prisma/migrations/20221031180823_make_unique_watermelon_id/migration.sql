/*
  Warnings:

  - A unique constraint covering the columns `[watermelon_id]` on the table `skills` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "skills_watermelon_id_key" ON "skills"("watermelon_id");
