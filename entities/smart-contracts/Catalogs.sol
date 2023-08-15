// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Catalogs {
    struct Catalog {
        uint256 catalogId;
        string catalogName;
        string catalogDescription;
        uint256 creationDate;
        uint256[] productIds;
        string catalogMetadata;
    }

    enum ActorType {
        Fabricante,
        Distribuidor,
        Proveedor,
        Transportista,
        UsuarioFinal
    }

    struct Product {
        uint256 productId;
        uint256 catalogId;
        string productName;
        string productDescription;
        string manufacturer;
        uint256 manufacturingDate;
        string batchNumber;
        string productionLocation;
        string metadataProducto;
        TraceabilityInfo[] traceabilityInfo;
    }

    // Teazabilidad
    struct TraceabilityInfo {
        uint256 id;
        string action;
        uint256 timestamp;
        address actor;
        ActorType actorType;
        string actorId;
        string metadataAction;
        uint256 productId;
    }

    // Stock
    struct StockInfo {
        uint256 availableQuantity;
        uint256 reservedQuantity;
        uint256 totalQuantity;
    }

    mapping(uint256 => Product) public products;
    mapping(uint256 => StockInfo) public productStock; // Stock
    // Mapping para almacenar el tipo de actor permitido
    mapping(address => ActorType) public actorTypes;
    mapping(uint256 => Catalog) public catalogs;

    uint256 public productCounter;
    uint256 public catalogCounter;

    // modifier onlyActorType(ActorType _actorType) {
    //     require(
    //         actorTypes[msg.sender] == _actorType,
    //         "Actor no autorizado para esta accion"
    //     );
    //     _;
    // }

    // Función para establecer el tipo de actor permitido por cada dirección
    // function setActorType(ActorType _actorType) public {
    //     actorTypes[msg.sender] = _actorType;
    // }

    function createCatalog(
        string memory _catalogName,
        string memory _catalogDescription,
        string memory _catalogMetadata
    ) public {
        catalogCounter++;
        // catalogs[catalogCounter] = Catalog(
        //     catalogCounter,
        //     _catalogName,
        //     _catalogDescription,
        //     block.timestamp,
        //     new uint256[](0),
        //     _catalogMetadata
        // );
        catalogs[catalogCounter].catalogId = catalogCounter;
        catalogs[catalogCounter].catalogName = _catalogName;
        catalogs[catalogCounter].catalogDescription = _catalogDescription;
        catalogs[catalogCounter].creationDate = block.timestamp;
        catalogs[catalogCounter].productIds = new uint256[](0);
        catalogs[catalogCounter].catalogMetadata = _catalogMetadata;
    }

    function addProductToCatalog(
        uint256 _catalogId,
        uint256 _productId
    ) public {
        require(catalogs[_catalogId].catalogId != 0, "Catalog does not exist");
        require(products[_productId].productId != 0, "Product does not exist");

        Catalog storage catalog = catalogs[_catalogId];
        catalog.productIds.push(_productId);
    }

    function addProduct(
        uint256 _catalogId,
        string memory _productName,
        string memory _productDescription,
        string memory _manufacturer,
        uint256 _manufacturingDate,
        string memory _batchNumber,
        string memory _productionLocation,
        string memory _metadataProducto
    ) public {
        require(catalogs[_catalogId].catalogId != 0, "Catalog does not exist");

        // products[productCounter] = Product(
        //     productCounter,
        //     _productName,
        //     _productDescription,
        //     _manufacturer,
        //     _manufacturingDate,
        //     _batchNumber,
        //     _productionLocation,
        //     _metadataProducto // new TraceabilityInfo[](0) Error: Copying of type struct Products.TraceabilityInfo memory[] memory to storage not yet supported.
        // );

        productCounter++;
        products[productCounter].catalogId = _catalogId;
        products[productCounter].productId = productCounter;
        products[productCounter].productName = _productName;
        products[productCounter].productDescription = _productDescription;
        products[productCounter].manufacturer = _manufacturer;
        products[productCounter].manufacturingDate = _manufacturingDate;
        products[productCounter].batchNumber = _batchNumber;
        products[productCounter].productionLocation = _productionLocation;
        products[productCounter].metadataProducto = _metadataProducto;
        // Agregar una instancia de TraceabilityInfo con valores por defecto
        products[productCounter].traceabilityInfo.push(
            TraceabilityInfo(
                products[productCounter].traceabilityInfo.length + 1,
                "", // action: valor por defecto, puedes poner el valor que necesites
                block.timestamp, // timestamp: usa el timestamp actual
                address(0), // actor: dirección vacía
                ActorType.Fabricante, // actorType: ActorType.Fabricante como valor por defecto, puedes cambiarlo según tus necesidades
                "", // actorId: cadena vacía
                "", // metadataAction: cadena vacía
                productCounter // productId: usa el id del producto actual
            )
        );

        productStock[productCounter] = StockInfo(0, 0, 0); // Stock

        // Se actualiza el catalogo para incluir el producto
        Catalog storage catalog = catalogs[_catalogId];
        catalog.productIds.push(productCounter);
    }

    function getCatalog(
        uint256 _catalogId
    )
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            uint256,
            uint256[] memory,
            string memory
        )
    {
        require(catalogs[_catalogId].catalogId != 0, "Catalog does not exist");

        Catalog memory catalog = catalogs[_catalogId];
        return (
            catalog.catalogId,
            catalog.catalogName,
            catalog.catalogDescription,
            catalog.creationDate,
            catalog.productIds,
            catalog.catalogMetadata
        );
    }

    function getCatalogProducts(
        uint256 _catalogId
    ) public view returns (uint256[] memory) {
        require(catalogs[_catalogId].catalogId != 0, "Catalog does not exist");

        return catalogs[_catalogId].productIds;
    }

    function addTraceabilityInfo(
        uint256 _productId,
        string memory _action, //
        uint256 _timestamp,
        address _actor,
        ActorType _actorType,
        string memory _actorId,
        string memory _metadataAction
    ) public {
        require(products[_productId].productId != 0, "Product does not exist");

        // Obtener el tipo de actor del msg.sender
        ActorType senderActorType = _actorType; // actorTypes[msg.sender];

        // Validar que el tipo de actor sea válido para esta operación
        require(
            senderActorType == ActorType.Fabricante ||
                senderActorType == ActorType.Distribuidor ||
                senderActorType == ActorType.Proveedor,
            "Tipo de actor no valido para esta accion"
        );

        // Obtener el índice del array de trazabilidad
        uint256 traceabilityIndex = products[_productId]
            .traceabilityInfo
            .length;

        // Agregar la información de trazabilidad con el tipo de actor
        products[_productId].traceabilityInfo.push(
            TraceabilityInfo(
                traceabilityIndex,
                _action,
                _timestamp, // block.timestamp,
                _actor, // msg.sender,
                _actorType, // senderActorType,
                _actorId,
                _metadataAction,
                _productId
            )
        );
    }

    function getProduct(
        uint256 _productId
    )
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            uint256,
            string memory,
            string memory,
            string memory,
            TraceabilityInfo[] memory 
        )
    {
        require(products[_productId].productId != 0, "Product does not exist");

        Product memory product = products[_productId];

        return (
            product.productId,
            product.productName,
            product.productDescription,
            product.manufacturer,
            product.manufacturingDate,
            product.batchNumber,
            product.productionLocation,
            product.metadataProducto,
            product.traceabilityInfo
        );
    }

    function getProductStock(
        uint256 _productId
    ) public view returns (uint256, uint256, uint256) {
        require(products[_productId].productId != 0, "Product does not exist");

        StockInfo memory stock = productStock[_productId];

        return (
            stock.availableQuantity,
            stock.reservedQuantity,
            stock.totalQuantity
        );
    }

    function getProductTraceabilityInfo(
        uint256 _productId
    ) public view returns (TraceabilityInfo[] memory) {
        require(products[_productId].productId != 0, "Product does not exist");

        return products[_productId].traceabilityInfo;
    }

    function updateProductStock(
        uint256 _productId,
        uint256 _availableQuantity,
        uint256 _reservedQuantity,
        uint256 _totalQuantity
    ) public {
        // onlyActorType(ActorType.Fabricante)
        require(products[_productId].productId != 0, "Product does not exist");

        productStock[_productId].availableQuantity = _availableQuantity;
        productStock[_productId].reservedQuantity = _reservedQuantity;
        productStock[_productId].totalQuantity = _totalQuantity;
    }
}
