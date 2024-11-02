import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { EyeIcon } from "@/components/icons/table/eye-icon";
import { UserType } from "@/helpers/types";

interface Props {
  data: UserType;
  columnKey: string;
  disable: Function;
  handleView: Function;
  handleEdit: Function;
}

export const RenderCell = ({
  data,
  columnKey,
  disable,
  handleView,
  handleEdit,
}: Props) => {
  const userItem = localStorage.getItem("userLogged");
  const userLogged = userItem ? JSON.parse(userItem) : null;

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
    case "location":
      return (
        <div>
          <span>{cellValue.description}</span>
        </div>
      );
    case "TrabajadorCategories":
      return (
        <div>
          {cellValue.map(
            ({ category }: { category: { description: string } },i:number) => (
              <Chip size="sm" variant="flat" color={"default"} key={i}>
                <span className="capitalize text-xs">
                  {category.description}
                </span>
              </Chip>
            )
          )}
        </div>
      );

    case "disabled":
      return (
        <Chip size="sm" variant="flat" color={cellValue ? "danger" : "success"}>
          <span className="capitalize text-xs">{cellValue ? "SI" : "NO"}</span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4">
          <div>
            <Tooltip content="Detalles">
              <button
                onClick={() => {
                  handleView(data);
                }}
              >
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Editar" color="secondary">
              <button
                onClick={() => {
                  handleEdit(data);
                }}
              >
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              content={
                data.id === userLogged?.id
                  ? "No puedes borrarte a ti mismo"
                  : "Eliminar"
              }
              color="danger"
            >
              <button
                disabled={data.id === userLogged?.id}
                onClick={() => {
                  disable(data.id, !data.disabled);
                }}
              >
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
