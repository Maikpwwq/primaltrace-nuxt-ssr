// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Catalogs {
    // Catalogo
    struct Catalog {
        uint256 catalogId;
        string catalogName;
        string catalogDescription;
        uint256 creationDate;
        uint256[] productIds;
        string catalogMetadata;
        string qrCode;
    }

    // Producto
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
        string qrCode;
        TraceabilityInfo[] traceabilityInfo;
    }

    enum ActorType {
        Fabricante,
        Distribuidor,
        Proveedor,
        Transportista,
        UsuarioFinal
    }

    // Eventos relacionado a fechas
    // Seguridad relacionado a parametro de referencia
    // Noticias relacionado a procesos
    // Producto relacionado a disponibilidad
    enum AlertType {
        Noticias,
        Seguridad,
        Eventos,
        Producto
    }

    // Trazabilidad
    struct TraceabilityInfo {
        uint256 id;
        // string action;
        // uint256 timestamp;
        address actor;
        ActorType actorType;
        string actorId;
        string metadataAction;
        uint256 productId;
        string certificationType;
        uint256 certificationDate;
        string certificationResult;
    }

    // Stock
    struct StockInfo {
        uint256 availableQuantity;
        uint256 reservedQuantity;
        uint256 totalQuantity;
    }

    // Alert
    struct Alert {
        uint256 alertId;
        uint256 productId;
        uint256 traceabilityId;
        AlertType alertType;
        string alertTitle;
        string alertSubtitle;
        string alertDescription;
        string alertParam;
        string conditionalTrigguer;
        address reportedBy;
        bool resolved;
    }

    // Definición de contandores
    uint256 public productCounter;
    uint256 public catalogCounter;
    uint256 public alertCounter;

    // Mapping para almacenar colecciones
    mapping(uint256 => Catalog) public catalogs;
    mapping(uint256 => Product) public products;
    mapping(uint256 => StockInfo) public productStock;
    mapping(uint256 => Alert) public alerts;
    // Mapping para almacenar el tipo de actor permitido
    mapping(address => ActorType) public actorTypes;
    // Mapping para almacenar el tipo de alerta permitido
    mapping(address => AlertType) public alertTypes;

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

    // Función que inicializa el contrato estableciendo un nuevo catalogo de productos
    constructor(
        string memory _initialCatalogName,
        string memory _initialCatalogDescription,
        string memory _initialCatalogMetadata,
        string memory _initialCatalogQrCode
    ) {
        // Inicializa el contrato con una nueva categoría
        catalogCounter++;
        catalogs[catalogCounter].catalogId = catalogCounter;
        catalogs[catalogCounter].catalogName = _initialCatalogName;
        catalogs[catalogCounter]
            .catalogDescription = _initialCatalogDescription;
        catalogs[catalogCounter].creationDate = block.timestamp;
        catalogs[catalogCounter].productIds = new uint256[](0);
        catalogs[catalogCounter].catalogMetadata = _initialCatalogMetadata;
        catalogs[catalogCounter].qrCode = _initialCatalogQrCode;
    }

    // Función interna que permite crear un nuevo catalogo de productos
    function createCatalog(
        string memory _catalogName,
        string memory _catalogDescription,
        string memory _catalogMetadata,
        string memory _catalogQrCode
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
        catalogs[catalogCounter].qrCode = _catalogQrCode;
    }

    // Función interna que permite agregar un nuevo producto a un catalogo
    function addProductToCatalog(
        uint256 _catalogId,
        uint256 _productId
    ) public {
        require(catalogs[_catalogId].catalogId != 0, "Catalog does not exist");
        require(products[_productId].productId != 0, "Product does not exist");

        Catalog storage catalog = catalogs[_catalogId];
        catalog.productIds.push(_productId);
    }

    // Función para agregar un nuevo producto
    function addProduct(
        uint256 _catalogId,
        string memory _productName,
        string memory _productDescription,
        string memory _manufacturer,
        uint256 _manufacturingDate,
        string memory _batchNumber,
        string memory _productionLocation,
        string memory _metadataProducto,
        string memory _productQrCode
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
        products[productCounter].qrCode = _productQrCode;
        // Agregar una instancia de TraceabilityInfo con valores por defecto
        products[productCounter].traceabilityInfo.push(
            TraceabilityInfo(
                products[productCounter].traceabilityInfo.length + 1,
                address(0), // actor: dirección vacía
                ActorType.Fabricante, // actorType: ActorType.Fabricante como valor por defecto, puedes cambiarlo según tus necesidades
                "", // actorId: cadena vacía
                "", // metadataAction: cadena vacía
                productCounter, // productId: usa el id del producto actual,
                "", // action: valor por defecto, puedes poner el valor que necesites
                block.timestamp, // timestamp: usa el timestamp actual
                ""
            )
        );

        productStock[productCounter] = StockInfo(0, 0, 0); // Stock

        // Se actualiza el catalogo para incluir el producto
        Catalog storage catalog = catalogs[_catalogId];
        catalog.productIds.push(productCounter);
    }

    // Función para obtener todos los catálogos para este contrato
    function getContractCatalogs() public view returns (Catalog[] memory) {
        Catalog[] memory allCatalogs = new Catalog[](catalogCounter);

        for (uint256 i = 1; i <= catalogCounter; i++) {
            allCatalogs[i - 1] = catalogs[i];
        }

        return allCatalogs;
    }

    // Función para obtener la información relacionada con un catalogo de productos
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
            string memory,
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
            catalog.catalogMetadata,
            catalog.qrCode
        );
    }

    // Función para obtener la información relacionada con los productos asociados a un catalogo
    function getCatalogProducts(
        uint256 _catalogId
    ) public view returns (uint256[] memory) {
        require(catalogs[_catalogId].catalogId != 0, "Catalog does not exist");

        return catalogs[_catalogId].productIds;
    }

    // Función para agregar información de trazabilidad relacionada con un producto
    function addTraceabilityInfo(
        uint256 _productId,
        // string memory _action,
        // uint256 _timestamp,
        address _actor,
        ActorType _actorType,
        string memory _actorId,
        string memory _metadataAction,
        string memory _certificationType,
        uint256 _certificationDate,
        string memory _certificationResult
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
                _actor, // msg.sender,
                _actorType, // senderActorType,
                _actorId,
                _metadataAction,
                _productId,
                _certificationType,
                _certificationDate,
                _certificationResult
            )
        );
    }

    // Función para obtener la información relacionada con un producto
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
            product.qrCode,
            product.traceabilityInfo
        );
    }

    // Función para obtener el stock de un producto
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

    // Función para obtener la información de trazabilidad relacionada con un producto
    function getProductTraceabilityInfo(
        uint256 _productId
    ) public view returns (TraceabilityInfo[] memory) {
        require(products[_productId].productId != 0, "Product does not exist");

        return products[_productId].traceabilityInfo;
    }

    // Función para actualizar el stock de un producto
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

    // Función para asociar un código QR a un catálogo
    function associateQrCodeWithCatalog(
        uint256 _catalogId,
        string memory _qrCode
    ) public {
        require(catalogs[_catalogId].catalogId != 0, "Catalog does not exist");
        catalogs[_catalogId].qrCode = _qrCode;
    }

    // Función para asociar un código QR a un producto
    function associateQrCodeWithProduct(
        uint256 _productId,
        string memory _qrCode
    ) public {
        require(products[_productId].productId != 0, "Product does not exist");
        products[_productId].qrCode = _qrCode;
    }

    // Evento para registrar notificaciones
    event NotificationGenerated(
        uint256 indexed productId,
        string notificationMessage
    );

    // función para generar notificaciones y alertas asociadas a un producto y registrarlas en la cadena
    function generateNotification(
        uint256 _productId,
        string memory _notificationMessage
    ) public {
        require(products[_productId].productId != 0, "Product does not exist");
        // Registra la notificación como un evento
        emit NotificationGenerated(_productId, _notificationMessage);
    }

    // Evento para registrar la alerta reportada
    event AlertReported(
        uint256 indexed alertId,
        uint256 indexed productId,
        uint256 indexed traceabilityId,
        AlertType alertType,
        string alertTitle,
        string alertSubtitle,
        string alertDescription,
        string alertParam,
        string conditionalTrigguer,
        address reportedBy
    );

    // Función para que los actores informen eventos anómalos asociados a un producto
    function reportAlert(
        uint256 _productId,
        uint256 _traceabilityId,
        AlertType _alertType,
        string memory _alertTitle,
        string memory _alertSubtitle,
        string memory _alertDescription,
        string memory _alertParam,
        string memory _conditionalTrigguer
    ) public {
        require(products[_productId].productId != 0, "Product does not exist");
        // Incrementa el contador de alertas
        alertCounter++;

        // Registra la alerta en el contrato
        alerts[alertCounter] = Alert({
            alertId: alertCounter,
            productId: _productId,
            traceabilityId: _traceabilityId,
            alertType: _alertType,
            alertTitle: _alertTitle,
            alertSubtitle: _alertSubtitle,
            alertDescription: _alertDescription,
            alertParam: _alertParam,
            conditionalTrigguer: _conditionalTrigguer,
            reportedBy: msg.sender, // La persona que informa la alerta
            resolved: false // Inicialmente, la alerta no está resuelta
        });

        // Puedes emitir un evento para registrar la alerta si lo deseas
        emit AlertReported(
            alertCounter,
            _productId,
            _traceabilityId,
            _alertType,
            _alertTitle,
            _alertSubtitle,
            _alertDescription,
            _alertParam,
            _conditionalTrigguer,
            msg.sender
        );
    }

    // Evento para registrar la resolución de la alerta
    event AlertResolved(uint256 indexed alertId);

    // Función para actualizar el estado de una alerta y marcarla como resuelta
    function resolveAlert(uint256 _alertId) public {
        require(alerts[_alertId].alertId != 0, "La alerta no existe");
        require(
            alerts[_alertId].resolved == false,
            "La alerta ya esta resuelta"
        );
        require(
            msg.sender == alerts[_alertId].reportedBy,
            "Solo el reportero puede resolver la alerta"
        );

        // Marca la alerta como resuelta
        alerts[_alertId].resolved = true;

        // Puedes emitir un evento para registrar la resolución de la alerta
        emit AlertResolved(_alertId);
    }

    // Función para obtener la información relacionada con una alerta
    function getAlert(
        uint256 _alertId
    )
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            AlertType,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            address,
            bool
        )
    {
        require(alerts[_alertId].alertId != 0, "Alert does not exist");

        Alert memory alert = alerts[_alertId];

        return (
            alert.alertId,
            alert.productId,
            alert.traceabilityId,
            alert.alertType,
            alert.alertTitle,
            alert.alertSubtitle,
            alert.alertDescription,
            alert.alertParam,
            alert.conditionalTrigguer,
            alert.reportedBy,
            alert.resolved
        );
    }

    // TODO: notificar a las partes interesadas sobre la resolución de alertas,
    // tambien sobre las notificaciones y alertas.
}
