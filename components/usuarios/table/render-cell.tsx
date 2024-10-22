import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { EyeIcon } from "@/components/icons/table/eye-icon";
import { ProveedorType } from "@/helpers/types";

interface Props {
  data: ProveedorType;
  columnKey: string;
}

export const RenderCell = ({ data, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = data[columnKey];

  switch (columnKey) {
    case "name":
      return (
        <div>
          <span>{data.name}</span>
        </div>
      );
    case "email":
      return (
        <div>
          <span>{data.email}</span>
        </div>
      );
    case "birthDay":
      return (
        <div>
          <span>{cellValue.toLocaleDateString()}</span>
        </div>
      );

    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "active"
              ? "success"
              : cellValue === "paused"
              ? "danger"
              : "warning"
          }
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4">
          <div>
            <Tooltip content="Detalles">
              <button disabled={true} onClick={() => console.log("Ver Usuario", data.id)}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Editar" color="secondary">
              <button onClick={() => console.log("Editar Usuario", data.id)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              content="Eliminar"
              color="danger"
              onClick={() => console.log("Eliminar proveedor", data.id)}
            >
              <button>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );

    default:
      return cellValue || <span>N/A</span>;
  }
};
