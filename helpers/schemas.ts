import { number, object, ref, string } from "yup";

export const LoginSchema = object().shape({
  email: string()
    .required("El correo electrónico es obligatorio"),
  password: string().required("La contraseña es obligatoria"),
});

export const RegisterSchema = object().shape({
  name: string().required("El nombre es obligatorio"),
  dni: string().required("El DNI es obligatorio"),
  address: string().required("La dirección es obligatoria"),
  birthDay: string().required("La fecha de nacimiento es obligatoria"),
  email: string()
    .email("Este campo debe ser un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: string().required("La contraseña es obligatoria"),
  confirmPassword: string()
    .required("La confirmación de la contraseña es obligatoria")
    .oneOf([ref("password")], "Las contraseñas deben coincidir"),
  area: string().required("El area del usuario es obligatoria"),
});

export const UpdateUserSchema = object().shape({
  name: string().required("El nombre es obligatorio"),
  dni: string().required("El DNI es obligatorio"),
  address: string().required("La dirección es obligatoria"),
  email: string()
    .email("Este campo debe ser un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  role: string().required("El rol del usuario es obligatorio"),
  area: string().required("El area del usuario es obligatoria"),
});

export const createProveedorSchema = object().shape({
  email: string().email("Correo inválido").required("Correo requerido"),
  name: string().required("Nombre requerido"),
  phone: string().optional(),
  address: string().optional(),
  price: number().optional(),
  period: string().optional(),
});
