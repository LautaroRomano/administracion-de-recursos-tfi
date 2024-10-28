"use client";
import { Button, Input, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { TableWrapper } from "./table/table";
import { TrabajadorType, UserType } from "@/helpers/types";
import { toast } from "react-toastify";
import { exportToCSV } from "./exportToCSV";
import { TbFileExport } from "react-icons/tb";
import { disableUser } from "@/actions/users.action";
import ViewTrabajador from "./view-empleado";
import { getUsers } from "@/actions/users.action";

const initDataState: UserType[] = [];

export const Empleados = () => {
  const [data, setData] = useState(initDataState);
  const [loading, setLoading] = useState(false);
  const [editEmpleado, setEditEmpleado] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState<UserType | null>(
    null
  );

  const [search, setSearch] = useState("");

  const getData = async (search: string | null) => {
    setLoading(true);
    const res = await getUsers(search);
    setLoading(false);
    if (res.error) {
      return toast.error(res.error);
    }
    if (Array.isArray(res.success))
      setData(res.success);
  };

  const handleDisableEmpleado = async (id: number, value: boolean) => {
    const res = await disableUser(id, value);
    if (res.error) {
      return toast.error(res.error);
    }
    toast.success("Usuario deshabilitado con exito!");
    getData(search);
  };

  useEffect(() => {
    getData(null);
  }, []);

  const handleExportCSV = () => {
    if (data.length === 0) {
      return toast.warning("No hay datos para exportar");
    }
    exportToCSV(data);
  };

  const handleSearch = () => {
    getData(search);
  };

  const handleView = (data: TrabajadorType) => {
    setSelectedEmpleado(data);
    setEditEmpleado(false);
  };

  const handleEdit = (data: TrabajadorType) => {
    setSelectedEmpleado(data);
    setEditEmpleado(true);
  };

  const handleCloseView = () => {
    setSelectedEmpleado(null);
    getData(search);
  };

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ViewTrabajador
        data={selectedEmpleado}
        handleCloseView={handleCloseView}
        editEmpleado={editEmpleado}
      />
      <h3 className="text-xl font-semibold">Listado de empleados</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex w-auto items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            className="min-w-72"
            placeholder="Buscar trabajador por nombre"
            onChange={({ target }) => setSearch(target.value)}
            value={search}
            endContent={
              <Button
                color="primary"
                onPress={handleSearch}
                size="sm"
                isLoading={loading}
              >
                Buscar
              </Button>
            }
          />
        </div>
        {/* <div className="flex flex-row gap-3.5 flex-wrap">
          <Button
            color="primary"
            startContent={<TbFileExport color="#fff" size={20} />}
            onPress={handleExportCSV}
          >
            Exportar como CSV
          </Button>
        </div> */}
      </div>
      {loading && (
        <div className="flex items-center justify-center h-full w-full">
          <Spinner />
        </div>
      )}
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper
          data={data}
          disable={handleDisableEmpleado}
          handleView={handleView}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
};
