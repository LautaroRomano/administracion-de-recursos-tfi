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
  user: RegisterFormType & { id: number };
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const initialValues: RegisterFormType & { id: number } = { ...user };

  const handleRegister = async (values: RegisterFormType & { id: number }) => {
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

                          {/* Select para el rol */}
                          <div>
                            <label className="block text-sm font-medium text-gray-300">
                              Rol
                            </label>
                            <select
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm h-10 px-2"
                              value={values.role || ""}
                              onChange={handleChange("role")}
                            >
                              <option value="" label="Seleccione un rol" />
                              <option
                                value="administrador"
                                label="Administrador"
                              />
                              <option value="empleado" label="Empleado" />
                            </select>
                            {errors.role && touched.role && (
                              <div className="text-red-500 text-xs mt-1">
                                {errors.role}
                              </div>
                            )}
                          </div>

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
                              <option value="General" label="General" />
                            </select>
                            {errors.area && touched.area && (
                              <div className="text-red-500 text-xs mt-1">
                                {errors.area}
                              </div>
                            )}
                          </div>
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
