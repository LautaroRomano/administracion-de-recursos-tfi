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
};

export type UserType = {
  id: number;
  email: String;
  name: String;
  address?: String | null;
  password?: String | null;
  dni?: String | null;
  birthDay?: Date | null;
};
