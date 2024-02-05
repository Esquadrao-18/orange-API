-- DropForeignKey
ALTER TABLE "ProjectTag" DROP CONSTRAINT "projectId_FK";

-- AddForeignKey
ALTER TABLE "ProjectTag" ADD CONSTRAINT "projectId_FK" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
