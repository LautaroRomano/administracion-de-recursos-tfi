import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState, useCallback } from "react";
import { createProveedor } from "@/actions/proveedores.action";
import { Formik } from "formik";
import { createProveedorSchema } from "@/helpers/schemas";
import { toast } from "react-toastify";
import { ProveedorType } from "@/helpers/types";

const initialValues: ProveedorType = {
  id: 0,
  email: "",
  name: "",
  phone: "",
  address: "",
  price: 0,
  period: "",
};

export const AddProveedor = ({ refresh }: { refresh: Function }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (values: ProveedorType) => {
      setLoading(true);
      const response = await createProveedor(values); // Llamada a la función para crear el proveedor
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Proveedor creado exitosamente!");
      }
      setLoading(false);
      refresh();
      onOpenChange();
    },
    [onOpenChange]
  );

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          Nuevo proveedor
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Crear proveedor
                </ModalHeader>
                <Formik
                  initialValues={initialValues}
                  validationSchema={createProveedorSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <>
                      <ModalBody>
                        <Input
                          label="Correo electrónico"
                          variant="bordered"
                          value={values.email}
                          isInvalid={!!errors.email && touched.email}
                          errorMessage={errors.email}
                          onChange={handleChange("email")}
                        />
                        <Input
                          label="Nombre"
                          variant="bordered"
                          value={values.name}
                          isInvalid={!!errors.name && touched.name}
                          errorMessage={errors.name}
                          onChange={handleChange("name")}
                        />
                        <Input
                          label="Teléfono"
                          variant="bordered"
                          value={values.phone + ""}
                          onChange={handleChange("phone")}
                        />
                        <Input
                          label="Dirección"
                          variant="bordered"
                          value={values.address + ""}
                          onChange={handleChange("address")}
                        />
                        <Input
                          label="Precio"
                          variant="bordered"
                          type="number"
                          value={values.price + ""}
                          onChange={handleChange("price")}
                        />
                        <Input
                          label="Periodo"
                          variant="bordered"
                          value={values.period + ""}
                          onChange={handleChange("period")}
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="flat" onClick={onClose}>
                          Cancelar
                        </Button>
                        <Button
                          color="primary"
                          onPress={() => handleSubmit()}
                          isLoading={loading}
                        >
                          Crear
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </Formik>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
