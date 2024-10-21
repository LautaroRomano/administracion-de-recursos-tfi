"use server";
import { LoginFormType, RegisterFormType } from "@/helpers/types";
import { PrismaClient } from "@prisma/client";
import { createAuthCookie } from "./auth.action";
import { hash, compare } from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async ({
  name,
  email,
  password,
  confirmPassword,
  dni,
  address,
  birthDay,
}: RegisterFormType) => {
  try {
    if (password !== confirmPassword)
      return { error: "Las contraseñas no coinciden" };
    const hashedPassword = await hash(password, 10);

    const userCreated = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        dni,
        address,
        birthDay: new Date(birthDay || ""),
      },
    });
    return { success: userCreated };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { error: "Ocurrio un error" };
  }
};

export const loginUser = async ({ email, password }: LoginFormType) => {
  try {
    const myUser = await prisma.user.findFirst({ where: { email } });
    if (!myUser?.id) return { error: "Usuario no encontrado" };

    const isPassword = await compare(password, myUser.password);
    if (!isPassword) return { error: "Contraseña incorrecta" };
    return { success: myUser };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return { error: "Ocurrio un error" };
  }
};
