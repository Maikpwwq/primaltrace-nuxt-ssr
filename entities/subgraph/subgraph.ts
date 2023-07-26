// Filename: subgraph.ts

import { dataSource, ethereum, json, Bytes } from "@graphprotocol/graph-ts";
import { Product, TraceabilityInfo } from "./types/schema"; // schema

export function handleAddProduct(event: Product): void {
  let productId = event.params.productId.toString();
  let product = new Product(productId);
  product.productName = event.params.productName.toString();
  product.productDescription = event.params.productDescription.toString();
  product.manufacturer = event.params.manufacturer.toString();
  product.manufacturingDate = event.params.manufacturingDate;
  product.batchNumber = event.params.batchNumber.toString();
  product.productionLocation = event.params.productionLocation.toString();
  product.metadataProducto = event.params.metadataProducto.toString();
  product.traceabilityInfo = [];
  product.save();
}

export function handleAddTraceabilityInfo(event: TraceabilityInfo): void {
  let productId = event.params.productId.toString();
  let product = Product.load(productId);
  if (!product) {
    return;
  }
  let traceabilityId = event.params.id.toString();
  let traceabilityInfo = new TraceabilityInfo(traceabilityId);
  traceabilityInfo.action = event.params.action.toString();
  traceabilityInfo.timestamp = event.params.timestamp;
  traceabilityInfo.actor = event.params.actor;
  traceabilityInfo.actorType = event.params.actorType.toString();
  traceabilityInfo.actorId = event.params.actorId.toString();
  traceabilityInfo.metadataAction = event.params.metadataAction.toString();
  traceabilityInfo.product = productId;
  traceabilityInfo.save();
}

export function handleProductStockUpdated(
  productId: BigInt,
  availableQuantity: BigInt,
  reservedQuantity: BigInt,
  totalQuantity: BigInt,
): void {
  let product = Product.load(productId);
  if (!product) {
    return;
  }

  product.availableQuantity = availableQuantity;
  product.reservedQuantity = reservedQuantity;
  product.totalQuantity = totalQuantity;
  product.save();
}

// export function handleAddProduct(content: Bytes): void {
//   const value = json.fromBytes(content).toObject();
//   if (value) {
//     const productId = value.get("productId");
//     const productName = value.get("productName");
//     const productDescription = value.get("productDescription");
//     const manufacturer = value.get("manufacturer");
//     const manufacturingDate = value.get("manufacturingDate");
//     const batchNumber = value.get("batchNumber");
//     const productionLocation = value.get("productionLocation");
//     const metadataProducto = value.get("metadataProducto");
//     let productEvent = new Product(dataSource.stringParam());
//     if (
//       productId &&
//       productName &&
//       productDescription &&
//       manufacturer &&
//       manufacturingDate &&
//       batchNumber &&
//       productionLocation &&
//       metadataProducto
//     ) {
//       productEvent.productId = productId.toString();
//       productEvent.productName = productName.toString();
//       productEvent.productDescription = productDescription.toString();
//       productEvent.manufacturer = manufacturer.toString();
//       productEvent.manufacturingDate = manufacturingDate.toBigInt();
//       productEvent.batchNumber = batchNumber.toString();
//       productEvent.productionLocation = productionLocation.toString();
//       productEvent.metadataProducto = metadataProducto.toString();
//     }
//     productEvent.save();
//   }
// }

// export function handleAddTraceabilityInfo(content: Bytes): void {
//   let product = Product.load(dataSource.context().getString("id"));
//   if (product == null) {
//     return;
//   }

//   let TraceabilityEvent = new TraceabilityInfo(dataSource.stringParam());
//   const value = json.fromBytes(content).toObject();
//   if (value) {
//     const id = value.get("id");
//     const action = value.get("action");
//     const timestamp = value.get("timestamp");
//     const actor = value.get("actor");
//     const actorType = value.get("actorType");
//     const actorId = value.get("actorId");
//     const productId = value.get("productId");
//     if (
//       id &&
//       action &&
//       timestamp &&
//       actor &&
//       actorType &&
//       actorId &&
//       productId
//     ) {
//       TraceabilityEvent.id = id.toString();
//       TraceabilityEvent.action = action.toString();
//       TraceabilityEvent.timestamp = timestamp.toBigInt();
//       TraceabilityEvent.actor = dataSource.context().getBytes("actor");
//       TraceabilityEvent.actorType = actorType.toString();
//       TraceabilityEvent.actorId = actorId.toString();
//       TraceabilityEvent.productId = productId.toBigInt();
//     }
//     TraceabilityEvent.save();
//   }
// }

// export function handleAddProduct(content: ethereum.Event): void {
//   let entity = new Product(
//     content.transaction.hash.toHex() + "-" + content.logIndex.toString()
//   );
//   const value = json.fromBytes(content).toObject()
//   // entity.productId = event.params.get("productId").toString();
//   entity.productId = dataSource.context().getString("productId");
//   entity.productName = dataSource.context().getString("productName");
//   entity.productDescription = dataSource
//     .context()
//     .getString("productDescription");
//   entity.manufacturer = dataSource.context().getString("manufacturer");
//   entity.manufacturingDate = dataSource
//     .context()
//     .getBigInt("manufacturingDate");
//   entity.batchNumber = dataSource.context().getString("batchNumber");
//   entity.productionLocation = dataSource
//     .context()
//     .getString("productionLocation");
//   entity.metadataProducto = dataSource.context().getString("metadataProducto");
//   entity.save();
// }

// export function handleAddTraceabilityInfo(event: ethereum.Event): void {
//   let product = Product.load(event.params.productId.toHex());
//   if (product == null) {
//     return;
//   }

//   let entity = new TraceabilityInfo(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   );
//   entity.id = event.logIndex;
//   entity.action = dataSource.context().getString("action");
//   entity.timestamp = dataSource.context().getBigInt("timestamp");
//   entity.actor = dataSource.context().getBytes("actor");
//   entity.actorType = dataSource.context().getString("actorType");
//   entity.actorId = dataSource.context().getString("actorId");
//   entity.metadataAction = dataSource.context().getString("metadataAction");
//   entity.productId = dataSource.context().getBigInt("productId");
//   entity.save();
// }
