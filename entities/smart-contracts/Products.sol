// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Products {
    enum ActorType {
        Fabricante,
        Distribuidor,
        Proveedor,
        Transportista,
        UsuarioFinal
    }

    struct Product {
        uint256 productId;
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

    uint256 public productCounter;

    modifier onlyActorType(ActorType _actorType) {
        require(
            actorTypes[msg.sender] == _actorType,
            "Actor no autorizado para esta accion"
        );
        _;
    }

    // Función para establecer el tipo de actor permitido por cada dirección
    function setActorType(ActorType _actorType) public {
        actorTypes[msg.sender] = _actorType;
    }

    function addProduct(
        string memory _productName,
        string memory _productDescription,
        string memory _manufacturer,
        uint256 _manufacturingDate,
        string memory _batchNumber,
        string memory _productionLocation,
        string memory _metadataProducto
    ) public {
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
        require(_productId < productCounter, "Product does not exist");

        // Obtener el tipo de actor del msg.sender
        ActorType senderActorType = actorTypes[msg.sender];

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
            string memory
        )
    {
        require(_productId < productCounter, "El producto no existe");

        Product memory product = products[_productId];

        return (
            product.productId,
            product.productName,
            product.productDescription,
            product.manufacturer,
            product.manufacturingDate,
            product.batchNumber,
            product.productionLocation,
            product.metadataProducto
        );
    }

    function getProductStock(
        uint256 _productId
    ) public view returns (uint256, uint256, uint256) {
        require(_productId < productCounter, "El producto no existe");

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
        require(_productId < productCounter, "Product does not exist");

        return products[_productId].traceabilityInfo;
    }

    function getTraceabilityInfo(
        uint256 _productId
    ) public view returns (TraceabilityInfo[] memory) {
        return products[_productId].traceabilityInfo;
    }

    function updateProductStock(
        uint256 _productId,
        uint256 _availableQuantity,
        uint256 _reservedQuantity,
        uint256 _totalQuantity
    ) public onlyActorType(ActorType.Fabricante) {
        require(_productId < productCounter, "Product does not exist");

        productStock[_productId].availableQuantity = _availableQuantity;
        productStock[_productId].reservedQuantity = _reservedQuantity;
        productStock[_productId].totalQuantity = _totalQuantity;
    }
}
