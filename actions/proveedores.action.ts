"use server";
import { ProveedorType, RegisterFormType } from "@/helpers/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProveedores = async () => {
  try {
    const data = await prisma.proveedores.findMany();
    return { success: data };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { error: "Ocurrio un error" };
  }
};

export const createProveedor = async ({
  name,
  email,
  address,
  period,
  phone,
  price,
}: ProveedorType) => {
  try {
    const created = await prisma.proveedores.create({
      data: {
        name,
        email,
        address,
        period,
        phone,
        price,
      },
    });
    return { success: created };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { error: "Ocurrio un error" };
  }
};

export const updateProveedor = async ({
  id,
  name,
  email,
  password,
  confirmPassword,
  dni,
  address,
  role,
  area,
}: RegisterFormType & { id: number }) => {
  try {
    let updatePass = {};
    if (password.length > 0) {
      if (password !== confirmPassword)
        return { error: "Las contraseñas no coinciden" };
      const hashedPassword = "";
      updatePass = { password: hashedPassword };
    }

    const userCreated = await prisma.user.update({
      data: {
        ...updatePass,
        name,
        email,
        dni,
        address,
        role,
        area,
      },
      where: {
        id,
      },
    });
    return { success: userCreated };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { error: "Ocurrio un error" };
  }
};
