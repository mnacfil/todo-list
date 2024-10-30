/*
  Warnings:

  - A unique constraint covering the columns `[taskId,authorId]` on the table `SubTask` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SubTask_taskId_authorId_key" ON "SubTask"("taskId", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_authorId_key" ON "Task"("authorId");
