"use server";
import { UserType } from "@/helpers/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (search: string | null) => {
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
        profilePicture: true,
        salary: true,
      },
    });
    return { success: data };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { error: "Ocurrio un error" };
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

export const updateUser = async ({
  id,
  name,
  address,
  area,
  role,
  salary,
}: UserType) => {
  try {
    if (!name || name.length === 0) return { error: "Debe ingresar un nombre" };
    if (!address || address.length === 0)
      return { error: "Debe ingresar una direccion" };
    if (!area || area.length === 0) return { error: "Debe ingresar un area" };
    if (!role || role.length === 0) return { error: "Debe ingresar un rol" };
    if (!salary || salary.length === 0)
      return { error: "Debe ingresar un salario" };

    const data = await prisma.user.update({
      data: {
        name,
        address,
        role,
        area,
        salary,
      },
      where: { id },
    });
    return { success: data };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { error: "Ocurrio un error" };
  }
};
