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
        toast("Ingresaste con exito!", {
          theme: "dark",
        });
        localStorage.setItem("userLogged", JSON.stringify(user.success));
        router.replace("/");
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
                label="Correo electronico"
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
                label="Direccion"
                type="text"
                value={values.address || ""}
                isInvalid={!!errors.address && !!touched.address}
                errorMessage={errors.address}
                onChange={handleChange("address")}
              />
              <Input
              isDisabled
                variant="bordered"
                label="Fecha de nacimiento"
                type="date"
                value={values.birthDay || ""}
                isInvalid={!!errors.birthDay && !!touched.birthDay}
                errorMessage={errors.birthDay}
                onChange={handleChange("birthDay")}
              />
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
        Ya tienes una cuenta?{" "}
        <Link href="/login" className="font-bold">
          Inicia sesion aqui!
        </Link>
      </div>
    </>
  );
};
