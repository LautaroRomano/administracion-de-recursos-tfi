"use client";

import { loginUser } from "@/actions/register.action";
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initialValues: LoginFormType = {
    email: "",
    password: "",
  };

  useEffect(() => {
    const user = localStorage.getItem("userLogged");
    if (user) {
      const userJSON = JSON.parse(user);
      if (userJSON.id) router.replace("/");
    }
    return () => {};
  }, []);

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      setLoading(true);
      const user = await loginUser(values);
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
      <div className="text-center text-[25px] font-bold mb-6">
        Iniciar sesion
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="flex flex-col w-1/2 gap-4 mb-4">
              <Input
                variant="bordered"
                label="Correo electronico o DNI"
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
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant="flat"
              color="primary"
              isLoading={loading}
            >
              Ingresar
            </Button>
          </>
        )}
      </Formik>

      <div className="font-light text-slate-400 mt-4 text-sm">
        No tienes una cuenta?{" "}
        <Link href="/register" className="font-bold">
          Registrate aqui!
        </Link>
      </div>
    </>
  );
};
