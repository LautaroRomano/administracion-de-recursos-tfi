export const exportToCSV = (data) => {
  const headers = [
    "ID",
    "Email",
    "Nombre",
    "Teléfono",
    "Localizacion",
    "Dirección",
    "Disponibilidad",
    "Categorias",
    "Estado",
  ];

  const csvContent = [
    headers.join(","),
    ...data.map((dat) =>
      [
        dat.id,
        dat.email,
        dat.name,
        dat.phone ?? "", // Si el valor es null o undefined, lo dejamos como vacío
        dat.location.description ?? "",
        dat.address ?? "",
        dat.availability? 'Habilitado':"No habilitado",
        dat.TrabajadorCategories.map(tc=>tc.category.description).join('-'),
        dat.disabled ? "Inactivo" : "Activo", // Estado según el valor de `disabled`
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "trabajadores.csv");

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
