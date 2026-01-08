-- CreateEnum
CREATE TYPE "OptionType" AS ENUM ('COLOR', 'FINISH', 'STONE', 'HEATER');

-- CreateEnum
CREATE TYPE "StoneType" AS ENUM ('NATURAL', 'ARTIFICIAL');

-- CreateEnum
CREATE TYPE "FinishType" AS ENUM ('POLISHED', 'BRUSHED');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "series" TEXT,
    "dimensions" TEXT,
    "specifications" JSONB,
    "basePrice" DECIMAL(65,30) NOT NULL,
    "woodType" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Heater" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "power" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "basePrice" DECIMAL(65,30) NOT NULL,
    "specifications" JSONB,
    "warranty" TEXT,
    "electricianRequired" BOOLEAN NOT NULL,
    "voltage" TEXT NOT NULL,
    "minStoneWeightKg" INTEGER NOT NULL,
    "safetyRequirements" TEXT,
    "features" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Heater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductHeater" (
    "productId" TEXT NOT NULL,
    "heaterId" TEXT NOT NULL,

    CONSTRAINT "ProductHeater_pkey" PRIMARY KEY ("productId","heaterId")
);

-- CreateTable
CREATE TABLE "ProductOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "optionType" "OptionType" NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "order" INTEGER,
    "productId" TEXT,
    "heaterId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductHeater" ADD CONSTRAINT "ProductHeater_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductHeater" ADD CONSTRAINT "ProductHeater_heaterId_fkey" FOREIGN KEY ("heaterId") REFERENCES "Heater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOption" ADD CONSTRAINT "ProductOption_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_heaterId_fkey" FOREIGN KEY ("heaterId") REFERENCES "Heater"("id") ON DELETE SET NULL ON UPDATE CASCADE;
