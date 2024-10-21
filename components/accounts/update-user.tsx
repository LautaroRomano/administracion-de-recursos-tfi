import { updateUser } from "@/actions/register.action";
import { UpdateUserSchema } from "@/helpers/schemas";
import { RegisterFormType } from "@/helpers/types";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Formik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const UpdateUser = ({
  user,
  isOpen,
  onOpenChange,
}: {
  user: RegisterFormType;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const initialValues: RegisterFormType = { ...user };
  console.log("🚀 ~ initialValues:", initialValues)

  const handleRegister = async (values: RegisterFormType) => {
    setLoading(true);
    const user = await updateUser(values);
    if (user.error) {
      setLoading(false);
      return toast(user.error, {
        theme: "dark",
      });
    } else {
      toast("Actualizado con exito!", {
        theme: "dark",
      });
      localStorage.setItem("userLogged", JSON.stringify(user.success));
      onOpenChange(isOpen);
    }
  };

  return (
    <div>
      <>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Actualizar perfil
                </ModalHeader>
                <ModalBody>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={UpdateUserSchema}
                    onSubmit={handleRegister}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit,
                    }) => (
                      <>
                        <div className="flex flex-col  gap-4 mb-4">
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
                            onChange={handleChange("password")}
                          />
                          <Input
                            variant="bordered"
                            label="Confirmar contraseña"
                            type="password"
                            value={values.confirmPassword}
                            onChange={handleChange("confirmPassword")}
                          />
                          <Input
                            isDisabled
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
                        </div>

                        <Button
                          onPress={() => handleSubmit()}
                          variant="flat"
                          color="primary"
                          isLoading={loading}
                        >
                          Actualizar Perfil
                        </Button>
                      </>
                    )}
                  </Formik>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
