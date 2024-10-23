"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTrabajadores = async (
  name: string | null,
  location: string | null,
  category: string | null
) => {
  const or = [];
  if (location) or.push({ locationId: parseInt(location) });
  if (category)
    or.push({
      TrabajadorCategories: {
        some: {
          categoryId: parseInt(category),
        },
      },
    });
  if (name) or.push({ name: { contains: name, mode: "insensitive" } });

  try {
    const data = await prisma.trabajadores.findMany({
      //@ts-ignore
      where:
        or.length > 0
          ? {
              //@ts-ignore
              OR: or,
            }
          : {},
      include: {
        TrabajadorCategories: {
          include: {
            category: true,
          },
        },
        location: true,
      },
    });
    return { success: data };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { error: "Ocurrió un error" };
  }
};

export const disableUser = async (id: number, value: boolean) => {
  try {
    const data = await prisma.user.update({
      data: {
        disabled: value,
      },
      where: {
        id,
      },
    });
    return { success: data };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { error: "Ocurrio un error" };
  }
};

export const getLocations = async () => {
  try {
    const data = await prisma.locations.findMany();
    return { success: data };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { error: "Ocurrió un error" };
  }
};

export const getCategories = async () => {
  try {
    const data = await prisma.categories.findMany();
    return { success: data };
  } catch (error) {
    return { error: "Ocurrió un error" };
  }
};
