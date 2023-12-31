// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract Catalogs {
    // Catálogo
    struct Catalog {
        uint256 catalogId; // Identificador único del catálogo
        string catalogName; // Nombre del catálogo
        string catalogDescription; // Descripción del catálogo
        uint256 creationDate; // Marca de tiempo cuando se crea el catálogo
        uint256[] productIds; // Array de IDs de productos asociados con el catálogo
        string catalogMetadata; // Metadatos adicionales para el catálogo
        string qrCode; // Código QR asociado con el catálogo
    }

    // Producto
    struct Product {
        uint256 productId; // Identificador único del producto
        uint256 catalogId; // ID del catálogo al que pertenece el producto
        string productName; // Nombre del producto
        string productDescription; // Descripción del producto
        string manufacturer; // Fabricante del producto
        uint256 manufacturingDate; // Fecha de fabricación del producto
        string batchNumber; // Número de lote del producto
        string productionLocation; // Ubicación de producción del producto
        string metadataProducto; // Metadatos adicionales para el producto
        string qrCode; // Código QR asociado con el producto
        TraceabilityInfo[] traceabilityInfo; // Array de información de trazabilidad asociada con el producto
    }

    enum ActorType {
        Fabricante, // Fabricante
        Distribuidor, // Distribuidor
        Proveedor, // Proveedor
        Transportista, // Transportista
        UsuarioFinal // Usuario final
    }

    // Eventos relacionados con fechas
    // Seguridad relacionada con parámetro de referencia
    // Noticias relacionadas con procesos
    // Producto relacionado con disponibilidad
    enum AlertType {
        Noticias, // Noticias
        Seguridad, // Seguridad
        Eventos, // Eventos
        Producto // Producto
    }

    // Trazabilidad
    struct TraceabilityInfo {
        uint256 id; // Identificador único para la información de trazabilidad
        // string action; // (comentado) Acción asociada con la información de trazabilidad
        // uint256 timestamp; // (comentado) Marca de tiempo asociada con la información de trazabilidad
        address actor; // Dirección del actor asociado con la información de trazabilidad
        ActorType actorType; // Tipo de actor (Fabricante, Distribuidor, Proveedor, etc.)
        string actorId; // Identificador único del actor
        string metadataAction; // Metadatos adicionales para la acción
        uint256 productId; // ID del producto asociado con la información de trazabilidad
        string certificationType; // Tipo de certificación asociada con la trazabilidad
        uint256 certificationDate; // Fecha de la certificación
        string certificationResult; // Resultado de la certificación
    }

    // Inventario
    struct StockInfo {
        uint256 availableQuantity; // Cantidad disponible en stock
        uint256 reservedQuantity; // Cantidad reservada en stock
        uint256 totalQuantity; // Cantidad total en stock
    }

    // Alerta
    struct Alert {
        uint256 alertId; // Identificador único para la alerta
        uint256 productId; // ID del producto asociado con la alerta
        uint256 traceabilityId; // ID de la trazabilidad asociada con la alerta
        AlertType alertType; // Tipo de alerta (Noticias, Seguridad, Eventos, Producto)
        string alertTitle; // Título de la alerta
        string alertSubtitle; // Subtítulo de la alerta
        string alertDescription; // Descripción de la alerta
        string alertParam; // Parámetro adicional de la alerta
        string conditionalTrigguer; // Condición que desencadenó la alerta
        address reportedBy; // Dirección que informó la alerta
        bool resolved; // Estado que indica si la alerta está resuelta
    }

    // Definición de contadores
    uint256 public productCounter; // Contador para productos
    uint256 public catalogCounter; // Contador para catálogos
    uint256 public alertCounter; // Contador para alertas

    // Mapping para almacenar colecciones
    mapping(uint256 => Catalog) public catalogs; // Mapeo de IDs de catálogo a estructuras Catalog
    mapping(uint256 => Product) public products; // Mapeo de IDs de producto a estructuras Product
    mapping(uint256 => StockInfo) public productStock; // Mapeo de IDs de producto a estructuras StockInfo
    mapping(uint256 => Alert) public alerts; // Mapeo de IDs de alerta a estructuras Alert
    // Mapping para almacenar el tipo de actor permitido
    mapping(address => ActorType) public actorTypes; // Mapeo de direcciones a enumeraciones ActorType
    // Mapping para almacenar el tipo de alerta permitido
    mapping(address => AlertType) public alertTypes; // Mapeo de direcciones a enumeraciones AlertType

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

    /**
     * @dev Inicializa el contrato estableciendo un nuevo catálogo de productos.
     * @param _initialCatalogName Nombre inicial del catálogo.
     * @param _initialCatalogDescription Descripción inicial del catálogo.
     * @param _initialCatalogMetadata Metadatos iniciales del catálogo.
     * @param _initialCatalogQrCode Código QR inicial asociado al catálogo.
     */
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

    /**
     * @dev Crea un nuevo catálogo de productos.
     * @param _catalogName Nombre del catálogo.
     * @param _catalogDescription Descripción del catálogo.
     * @param _catalogMetadata Metadatos adicionales del catálogo.
     * @param _catalogQrCode Código QR asociado al catálogo.
     */
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

    /**
     * @dev Agrega un nuevo producto a un catálogo existente.
     * @param _catalogId ID del catálogo al que se va a agregar el producto.
     * @param _productId ID del producto que se va a agregar al catálogo.
     */
    function addProductToCatalog(
        uint256 _catalogId,
        uint256 _productId
    ) public {
        require(catalogs[_catalogId].catalogId != 0, "El catalogo no existe");
        require(products[_productId].productId != 0, "El producto no existe");

        Catalog storage catalog = catalogs[_catalogId];
        catalog.productIds.push(_productId);
    }

    /**
     * @dev Agrega un nuevo producto al sistema.
     * @param _catalogId ID del catálogo al que pertenece el producto.
     * @param _productName Nombre del producto.
     * @param _productDescription Descripción del producto.
     * @param _manufacturer Fabricante del producto.
     * @param _manufacturingDate Fecha de fabricación del producto.
     * @param _batchNumber Número de lote del producto.
     * @param _productionLocation Ubicación de producción del producto.
     * @param _metadataProducto Metadatos adicionales del producto.
     * @param _productQrCode Código QR asociado al producto.
     */
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
        require(catalogs[_catalogId].catalogId != 0, "El catalogo no existe");

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

    /**
     * @dev Obtiene la información relacionada con un catálogo de productos.
     * @param _catalogId ID del catálogo del cual se desea obtener la información.
     * @return (
     *   uint256 ID del catálogo,
     *   string Nombre del catálogo,
     *   string Descripción del catálogo,
     *   uint256 Fecha de creación del catálogo,
     *   uint256[] IDs de productos asociados al catálogo,
     *   string Metadatos del catálogo,
     *   string Código QR del catálogo
     * )
     */
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
        require(catalogs[_catalogId].catalogId != 0, "El catalogo no existe");

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

    /**
     * @dev Obtiene la información relacionada con los productos asociados a un catálogo.
     * @param _catalogId ID del catálogo del cual se desea obtener los productos asociados.
     * @return uint256[] Array de IDs de productos asociados al catálogo.
     */
    function getCatalogProducts(
        uint256 _catalogId
    ) public view returns (uint256[] memory) {
        require(catalogs[_catalogId].catalogId != 0, "El catalogo no existe");

        return catalogs[_catalogId].productIds;
    }

    /**
     * @dev Agrega información de trazabilidad relacionada con un producto.
     * @param _productId ID del producto al cual se desea agregar la información de trazabilidad.
     * @param _actor Dirección del actor que realiza la acción.
     * @param _actorType Tipo de actor que realiza la acción (Fabricante, Distribuidor, Proveedor, etc.).
     * @param _actorId Identificador único del actor.
     * @param _metadataAction Metadatos adicionales de la acción.
     * @param _certificationType Tipo de certificación asociada a la trazabilidad.
     * @param _certificationDate Fecha de la certificación.
     * @param _certificationResult Resultado de la certificación.
     */
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
        require(products[_productId].productId != 0, "El producto no existe");

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

    /**
     * @dev Obtiene la información relacionada con un producto.
     * @param _productId ID del producto del cual se desea obtener la información.
     * @return (
     *   uint256 ID del producto,
     *   string Nombre del producto,
     *   string Descripción del producto,
     *   string Fabricante del producto,
     *   uint256 Fecha de fabricación del producto,
     *   string Número de lote del producto,
     *   string Ubicación de producción del producto,
     *   string Metadatos adicionales del producto,
     *   string Código QR asociado al producto,
     *   TraceabilityInfo[] Array de información de trazabilidad asociada al producto
     * )
     */
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
        require(products[_productId].productId != 0, "El producto no existe");

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

    /**
     * @dev Obtiene la información de stock de un producto.
     * @param _productId ID del producto del cual se desea obtener la información de stock.
     * @return (
     *   uint256 Cantidad disponible en stock,
     *   uint256 Cantidad reservada,
     *   uint256 Cantidad total en stock
     * )
     */
    function getProductStock(
        uint256 _productId
    ) public view returns (uint256, uint256, uint256) {
        require(products[_productId].productId != 0, "El producto no existe");

        StockInfo memory stock = productStock[_productId];

        return (
            stock.availableQuantity,
            stock.reservedQuantity,
            stock.totalQuantity
        );
    }

    /**
     * @dev Obtiene la información de trazabilidad relacionada con un producto.
     * @param _productId ID del producto del cual se desea obtener la información de trazabilidad.
     * @return TraceabilityInfo[] Array de información de trazabilidad asociada al producto.
     */
    function getProductTraceabilityInfo(
        uint256 _productId
    ) public view returns (TraceabilityInfo[] memory) {
        require(products[_productId].productId != 0, "El producto no existe");

        return products[_productId].traceabilityInfo;
    }

    /**
     * @dev Actualiza la información de stock de un producto.
     * @param _productId ID del producto del cual se desea actualizar la información de stock.
     * @param _availableQuantity Cantidad disponible en stock.
     * @param _reservedQuantity Cantidad reservada.
     * @param _totalQuantity Cantidad total en stock.
    */
    function updateProductStock(
        uint256 _productId,
        uint256 _availableQuantity,
        uint256 _reservedQuantity,
        uint256 _totalQuantity
    ) public {
        // onlyActorType(ActorType.Fabricante)
        require(products[_productId].productId != 0, "El producto no existe");

        productStock[_productId].availableQuantity = _availableQuantity;
        productStock[_productId].reservedQuantity = _reservedQuantity;
        productStock[_productId].totalQuantity = _totalQuantity;
    }

    /**
     * @dev Asocia un código QR a un catálogo.
     * @param _catalogId ID del catálogo al cual se desea asociar el código QR.
     * @param _qrCode Código QR a asociar al catálogo.
     */
    function associateQrCodeWithCatalog(
        uint256 _catalogId,
        string memory _qrCode
    ) public {
        require(catalogs[_catalogId].catalogId != 0, "El catalogo no existe");
        catalogs[_catalogId].qrCode = _qrCode;
    }

    /**
     * @dev Asocia un código QR a un producto.
     * @param _productId ID del producto al cual se desea asociar el código QR.
     * @param _qrCode Código QR a asociar al producto.
    */
    function associateQrCodeWithProduct(
        uint256 _productId,
        string memory _qrCode
    ) public {
        require(products[_productId].productId != 0, "El producto no existe");
        products[_productId].qrCode = _qrCode;
    }

    /**
     * @dev Evento para registrar notificaciones asociadas a un producto.
     * @param productId ID del producto asociado a la notificación.
     * @param notificationMessage Mensaje de la notificación.
    */
    event NotificationGenerated(
        uint256 indexed productId,
        string notificationMessage
    );

    /**
     * @dev Genera una notificación asociada a un producto y la registra en la cadena.
     * @param _productId ID del producto al cual se asocia la notificación.
     * @param _notificationMessage Mensaje de la notificación.
    */
    function generateNotification(
        uint256 _productId,
        string memory _notificationMessage
    ) public {
        require(products[_productId].productId != 0, "El producto no existe");
        // Registra la notificación como un evento
        emit NotificationGenerated(_productId, _notificationMessage);
    }

    /**
     * @dev Evento para registrar la alerta reportada.
     * @param alertId ID de la alerta.
     * @param productId ID del producto asociado a la alerta.
     * @param traceabilityId ID de la trazabilidad asociada a la alerta.
     * @param alertType Tipo de alerta.
     * @param alertTitle Título de la alerta.
     * @param alertSubtitle Subtítulo de la alerta.
     * @param alertDescription Descripción de la alerta.
     * @param alertParam Parámetro adicional de la alerta.
     * @param conditionalTrigguer Condición que desencadenó la alerta.
     * @param reportedBy Dirección que reportó la alerta.
    */
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

    /**
     * @dev Registra una alerta asociada a un producto en el contrato.
     * @param _productId ID del producto asociado a la alerta.
     * @param _traceabilityId ID de la trazabilidad asociada a la alerta.
     * @param _alertType Tipo de alerta. Noticias, Seguridad, Eventos, Producto
     * @param _alertTitle Título de la alerta.
     * @param _alertSubtitle Subtítulo de la alerta.
     * @param _alertDescription Descripción de la alerta.
     * @param _alertParam Parámetro de trazabilidad de la alerta.
     * @param _conditionalTrigguer Condición que desencadenó la alerta.
    */
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
        require(products[_productId].productId != 0, "El producto no existe");
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

    /**
     * @dev Evento para registrar la resolución de una alerta.
     * @param alertId ID de la alerta resuelta.
    */
    event AlertResolved(uint256 indexed alertId);

    /**
     * @dev Actualiza el estado de una alerta marcándola como resuelta.
     * @param _alertId ID de la alerta que se desea resolver.
     */
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

    /**
     * @dev Obtiene información relacionada con una alerta.
     * @param _alertId ID de la alerta de la cual se desea obtener información.
     * @return (
     *   uint256 ID de la alerta,
     *   uint256 ID del producto asociado a la alerta,
     *   uint256 ID de la trazabilidad asociada a la alerta,
     *   AlertType Tipo de alerta,
     *   string Título de la alerta,
     *   string Subtítulo de la alerta,
     *   string Descripción de la alerta,
     *   string Parámetro adicional de la alerta,
     *   string Condición que desencadenó la alerta,
     *   address Dirección que reportó la alerta,
     *   bool Estado de resolución de la alerta
     * )
     */
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
        require(alerts[_alertId].alertId != 0, "La alerta no existe");

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

    /**
     * @dev Obtiene información de todas las alertas registradas.
     * @return (
     *   uint256[] Array de IDs de alertas,
     *   uint256[] Array de IDs de productos asociados a las alertas,
     *   uint256[] Array de IDs de trazabilidades asociadas a las alertas,
     *   AlertType[] Array de tipos de alerta,
     *   string[] Array de títulos de alerta,
     *   string[] Array de subtítulos de alerta,
     *   string[] Array de descripciones de alerta,
     *   string[] Array de parámetros adicionales de alerta,
     *   string[] Array de condiciones que desencadenaron las alertas,
     *   address[] Array de direcciones que reportaron las alertas,
     *   bool[] Array de estados de resolución de las alertas
     * )
    */
    function getAllAlerts() public view returns (
        uint256[] memory,
        uint256[] memory,
        uint256[] memory,
        AlertType[] memory,
        string[] memory,
        string[] memory,
        string[] memory,
        string[] memory,
        string[] memory,
        address[] memory,
        bool[] memory
    ) {
        uint256 totalAlerts = alertCounter;
        uint256[] memory alertIds = new uint256[](totalAlerts);
        uint256[] memory productIds = new uint256[](totalAlerts);
        uint256[] memory traceabilityIds = new uint256[](totalAlerts);
        AlertType[] memory alertsTypes = new AlertType[](totalAlerts);
        string[] memory alertTitles = new string[](totalAlerts);
        string[] memory alertSubtitles = new string[](totalAlerts);
        string[] memory alertDescriptions = new string[](totalAlerts);
        string[] memory alertParams = new string[](totalAlerts);
        string[] memory conditionalTriguers = new string[](totalAlerts);
        address[] memory reportedByAddresses = new address[](totalAlerts);
        bool[] memory resolvedStates = new bool[](totalAlerts);

        for (uint256 i = 1; i <= totalAlerts; i++) {
            alertIds[i - 1] = alerts[i].alertId;
            productIds[i - 1] = alerts[i].productId;
            traceabilityIds[i - 1] = alerts[i].traceabilityId;
            alertsTypes[i - 1] = alerts[i].alertType;
            alertTitles[i - 1] = alerts[i].alertTitle;
            alertSubtitles[i - 1] = alerts[i].alertSubtitle;
            alertDescriptions[i - 1] = alerts[i].alertDescription;
            alertParams[i - 1] = alerts[i].alertParam;
            conditionalTriguers[i - 1] = alerts[i].conditionalTrigguer;
            reportedByAddresses[i - 1] = alerts[i].reportedBy;
            resolvedStates[i - 1] = alerts[i].resolved;
        }

        return (
            alertIds,
            productIds,
            traceabilityIds,
            alertsTypes,
            alertTitles,
            alertSubtitles,
            alertDescriptions,
            alertParams,
            conditionalTriguers,
            reportedByAddresses,
            resolvedStates
        );
    }

    // TODO: notificar a las partes interesadas sobre la resolución de alertas,
    // tambien sobre las notificaciones y alertas.
}
