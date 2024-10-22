export const exportProveedoresToCSV = (data) => {
  const headers = [
    "ID",
    "Email",
    "Nombre",
    "Teléfono",
    "Dirección",
    "Precio",
    "Período",
    "Estado",
  ];

  const csvContent = [
    headers.join(","),
    ...data.map((proveedor) =>
      [
        proveedor.id,
        proveedor.email,
        proveedor.name,
        proveedor.phone ?? "", // Si el valor es null o undefined, lo dejamos como vacío
        proveedor.address ?? "",
        proveedor.price ?? "",
        proveedor.period ?? "",
        // proveedor.disabled ? "Inactivo" : "Activo", // Estado según el valor de `disabled`
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "proveedores.csv");

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
