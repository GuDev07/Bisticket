/*
  Warnings:

  - You are about to drop the column `resposta` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `respostaEm` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "resposta",
DROP COLUMN "respostaEm";
