export { Producto };
Producto = {
  productId: "12345",
  productName: "Ejemplo de producto",
  productDescription: "Descripción del producto",
  manufacturer: "Nombre del fabricante",
  manufacturingDate: "2023-07-15",
  batchNumber: "BATCH-001",
  productionLocation: "Ubicación de producción",
  metadataProducto: "https://url-de-la-metadata",
  traceabilityInfo: [
    {
      action: "Manufacturado",
      timestamp: "2023-07-15T10:00:00Z",
      actor: "Nombre del actor",
      actorId: "abc123",
      metadataAction: "https://url-de-la-metadata",
    },
    {
      action: "Almacenado",
      timestamp: "2023-07-16T09:30:00Z",
      actor: "Nombre del actor",
      actorId: "def456",
      metadataAction: "https://url-de-la-metadata",
    },
    {
      action: "Enviado a distribuidor",
      timestamp: "2023-07-17T14:45:00Z",
      actor: "Nombre del actor",
      actorId: "ghi789",
      metadataAction: "https://url-de-la-metadata",
    },
  ],
};
