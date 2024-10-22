"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (search: string | null) => {
  console.log("🚀 ~ getUsers ~ search:", search)
  try {
    const data = await prisma.user.findMany({
      where: search
        ? {
            OR: [
              { id: isNaN(parseInt(search)) ? undefined : parseInt(search) },
              { dni: { contains: search, mode: "insensitive" } },
              { name: { contains: search, mode: "insensitive" } },
            ],
          }
        : {},
      select: {
        id: true,
        name: true,
        email: true,
        dni: true,
        address: true,
        role: true,
        area: true,
        birthDay: true,
        disabled: true,
      },
    });
    return { success: data };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { error: "Ocurrio un error" };
  }
};