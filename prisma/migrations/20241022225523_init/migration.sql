/*
  Warnings:

  - You are about to drop the column `location` on the `Trabajadores` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Trabajadores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trabajadores" DROP COLUMN "location",
DROP COLUMN "skills",
ADD COLUMN     "locationId" INTEGER;

-- CreateTable
CREATE TABLE "Locations" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrabajadorCategories" (
    "trabajadorId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "TrabajadorCategories_pkey" PRIMARY KEY ("trabajadorId","categoryId")
);

-- AddForeignKey
ALTER TABLE "Trabajadores" ADD CONSTRAINT "Trabajadores_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrabajadorCategories" ADD CONSTRAINT "TrabajadorCategories_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajadores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrabajadorCategories" ADD CONSTRAINT "TrabajadorCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
