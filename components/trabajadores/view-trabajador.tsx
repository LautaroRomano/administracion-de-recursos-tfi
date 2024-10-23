import { TrabajadorType } from "@/helpers/types";
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
} from "@nextui-org/react";
import { IoMdDownload } from "react-icons/io";

export default function ViewTrabajador({
  data,
  handleCloseView,
}: {
  data: TrabajadorType | null;
  handleCloseView: Function;
}) {
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
                {data && (
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
                      <p className="text-sm text-gray-400">{data.phone}</p>
                    </div>

                    {/* Bio */}
                    <div className="w-full text-left">
                      <h3 className="text-md font-semibold">Biografía</h3>
                      <p className="text-sm">{data.bio || "Sin biografía"}</p>
                    </div>

                    {/* Ubicación */}
                    <div className="w-full text-left">
                      <h3 className="text-md font-semibold">Ubicación</h3>
                      <p className="text-sm">
                        {
                          //@ts-ignore
                          data.location?.description ||
                            "Ubicación no disponible"
                        }
                      </p>
                    </div>

                    {/* Dirección */}
                    <div className="w-full text-left">
                      <h3 className="text-md font-semibold">Dirección</h3>
                      <p className="text-sm">
                        {data.address || "Dirección no disponible"}
                      </p>
                    </div>

                    {/* Rating y Total de Opiniones */}
                    <div className="w-full text-left">
                      <h3 className="text-md font-semibold">Calificación</h3>
                      <p className="text-sm">
                        {data.rating?.toFixed(1)} / 5 de {data.totalReviews}{" "}
                        opiniones
                      </p>
                    </div>

                    {/* Disponibilidad */}
                    <div className="w-full text-left">
                      <h3 className="text-md font-semibold">Disponibilidad</h3>
                      <p className="text-sm">
                        {data.availability
                          ? "Disponible para trabajar"
                          : "No disponible en este momento"}
                      </p>
                    </div>

                    {/* Categorías */}
                    <div className="w-full text-left">
                      <h3 className="text-md font-semibold">Categorías</h3>
                      <div className="flex w-full gap-2 flex-wrap">
                        {data.TrabajadorCategories.length > 0 ? (
                          data.TrabajadorCategories.map((category, index) => (
                            <Chip>
                              {
                                //@ts-ignore
                                category.category.description
                              }
                            </Chip>
                          ))
                        ) : (
                          <p>No tiene categorías asignadas</p>
                        )}
                      </div>
                    </div>

                    {/* Habilitado */}
                    <div className="w-full text-left">
                      <h3 className="text-md font-semibold">Estado</h3>
                      <p className="text-sm">
                        {data.disabled
                          ? "No habilitado"
                          : "Habilitado"}
                      </p>
                    </div>

                    <Divider />

                    <div className="flex w-full justify-evenly gap-4">
                      <Button as={'a'} target="_blank" href="/dni.jfif" startContent={<IoMdDownload />} color="primary" className="w-full">
                        Descargar DNI
                      </Button>
                      <Button as={'a'} target="_blank" href="/constancia.pdf"  startContent={<IoMdDownload />} color="primary" className="w-full">
                        Constancias
                      </Button>
                    </div>
                  </div>
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
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
