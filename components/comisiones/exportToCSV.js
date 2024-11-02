export const exportToCSV = (data) => {
  const headers = [
    "Monto",
    "Trabajador",
    "Fecha y hora"
  ];

  const csvContent = [
    headers.join(","),
    ...data.map((item) =>
      [
        item.amount,
        item.trabajador.name,
        item.createdAt.toLocaleString() ?? "",
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "comisiones.csv");

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
