"use client";
import { Button, DateRangePicker, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { TableWrapper } from "./table/table";
import { CommissionsType } from "@/helpers/types";
import { toast } from "react-toastify";
import { exportToCSV } from "./exportToCSV";
import { TbFileExport } from "react-icons/tb";
import { getCommissions } from "@/actions/comisiones.action";

const initDataState: CommissionsType[] = [];

export const Comisiones = () => {
  const [data, setData] = useState(initDataState);
  const [dateRange, setDateRange] = useState<{
    startDate: string | null;
    endDate: string | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const getData = async () => {
    const { startDate, endDate } = dateRange;
    const res = await getCommissions(startDate, endDate);
    if (res.error) {
      return toast.error(res.error);
    }
    if (Array.isArray(res.success)) setData(res.success);
  };

  useEffect(() => {
    getData();
  }, [dateRange]);

  const handleExportCSV = () => {
    if (data.length === 0) {
      return toast.warning("No hay datos para exportar");
    }
    exportToCSV(data);
  };

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Historial de interacciones</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex w-96 items-center gap-3 flex-wrap md:flex-nowrap">
          <DateRangePicker
            label="Buscar en fechas"
            className="max-w-xs"
            onChange={(range) => {
              setDateRange({
                startDate: range.start.toString(),
                endDate: range.end.toString(),
              });
            }}
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
        <TableWrapper data={data} />
      </div>
    </div>
  );
};
