"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getInteracciones = async (
  startDate: string | null,
  endDate: string | null
) => {
  try {
    const dateFilter = {};
    if (startDate && endDate) {
      //@ts-ignore
      dateFilter.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const data = await prisma.interactionsHistory.findMany({
      where: dateFilter,
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    return { success: data };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { error: "Ocurrió un error" };
  }
};
