/*--Ui Info Components--*/
const ACTOR = 0x0281be870046d1180b8071c75856f17cd15ccafc;
const IMPLEMENTATION_CONTRACT_ADDRESS = "0x337e858c4465dfef88af8d66baf95842b9b579df"; // "0xBCd69A2b0D50CbAA4a312Fe749a15BFD2c9365Fd"; // "0x3990fabc23d9ac11164624e37141617ad4760e2b";

const TRACEABILITY_INFO = {
  id: 0,
  action: "Entregado a bodega",
  timestamp: 130823,
  actor: ACTOR.toString(),
  actorType: "Distribuidor",
  actorId: "0",
  metadataAction: "Contiene referencia a evidencias",
  productId: 1,
};

const PRODUCT = {
  catalogId: 1,
  productName: "Producto 1 Prueba 2",
  productDescription: "productDescription",
  manufacturer: "detalleFabricante",
  manufacturingDate: 130823,
  batchNumber: 148,
  productionLocation: "Bogota",
  metadataProducto: "Contiene evidencias de referencia del producto",
  // traceabilityInfo: TRACEABILITY_INFO,
};

const ACTOR_TYPE = "Distribuidor"; // Fabricante, Distribuidor, Proveedor, Transportista, UsuarioFinal
const PRODUCT_STOCK = {
  _productId: 1,
  _availableQuantity: 6,
  _reservedQuantity: 2,
  _totalQuantity: 8,
};

export {
  ACTOR,
  IMPLEMENTATION_CONTRACT_ADDRESS,
  TRACEABILITY_INFO,
  PRODUCT,
  ACTOR_TYPE,
  PRODUCT_STOCK,
};
