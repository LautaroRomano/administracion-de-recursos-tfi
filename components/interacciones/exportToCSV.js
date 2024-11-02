export const exportToCSV = (data) => {
  const headers = [
    "Responsable",
    "Descripcion",
    "Estado anterior",
    "Estado nuevo",
    "Fecha y hora"
  ];

  const csvContent = [
    headers.join(","),
    ...data.map((item) =>
      [
        item.user.name,
        item.description,
        item.oldValue,
        item.newValue ?? "", // Si el valor es null o undefined, lo dejamos como vacío
        item.createdAt.toLocaleString() ?? "",
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "interacciones.csv");

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
