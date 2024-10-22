-- CreateTable
CREATE TABLE "Proveedores" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "price" DOUBLE PRECISION,
    "period" TEXT,

    CONSTRAINT "Proveedores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Proveedores_email_key" ON "Proveedores"("email");
