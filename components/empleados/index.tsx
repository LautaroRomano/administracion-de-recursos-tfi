"use client";
import { Button, Input, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { TableWrapper } from "./table/table";
import { TrabajadorType, UserType } from "@/helpers/types";
import { toast } from "react-toastify";
import { exportToCSV } from "./exportToCSV";
import { TbFileExport } from "react-icons/tb";
import {
  disableTrabajador,
  getCategories,
  getLocations,
  getTrabajadores,
} from "@/actions/trabajadores.action";
import ViewTrabajador from "./view-trabajador";
import { getUsers } from "@/actions/users.action";

const initDataState: UserType[] = [];

export const Empleados = () => {
  const [data, setData] = useState(initDataState);
  console.log("🚀 ~ Empleados ~ data:", data);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTrabajador, setSelectedTrabajador] =
    useState<TrabajadorType | null>(null);

  const [search, setSearch] = useState("");

  const getData = async (search: string | null) => {
    setLoading(true);
    const res = await getUsers(search);
    setLoading(false);
    if (res.error) {
      return toast.error(res.error);
    }
    if (Array.isArray(res.success))
      setData(res.success.filter((em) => em.role === "empleado"));
  };

  const handleDisableTrabajador = async (id: number, value: boolean) => {
    const res = await disableTrabajador(id, value);
    if (res.error) {
      return toast.error(res.error);
    }
    toast.success("Usuario deshabilitado con exito!");
    getData(search);
  };

  const getMoreData = async () => {
    const locations = await getLocations();
    const categories = await getCategories();
    //@ts-ignore
    setLocations(locations.success);
    //@ts-ignore
    setCategories(categories.success);
  };

  useEffect(() => {
    getData(null);
    getMoreData();
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

  const handleChangeCategory = (id: string) => {
    setSelectedCategory(id);
    getData(search);
  };

  const handleChangeLocation = (id: string) => {
    setSelectedLocation(id);
    getData(search);
  };

  const handleView = (data: TrabajadorType) => {
    setSelectedTrabajador(data);
  };

  const handleEdit = (data: TrabajadorType) => {
    setSelectedTrabajador(data);
  };

  const handleCloseView = () => {
    setSelectedTrabajador(null);
  };

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ViewTrabajador
        data={selectedTrabajador}
        handleCloseView={handleCloseView}
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

          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm h-10 px-2"
            onChange={({ target }) => handleChangeCategory(target.value)}
            value={selectedCategory}
          >
            <option value="">No seleccionado</option>
            {categories.map((cat) => (
              //@ts-ignore
              <option value={cat.id}>{cat.description}</option>
            ))}
          </select>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm h-10 px-2"
            onChange={({ target }) => handleChangeLocation(target.value)}
            value={selectedLocation}
          >
            <option value="">No seleccionado</option>
            {locations.map((lo) => (
              //@ts-ignore
              <option value={lo.id}>{lo.description}</option>
            ))}
          </select>
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
          disable={handleDisableTrabajador}
          handleView={handleView}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
};
