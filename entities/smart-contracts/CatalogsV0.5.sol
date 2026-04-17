// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title CatalogsV0.5 — PrimalTrace Supply Chain Traceability
 * @notice Manages product catalogs, traceability events, stock, and alerts on Polygon zkEVM.
 * @dev Phase 1 upgrade from V0.4. Optimized with custom errors to fit EVM 24KB limit.
 *   SC-01  Role-Based Access Control (OPERATOR_ROLE, AUDITOR_ROLE)
 *   SC-02  Ownership via AccessControl DEFAULT_ADMIN_ROLE
 *   SC-03  Input validation with string length bounds
 *   SC-04  ReentrancyGuard on all state-changing functions
 *   SC-06  Paginated read functions (max 50 per page)
 *   SC-07  Events emitted on every write operation
 *   SC-16  Schema sync — restored action/timestamp, kept certification fields
 *   SC-17  Return values on write functions
 *   SC-18  Timestamps on TraceabilityInfo, Alert, Catalog
 *   SC-19  Product integrity hashing and verification
 */
contract Catalogs is AccessControl, ReentrancyGuard {
    // ──────────────────────────────────────────────
    // Custom Errors (saves ~7KB vs require strings)
    // ──────────────────────────────────────────────
    error CatalogNotFound();
    error ProductNotFound();
    error AlertNotFound();
    error AlertAlreadyResolved();
    error NotReporterOrAdmin();
    error InvalidActorType();
    error NameTooLong();
    error DescTooLong();
    error MetaTooLong();
    error QrTooLong();
    error InvalidOffset();

    // ──────────────────────────────────────────────
    // Roles (SC-01, SC-02)
    // ──────────────────────────────────────────────
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");

    // ──────────────────────────────────────────────
    // Input validation constants (SC-03)
    // ──────────────────────────────────────────────
    uint256 private constant MAX_NAME = 128;
    uint256 private constant MAX_DESC = 512;
    uint256 private constant MAX_META = 1024;
    uint256 private constant MAX_QR = 2048;
    uint256 private constant MAX_PAGE = 50;

    // ──────────────────────────────────────────────
    // Structs
    // ──────────────────────────────────────────────

    struct Catalog {
        uint256 catalogId;
        string catalogName;
        string catalogDescription;
        uint256 creationDate;
        uint256 lastModifiedAt;
        uint256[] productIds;
        string catalogMetadata;
        string qrCode;
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
        string qrCode;
        uint256 lastModifiedAt;
        TraceabilityInfo[] traceabilityInfo;
    }

    enum ActorType { Fabricante, Distribuidor, Proveedor, Transportista, UsuarioFinal }
    enum AlertType { Noticias, Seguridad, Eventos, Producto }

    struct TraceabilityInfo {
        uint256 id;
        string action;
        uint256 timestamp;
        address actor;
        ActorType actorType;
        string actorId;
        string metadataAction;
        uint256 productId;
        string certificationType;
        uint256 certificationDate;
        string certificationResult;
    }

    struct StockInfo {
        uint256 availableQuantity;
        uint256 reservedQuantity;
        uint256 totalQuantity;
    }

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
        uint256 createdAt;
    }

    // ──────────────────────────────────────────────
    // State
    // ──────────────────────────────────────────────
    uint256 public productCounter;
    uint256 public catalogCounter;
    uint256 public alertCounter;

    mapping(uint256 => Catalog) public catalogs;
    mapping(uint256 => Product) public products;
    mapping(uint256 => StockInfo) public productStock;
    mapping(uint256 => Alert) public alerts;
    mapping(address => ActorType) public actorTypes;
    mapping(address => AlertType) public alertTypes;
    mapping(uint256 => bytes32) public productIntegrityHashes;

    // ──────────────────────────────────────────────
    // Events (SC-07)
    // ──────────────────────────────────────────────

    event CatalogCreated(uint256 indexed catalogId, address indexed creator, string catalogName);
    event ProductAdded(uint256 indexed productId, uint256 indexed catalogId, address indexed creator, string productName);
    event TraceabilityRecorded(uint256 indexed productId, uint256 indexed traceabilityId, address indexed actor, ActorType actorType, string action);
    event StockUpdated(uint256 indexed productId, uint256 available, uint256 reserved, uint256 total);
    event QrCodeAssociated(uint256 indexed entityId, string entityType, address indexed updatedBy);
    event NotificationGenerated(uint256 indexed productId, string notificationMessage);
    event AlertReported(uint256 indexed alertId, uint256 indexed productId, uint256 indexed traceabilityId, AlertType alertType, string alertTitle, string alertSubtitle, string alertDescription, string alertParam, string conditionalTrigguer, address reportedBy);
    event AlertResolved(uint256 indexed alertId);

    // ──────────────────────────────────────────────
    // Modifiers — consolidated existence checks
    // ──────────────────────────────────────────────

    modifier validCatalog(uint256 id) {
        if (id == 0 || id > catalogCounter) revert CatalogNotFound();
        _;
    }

    modifier validProduct(uint256 id) {
        if (id == 0 || id > productCounter) revert ProductNotFound();
        _;
    }

    modifier validAlert(uint256 id) {
        if (id == 0 || id > alertCounter) revert AlertNotFound();
        _;
    }

    // ──────────────────────────────────────────────
    // Input validation helpers (SC-03)
    // ──────────────────────────────────────────────

    function _vName(string memory s) private pure {
        uint256 len = bytes(s).length;
        if (len == 0 || len > MAX_NAME) revert NameTooLong();
    }

    function _vDesc(string memory s) private pure {
        if (bytes(s).length > MAX_DESC) revert DescTooLong();
    }

    function _vMeta(string memory s) private pure {
        if (bytes(s).length > MAX_META) revert MetaTooLong();
    }

    function _vQr(string memory s) private pure {
        if (bytes(s).length > MAX_QR) revert QrTooLong();
    }

    // ──────────────────────────────────────────────
    // Constructor (SC-02)
    // ──────────────────────────────────────────────

    constructor(
        string memory _name,
        string memory _desc,
        string memory _meta,
        string memory _qr
    ) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(OPERATOR_ROLE, msg.sender);

        _vName(_name);
        _vDesc(_desc);
        _vMeta(_meta);
        _vQr(_qr);

        catalogCounter++;
        Catalog storage c = catalogs[catalogCounter];
        c.catalogId = catalogCounter;
        c.catalogName = _name;
        c.catalogDescription = _desc;
        c.creationDate = block.timestamp;
        c.lastModifiedAt = block.timestamp;
        c.productIds = new uint256[](0);
        c.catalogMetadata = _meta;
        c.qrCode = _qr;

        emit CatalogCreated(catalogCounter, msg.sender, _name);
    }

    // ──────────────────────────────────────────────
    // Write functions
    // ──────────────────────────────────────────────

    function createCatalog(
        string memory _name,
        string memory _desc,
        string memory _meta,
        string memory _qr
    ) public onlyRole(DEFAULT_ADMIN_ROLE) nonReentrant returns (uint256) {
        _vName(_name);
        _vDesc(_desc);
        _vMeta(_meta);
        _vQr(_qr);

        catalogCounter++;
        Catalog storage c = catalogs[catalogCounter];
        c.catalogId = catalogCounter;
        c.catalogName = _name;
        c.catalogDescription = _desc;
        c.creationDate = block.timestamp;
        c.lastModifiedAt = block.timestamp;
        c.productIds = new uint256[](0);
        c.catalogMetadata = _meta;
        c.qrCode = _qr;

        emit CatalogCreated(catalogCounter, msg.sender, _name);
        return catalogCounter;
    }

    function addProductToCatalog(
        uint256 _catalogId,
        uint256 _productId
    ) public onlyRole(OPERATOR_ROLE) nonReentrant validCatalog(_catalogId) validProduct(_productId) {
        catalogs[_catalogId].productIds.push(_productId);
        catalogs[_catalogId].lastModifiedAt = block.timestamp;
    }

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
    ) public onlyRole(OPERATOR_ROLE) nonReentrant validCatalog(_catalogId) returns (uint256) {
        _vName(_productName);
        _vDesc(_productDescription);
        _vName(_manufacturer);
        _vName(_batchNumber);
        _vName(_productionLocation);
        _vMeta(_metadataProducto);
        _vQr(_productQrCode);

        productCounter++;
        uint256 pid = productCounter;

        Product storage p = products[pid];
        p.productId = pid;
        p.catalogId = _catalogId;
        p.productName = _productName;
        p.productDescription = _productDescription;
        p.manufacturer = _manufacturer;
        p.manufacturingDate = _manufacturingDate;
        p.batchNumber = _batchNumber;
        p.productionLocation = _productionLocation;
        p.metadataProducto = _metadataProducto;
        p.qrCode = _productQrCode;
        p.lastModifiedAt = block.timestamp;

        p.traceabilityInfo.push(TraceabilityInfo({
            id: 1,
            action: "Producto registrado",
            timestamp: block.timestamp,
            actor: msg.sender,
            actorType: ActorType.Fabricante,
            actorId: "",
            metadataAction: "",
            productId: pid,
            certificationType: "",
            certificationDate: 0,
            certificationResult: ""
        }));

        productStock[pid] = StockInfo(0, 0, 0);
        catalogs[_catalogId].productIds.push(pid);
        catalogs[_catalogId].lastModifiedAt = block.timestamp;

        productIntegrityHashes[pid] = keccak256(
            abi.encodePacked(_productName, _manufacturer, _batchNumber)
        );

        emit ProductAdded(pid, _catalogId, msg.sender, _productName);
        return pid;
    }

    function addTraceabilityInfo(
        uint256 _productId,
        string memory _action,
        address _actor,
        ActorType _actorType,
        string memory _actorId,
        string memory _metadataAction,
        string memory _certificationType,
        uint256 _certificationDate,
        string memory _certificationResult
    ) public onlyRole(OPERATOR_ROLE) nonReentrant validProduct(_productId) returns (uint256) {
        _vName(_action);
        _vMeta(_metadataAction);
        _vName(_certificationType);
        _vMeta(_certificationResult);

        if (_actorType != ActorType.Fabricante &&
            _actorType != ActorType.Distribuidor &&
            _actorType != ActorType.Proveedor) revert InvalidActorType();

        uint256 tid = products[_productId].traceabilityInfo.length;

        products[_productId].traceabilityInfo.push(TraceabilityInfo({
            id: tid,
            action: _action,
            timestamp: block.timestamp,
            actor: _actor,
            actorType: _actorType,
            actorId: _actorId,
            metadataAction: _metadataAction,
            productId: _productId,
            certificationType: _certificationType,
            certificationDate: _certificationDate,
            certificationResult: _certificationResult
        }));

        products[_productId].lastModifiedAt = block.timestamp;

        emit TraceabilityRecorded(_productId, tid, _actor, _actorType, _action);
        return tid;
    }

    function updateProductStock(
        uint256 _productId,
        uint256 _available,
        uint256 _reserved,
        uint256 _total
    ) public onlyRole(OPERATOR_ROLE) nonReentrant validProduct(_productId) {
        productStock[_productId].availableQuantity = _available;
        productStock[_productId].reservedQuantity = _reserved;
        productStock[_productId].totalQuantity = _total;
        emit StockUpdated(_productId, _available, _reserved, _total);
    }

    function associateQrCodeWithCatalog(
        uint256 _catalogId,
        string memory _qrCode
    ) public onlyRole(DEFAULT_ADMIN_ROLE) nonReentrant validCatalog(_catalogId) {
        _vQr(_qrCode);
        catalogs[_catalogId].qrCode = _qrCode;
        catalogs[_catalogId].lastModifiedAt = block.timestamp;
        emit QrCodeAssociated(_catalogId, "catalog", msg.sender);
    }

    function associateQrCodeWithProduct(
        uint256 _productId,
        string memory _qrCode
    ) public onlyRole(DEFAULT_ADMIN_ROLE) nonReentrant validProduct(_productId) {
        _vQr(_qrCode);
        products[_productId].qrCode = _qrCode;
        products[_productId].lastModifiedAt = block.timestamp;
        emit QrCodeAssociated(_productId, "product", msg.sender);
    }

    function generateNotification(
        uint256 _productId,
        string memory _msg
    ) public onlyRole(OPERATOR_ROLE) nonReentrant validProduct(_productId) {
        emit NotificationGenerated(_productId, _msg);
    }

    function reportAlert(
        uint256 _productId,
        uint256 _traceabilityId,
        AlertType _alertType,
        string memory _alertTitle,
        string memory _alertSubtitle,
        string memory _alertDescription,
        string memory _alertParam,
        string memory _conditionalTrigguer
    ) public onlyRole(OPERATOR_ROLE) nonReentrant validProduct(_productId) returns (uint256) {
        _vName(_alertTitle);
        _vDesc(_alertDescription);

        alertCounter++;
        uint256 aid = alertCounter;

        alerts[aid] = Alert({
            alertId: aid,
            productId: _productId,
            traceabilityId: _traceabilityId,
            alertType: _alertType,
            alertTitle: _alertTitle,
            alertSubtitle: _alertSubtitle,
            alertDescription: _alertDescription,
            alertParam: _alertParam,
            conditionalTrigguer: _conditionalTrigguer,
            reportedBy: msg.sender,
            resolved: false,
            createdAt: block.timestamp
        });

        emit AlertReported(aid, _productId, _traceabilityId, _alertType, _alertTitle, _alertSubtitle, _alertDescription, _alertParam, _conditionalTrigguer, msg.sender);
        return aid;
    }

    function resolveAlert(uint256 _alertId) public nonReentrant validAlert(_alertId) {
        if (alerts[_alertId].resolved) revert AlertAlreadyResolved();
        if (msg.sender != alerts[_alertId].reportedBy && !hasRole(DEFAULT_ADMIN_ROLE, msg.sender))
            revert NotReporterOrAdmin();

        alerts[_alertId].resolved = true;
        emit AlertResolved(_alertId);
    }

    // ──────────────────────────────────────────────
    // Read functions
    // ──────────────────────────────────────────────

    function getCatalog(uint256 _id) public view validCatalog(_id) returns (Catalog memory) {
        return catalogs[_id];
    }

    function getCatalogProducts(uint256 _id) public view validCatalog(_id) returns (uint256[] memory) {
        return catalogs[_id].productIds;
    }

    function getProduct(uint256 _id) public view validProduct(_id) returns (Product memory) {
        return products[_id];
    }

    function getProductStock(uint256 _id) public view validProduct(_id) returns (StockInfo memory) {
        return productStock[_id];
    }

    function getProductTraceabilityInfo(uint256 _id) public view validProduct(_id) returns (TraceabilityInfo[] memory) {
        return products[_id].traceabilityInfo;
    }

    function getAlert(uint256 _id) public view validAlert(_id) returns (Alert memory) {
        return alerts[_id];
    }

    function getContractCatalogs() public view returns (Catalog[] memory) {
        uint256 total = catalogCounter > 100 ? 100 : catalogCounter;
        Catalog[] memory result = new Catalog[](total);
        for (uint256 i = 1; i <= total; i++) {
            result[i - 1] = catalogs[i];
        }
        return result;
    }

    function getCatalogsPaginated(uint256 offset, uint256 limit) public view returns (Catalog[] memory) {
        if (offset == 0) revert InvalidOffset();
        if (limit > MAX_PAGE) limit = MAX_PAGE;
        if (offset > catalogCounter) return new Catalog[](0);

        uint256 end = offset + limit - 1;
        if (end > catalogCounter) end = catalogCounter;
        uint256 count = end - offset + 1;

        Catalog[] memory result = new Catalog[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = catalogs[offset + i];
        }
        return result;
    }

    function getAllAlerts() public view returns (Alert[] memory) {
        uint256 total = alertCounter > 100 ? 100 : alertCounter;
        Alert[] memory result = new Alert[](total);
        for (uint256 i = 1; i <= total; i++) {
            result[i - 1] = alerts[i];
        }
        return result;
    }

    function getAlertsPaginated(uint256 offset, uint256 limit) public view returns (Alert[] memory) {
        if (offset == 0) revert InvalidOffset();
        if (limit > MAX_PAGE) limit = MAX_PAGE;
        if (offset > alertCounter) return new Alert[](0);

        uint256 end = offset + limit - 1;
        if (end > alertCounter) end = alertCounter;
        uint256 count = end - offset + 1;

        Alert[] memory result = new Alert[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = alerts[offset + i];
        }
        return result;
    }

    // ──────────────────────────────────────────────
    // Integrity verification (SC-19)
    // ──────────────────────────────────────────────

    function verifyProductIntegrity(
        uint256 _productId, bytes32 _expectedHash
    ) public view validProduct(_productId) returns (bool) {
        return productIntegrityHashes[_productId] == _expectedHash;
    }

    function getProductIntegrityHash(
        uint256 _productId
    ) public view validProduct(_productId) returns (bytes32) {
        return productIntegrityHashes[_productId];
    }

    function supportsInterface(bytes4 interfaceId) public view override(AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
