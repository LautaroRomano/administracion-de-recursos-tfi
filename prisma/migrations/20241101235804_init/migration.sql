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

-- CreateTable
CREATE TABLE "Commissions" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "trabajadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Commissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InteractionsHistory" ADD CONSTRAINT "InteractionsHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commissions" ADD CONSTRAINT "Commissions_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
