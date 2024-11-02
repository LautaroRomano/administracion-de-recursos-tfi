import { Avatar, Card, CardBody } from "@nextui-org/react";
import React from "react";

const items = [
  {
    name: "Jose Perez",
    amount: "4500 ARS",
    date: "9/20/2021",
  },
  {
    name: "Jose Perez",
    amount: "4500 ARS",
    date: "9/20/2021",
  },
  {
    name: "Jose Perez",
    amount: "4500 ARS",
    date: "9/20/2021",
  },
  {
    name: "Jose Perez",
    amount: "4500 ARS",
    date: "9/20/2021",
  },
  {
    name: "Jose Perez",
    amount: "4500 ARS",
    date: "9/20/2021",
  },
];

export const CardTransactions = () => {
  return (
    <Card className=" bg-default-50 rounded-xl shadow-md px-3">
      <CardBody className="py-5 gap-4">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              Ultimas Transactions
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6 justify-center">
          {items.map((item) => (
            <div key={item.name} className="grid grid-cols-3 w-full">

              <span className="text-default-900  font-semibold">
                {item.name}
              </span>
              <div>
                <span className="text-success text-xs">{item.amount}</span>
              </div>
              <div>
                <span className="text-default-500 text-xs">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
