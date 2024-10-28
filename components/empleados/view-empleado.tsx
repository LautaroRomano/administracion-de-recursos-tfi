import { TrabajadorType, UserType } from "@/helpers/types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Chip,
  Spacer,
  Divider,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";

export default function ViewTrabajador({
  data,
  handleCloseView,
  editEmpleado,
}: {
  data: UserType | null;
  handleCloseView: Function;
  editEmpleado: boolean;
}) {
  const [empleadoData, setEmpleadoData] = useState<null | UserType>(null);

  useEffect(() => {
    if (data && data.id) setEmpleadoData(data);
  }, [data]);

  //@ts-ignore
  const handleChangeEmpleadoData = ({ target }) => {
    const { name, value } = target;
    //@ts-ignore
    setEmpleadoData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={!!data}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#ced7f3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {data?.name || "Trabajador"}
              </ModalHeader>
              <ModalBody>
                {data && !editEmpleado ? (
                  <div className="flex flex-col items-center space-y-4">
                    {/* Imagen de perfil */}
                    <Image
                      src={data.profilePicture || ""}
                      alt={data.name}
                      width={120}
                      height={120}
                      className="rounded-full"
                    />
                    {/* Información básica */}
                    <div className="text-center">
                      <h2 className="text-xl font-semibold">{data.name}</h2>
                      <p className="text-sm text-gray-400">{data.email}</p>
                      <p className="text-sm text-gray-400">DNI: {data.dni}</p>
                    </div>

                    {/* Bio */}
                    <div className="w-full text-left">
                      <h3 className="text-md font-semibold">Sueldo</h3>
                      <p className="text-sm">{data.salary || "$0"}</p>
                    </div>

                    {/* Rol */}
                    <div className="w-full text-left">
                      <h3 className="text-md font-semibold">Rol</h3>
                      <p className="text-sm">{data.role}</p>
                    </div>
                    {/* Area */}
                    <div className="w-full text-left">
                      <h3 className="text-md font-semibold">Area</h3>
                      <p className="text-sm">{data.area}</p>
                    </div>

                    {/* Fecha de nacimiento */}
                    <div className="w-full text-left">
                      <h3 className="text-md font-semibold">
                        Fecha de nacimiento
                      </h3>
                      <p className="text-sm">
                        {data?.birthDay?.toLocaleDateString() || "Sin fecha"}
                      </p>
                    </div>
                    {/* Dirección */}
                    <div className="w-full text-left">
                      <h3 className="text-md font-semibold">Dirección</h3>
                      <p className="text-sm">
                        {data.address || "Dirección no disponible"}
                      </p>
                    </div>

                    {/* Habilitado */}
                    <div className="w-full text-left">
                      <h3 className="text-md font-semibold">Estado</h3>
                      <p className="text-sm">
                        {data.disabled ? "No habilitado" : "Habilitado"}
                      </p>
                    </div>
                  </div>
                ) : (
                  empleadoData && (
                    <div className="flex flex-col items-center space-y-4">
                      {/* Imagen de perfil */}
                      <Image
                        src={empleadoData.profilePicture || ""}
                        alt={empleadoData.name}
                        width={120}
                        height={120}
                        className="rounded-full"
                      />
                      {/* Información básica */}
                      <div className="text-center">
                        <Input
                          className="text-xl font-semibold"
                          placeholder="Nombre"
                          value={empleadoData.name}
                          onChange={handleChangeEmpleadoData}
                          name="name"
                        />
                        <p className="text-sm text-gray-400">
                          {empleadoData.email}
                        </p>
                        <p className="text-sm text-gray-400">
                          DNI: {empleadoData.dni}
                        </p>
                      </div>

                      {/* Bio */}
                      <div className="w-full text-left">
                        <h3 className="text-md font-semibold">Sueldo</h3>
                        <Input
                          className="text-xl font-semibold"
                          placeholder="Sueldo"
                          value={empleadoData.salary || ""}
                          onChange={handleChangeEmpleadoData}
                          name="salary"
                        />
                      </div>

                      {/* Rol */}
                      <div className="w-full text-left">
                        <h3 className="text-md font-semibold">Rol</h3>
                        <Input
                          className="text-xl font-semibold"
                          placeholder="Rol"
                          value={empleadoData.role || ""}
                          onChange={handleChangeEmpleadoData}
                          name="role"
                        />
                      </div>
                      {/* Area */}
                      <div className="w-full text-left">
                        <h3 className="text-md font-semibold">Area</h3>
                        <Input
                          className="text-xl font-semibold"
                          placeholder="Area"
                          value={empleadoData.area || ""}
                          onChange={handleChangeEmpleadoData}
                          name="area"
                        />
                      </div>

                      {/* Fecha de nacimiento */}
                      <div className="w-full text-left">
                        <h3 className="text-md font-semibold">
                          Fecha de nacimiento
                        </h3>
                        <Input
                          type="date"
                          className="text-xl font-semibold"
                          placeholder="Fecha de nacimiento"
                          value={empleadoData?.birthDay?.toDateString() || ""}
                          onChange={handleChangeEmpleadoData}
                          name="birthDay"
                        />
                      </div>
                      {/* Dirección */}
                      <div className="w-full text-left">
                        <h3 className="text-md font-semibold">Dirección</h3>
                        <Input
                          className="text-xl font-semibold"
                          placeholder="Dirección"
                          value={empleadoData?.address || ""}
                          onChange={handleChangeEmpleadoData}
                          name="address"
                        />
                      </div>

                      {/* Habilitado */}
                      <div className="w-full text-left">
                        <h3 className="text-md font-semibold">Estado</h3>
                        <Input
                          className="text-xl font-semibold"
                          placeholder="Estado"
                          readOnly
                          value={
                            empleadoData.disabled
                              ? "Habilitado"
                              : "Deshabilitado"
                          }
                        />
                      </div>
                    </div>
                  )
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  variant="light"
                  onPress={() => {
                    onClose();
                    handleCloseView();
                  }}
                >
                  Cerrar
                </Button>
                {editEmpleado && (
                  <Button
                    color="primary"
                    onPress={() => {
                      onClose();
                      handleCloseView();
                    }}
                  >
                    Guardar
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}