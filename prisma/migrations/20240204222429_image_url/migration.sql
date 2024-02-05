/*
  Warnings:

  - Added the required column `imageUrl` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "imageUrl" VARCHAR(200) NOT NULL;
