import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { columns } from "./data"; // Aquí defines las 6 columnas, incluida "actions"
import { RenderCell } from "./render-cell";
import { ProveedorType } from "@/helpers/types";

export const TableWrapper = ({
  data,
  disableUser,
}: {
  data: ProveedorType[];
  disableUser: Function;
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={column.uid}>
                  {RenderCell({
                    data: item,
                    columnKey: column.uid,
                    disableUser,
                  })}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
