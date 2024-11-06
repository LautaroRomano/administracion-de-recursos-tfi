"use client";

import { createUser } from "@/actions/register.action";
import { RegisterSchema } from "@/helpers/schemas";
import { RegisterFormType } from "@/helpers/types";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("userLogged");
    if (user) {
      const userJSON = JSON.parse(user);
      if (userJSON.id) router.replace("/");
    }
    return () => {};
  }, []);

  const initialValues: RegisterFormType = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dni: "",
    address: "",
    birthDay: "",
    role: "", // Nuevo campo para el rol
    area: "", // Nuevo campo para el área
  };

  const handleRegister = useCallback(
    async (values: RegisterFormType) => {
      setLoading(true);
      const user = await createUser(values);
      if (user.error) {
        setLoading(false);
        return toast(user.error, {
          theme: "dark",
        });
      } else {
        toast("Registrado con éxito!", {
          theme: "dark",
        });
        // localStorage.setItem("userLogged", JSON.stringify(user.success));
        router.replace("/login");
      }
    },
    [router]
  );

  return (
    <>
      <div className="text-center text-[25px] font-bold mb-6">Registro</div>

      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="flex flex-col w-1/2 gap-4 mb-4">
              <Input
                variant="bordered"
                label="Nombre"
                value={values.name}
                isInvalid={!!errors.name && !!touched.name}
                errorMessage={errors.name}
                onChange={handleChange("name")}
              />
              <Input
                variant="bordered"
                label="Correo electrónico"
                type="email"
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
              />
              <Input
                variant="bordered"
                label="Contraseña"
                type="password"
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
              <Input
                variant="bordered"
                label="Confirmar contraseña"
                type="password"
                value={values.confirmPassword}
                isInvalid={
                  !!errors.confirmPassword && !!touched.confirmPassword
                }
                errorMessage={errors.confirmPassword}
                onChange={handleChange("confirmPassword")}
              />
              <Input
                variant="bordered"
                label="DNI"
                type="text"
                value={values.dni}
                isInvalid={!!errors.dni && !!touched.dni}
                errorMessage={errors.dni}
                onChange={handleChange("dni")}
              />
              <Input
                variant="bordered"
                label="Dirección"
                type="text"
                value={values.address || ""}
                isInvalid={!!errors.address && !!touched.address}
                errorMessage={errors.address}
                onChange={handleChange("address")}
              />
              <Input
                variant="bordered"
                label="Fecha de nacimiento"
                type="date"
                value={values.birthDay || ""}
                isInvalid={!!errors.birthDay && !!touched.birthDay}
                errorMessage={errors.birthDay}
                onChange={handleChange("birthDay")}
              />


              {/* Select para el área */}
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Área
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm h-10 px-2"
                  value={values.area || ""}
                  onChange={handleChange("area")}
                >
                  <option value="" label="Seleccione un área" />
                  <option value="RRHH" label="RRHH" />
                  <option value="Finanzas" label="Finanzas" />
                </select>
                {errors.area && touched.area && (
                  <div className="text-red-500 text-xs mt-1">{errors.area}</div>
                )}
              </div>
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant="flat"
              color="primary"
              isLoading={loading}
            >
              Registrarse
            </Button>
          </>
        )}
      </Formik>

      <div className="font-light text-slate-400 mt-4 text-sm">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="font-bold">
          Inicia sesión aquí!
        </Link>
      </div>
    </>
  );
};
