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
  dni?: string | null;
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

// Tipo para la tabla Trabajadores
export type TrabajadorType = {
  id: number;
  email: string;
  name: string;
  phone?: string | null;
  bio?: string | null;
  locationId?: number | null;
  location?: Location | null;
  rating?: number | null;
  totalReviews: number;
  address?: string | null;
  availability: boolean;
  createdAt: Date;
  updateAt: Date;
  disabled: boolean;
  profilePicture?: string | null;
  TrabajadorCategories: TrabajadorCategory[];
};

export type LocationType = {
  id: number;
  description: string;
};

export type CategoryType = {
  id: number;
  description: string;
  TrabajadorCategories: TrabajadorCategory[];
};

export type TrabajadorCategory = {
  trabajadorId: number;
  categoryId: number;
};
