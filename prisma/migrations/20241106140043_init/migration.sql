-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "salary" TEXT;

-- CreateTable
CREATE TABLE "InteractionsHistory" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "oldValue" TEXT NOT NULL,
    "newValue" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "InteractionsHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InteractionsHistory" ADD CONSTRAINT "InteractionsHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
