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

const initDataState: UserType[] = [];

export const Trabajadores = () => {
  const [data, setData] = useState(initDataState);
  console.log("🚀 ~ Trabajadores ~ data:", data)
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTrabajador, setSelectedTrabajador] =
    useState<TrabajadorType | null>(null);

  const [search, setSearch] = useState({
    name: "",
    location: "",
    category: "",
  });

  const getData = async (
    name: string | null,
    location: string | null,
    category: string | null
  ) => {
    setLoading(true);
    const res = await getTrabajadores(name, location, category);
    setLoading(false);
    if (res.error) {
      return toast.error(res.error);
    }
    if (Array.isArray(res.success)) setData(res.success);
  };

  const handleDisableTrabajador = async (id: number, value: boolean) => {
    const res = await disableTrabajador(id, value);
    if (res.error) {
      return toast.error(res.error);
    }
    toast.success("Usuario deshabilitado con exito!");
    getData(
      search.name.length > 0 ? search.name : null,
      search.location.length > 0 ? search.location : null,
      search.category.length > 0 ? search.category : null
    );
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
    getData(null, null, null);
    getMoreData();
  }, []);

  const handleExportCSV = () => {
    if (data.length === 0) {
      return toast.warning("No hay datos para exportar");
    }
    exportToCSV(data);
  };

  const handleSearch = () => {
    getData(
      search.name.length > 0 ? search.name : null,
      search.location.length > 0 ? search.location : null,
      search.category.length > 0 ? search.category : null
    );
  };

  const handleChangeCategory = (id: string) => {
    setSelectedCategory(id);
    getData(
      search.name.length > 0 ? search.name : null,
      search.location.length > 0 ? search.location : null,
      id
    );
  };

  const handleChangeLocation = (id: string) => {
    setSelectedLocation(id);
    getData(
      search.name.length > 0 ? search.name : null,
      id,
      search.category.length > 0 ? search.category : null
    );
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
      <h3 className="text-xl font-semibold">Listado de trabajadores</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex w-auto items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            className="min-w-72"
            placeholder="Buscar trabajador por nombre"
            onChange={({ target }) =>
              setSearch({
                name: target.value,
                location: selectedLocation,
                category: selectedCategory,
              })
            }
            value={search.name}
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
              <option value={cat.id} key={cat.id}>{cat.description}</option>
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
              <option value={lo.id} key={lo.id}>{lo.description}</option>
            ))}
          </select>
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
