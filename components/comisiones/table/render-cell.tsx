import React from "react";
import { CommissionsType } from "@/helpers/types";

interface Props {
  data: CommissionsType;
  columnKey: string;
}

export const RenderCell = ({ data, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = data[columnKey];

  switch (columnKey) {
    case "createdAt":
      return (
        <div>
          <span>{data.createdAt.toLocaleString()}</span>
        </div>
      );
    case "trabajadorId":
      return (
        <div>
          <span>
            {
              //@ts-ignore
              data.trabajador.name
            }
          </span>
        </div>
      );

    default:
      return cellValue || <span>N/A</span>;
  }
};
