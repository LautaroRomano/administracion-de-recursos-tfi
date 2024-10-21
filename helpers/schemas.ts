import { object, ref, string } from "yup";

export const LoginSchema = object().shape({
  email: string()
    .email("Este campo debe ser un correo electrónico válido")
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
});

export const UpdateUserSchema = object().shape({
  name: string().required("El nombre es obligatorio"),
  dni: string().required("El DNI es obligatorio"),
  address: string().required("La dirección es obligatoria"),
  email: string()
    .email("Este campo debe ser un correo electrónico válido")
    .required("El correo electrónico es obligatorio")
});
