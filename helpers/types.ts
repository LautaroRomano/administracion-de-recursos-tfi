// FORMS

export type LoginFormType = {
  email: string;
  password: string;
};

export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dni: string;
  address?: string | null;
  birthDay?: string | null;
  role?: string | null;
  area?: string | null;
};

export type UserType = {
  id: number;
  email: string;
  name: string;
  address?: string | null;
  password?: string | null;
  dni: string;
  birthDay?: Date | null;
  role?: string | null;
  area?: string | null;
};
