"use client";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { TableWrapper } from "./table/table";
import { AddProveedor } from "./add-proveedor";
import { UserType } from "@/helpers/types";
import { toast } from "react-toastify";
import { exportProveedoresToCSV } from "./exportProveedoresToCSV";
import { TbFileExport } from "react-icons/tb";
import { disableUser, getUsers } from "@/actions/users.action";

const initDataState: UserType[] = [];

export const Trabajadores = () => {
  const [data, setData] = useState(initDataState);
  const [search, setSearch] = useState("");

  const getData = async (search: string | null) => {
    const res = await getUsers(search);
    if (res.error) {
      return toast.error(res.error);
    }
    if (Array.isArray(res.success)) setData(res.success);
  };

  const handleDisableUser = async (id: number, value: boolean) => {
    const res = await disableUser(id, value);
    if (res.error) {
      return toast.error(res.error);
    }
    toast.success("Usuario deshabilitado con exito!");
    getData(search.length > 0 ? search : null);
  };

  useEffect(() => {
    getData(null);
  }, []);

  useEffect(() => {
    getData(search.length > 0 ? search : null);
  }, [search]);

  const handleExportCSV = () => {
    if (data.length === 0) {
      return toast.warning("No hay datos para exportar");
    }
    exportProveedoresToCSV(data);
  };

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Listado de usuarios</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex w-96 items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Buscar usuario"
            onChange={({ target }) => setSearch(target.value)}
            value={search}
          />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <Button
            color="primary"
            startContent={<TbFileExport color="#fff" size={20} />}
            onPress={handleExportCSV}
          >
            Exportar como CSV
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper data={data} disableUser={handleDisableUser} />
      </div>
    </div>
  );
};
