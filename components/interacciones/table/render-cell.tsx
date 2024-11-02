import React from "react";
import { InteractionsHistoryType } from "@/helpers/types";

interface Props {
  data: InteractionsHistoryType;
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
    case "userId":
      return (
        <div>
          <span>
            {
              //@ts-ignore
              data.user.name
            }
          </span>
        </div>
      );

    default:
      return cellValue || <span>N/A</span>;
  }
};
