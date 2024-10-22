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
  dni?: string|null;
  birthDay?: Date | null;
  role?: string | null;
  area?: string | null;
  disabled?: boolean | null;
};

export type ProveedorType = {
  id: number;
  email: string;
  name: string;
  phone?: string | null;
  address?: string | null;
  price?: number | null;
  period?: string | null;
};
