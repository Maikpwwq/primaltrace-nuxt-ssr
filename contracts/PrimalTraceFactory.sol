// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Create2.sol";

/**
 * @title PrimalTraceFactory
 * @author NexaSoft SAS — PrimalTrace Team
 * @notice Factory contract for deploying and tracking Catalogs contract instances.
 *         Uses CREATE2 for deterministic addresses and tracks all user deployments.
 *
 * @dev Architecture:
 *   - Each user can deploy multiple Catalogs instances via this factory.
 *   - Deterministic addresses via CREATE2 allow users to predict contract addresses
 *     before deployment (useful for QR code pre-generation).
 *   - Admin can set deployment permissions and tier limits.
 *
 * Phase 2 — Sprint 4 (SC-09)
 */
contract PrimalTraceFactory is AccessControl, ReentrancyGuard {
    // ── Roles ────────────────────────────────────────────────────────────
    bytes32 public constant DEPLOYER_ROLE = keccak256("DEPLOYER_ROLE");

    // ── Events ───────────────────────────────────────────────────────────
    event ContractDeployed(
        address indexed owner,
        address indexed contractAddress,
        string catalogName,
        uint256 timestamp
    );

    event DeploymentLimitUpdated(address indexed user, uint256 newLimit);

    // ── Custom Errors ────────────────────────────────────────────────────
    error EmptyBytecode();
    error DeploymentFailed();
    error DeploymentLimitReached(address user, uint256 limit);
    error InvalidDeploymentLimit();
    error ContractAlreadyDeployed(address predicted);

    // ── Structs ──────────────────────────────────────────────────────────
    struct DeploymentRecord {
        address contractAddress;
        address owner;
        string catalogName;
        uint256 deployedAt;
    }

    // ── State ────────────────────────────────────────────────────────────
    /// @notice Tracks all contract addresses deployed by each user
    mapping(address => address[]) public userContracts;

    /// @notice Detailed deployment records for each contract
    mapping(address => DeploymentRecord) public deployments;

    /// @notice Maximum deployments allowed per user (0 = unlimited for admins)
    mapping(address => uint256) public deploymentLimits;

    /// @notice Default deployment limit for new users (free tier)
    uint256 public defaultDeploymentLimit;

    /// @notice Bytecode of the Catalogs implementation contract
    bytes public catalogsBytecode;

    /// @notice Total number of deployments across all users
    uint256 public totalDeployments;

    // ── Constructor ──────────────────────────────────────────────────────
    /**
     * @param _catalogsBytecode The compiled bytecode of the Catalogs contract
     * @param _defaultLimit Default max deployments per user (free tier)
     */
    constructor(bytes memory _catalogsBytecode, uint256 _defaultLimit) {
        if (_catalogsBytecode.length == 0) revert EmptyBytecode();
        if (_defaultLimit == 0) revert InvalidDeploymentLimit();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DEPLOYER_ROLE, msg.sender);

        catalogsBytecode = _catalogsBytecode;
        defaultDeploymentLimit = _defaultLimit;
    }

    // ── Deploy Functions ─────────────────────────────────────────────────

    /**
     * @notice Deploy a new Catalogs instance with deterministic address via CREATE2
     * @param _name Initial catalog name (passed to Catalogs constructor)
     * @param _description Initial catalog description
     * @param _metadata Initial catalog metadata
     * @param _qrCode Initial catalog QR code
     * @param _salt User-provided salt for deterministic address
     * @return deployed The address of the newly deployed Catalogs contract
     */
    function deployContract(
        string calldata _name,
        string calldata _description,
        string calldata _metadata,
        string calldata _qrCode,
        bytes32 _salt
    ) external nonReentrant returns (address deployed) {
        // Check deployment limits
        uint256 limit = _getDeploymentLimit(msg.sender);
        if (limit > 0 && userContracts[msg.sender].length >= limit) {
            revert DeploymentLimitReached(msg.sender, limit);
        }

        // Encode constructor arguments
        bytes memory constructorArgs = abi.encode(_name, _description, _metadata, _qrCode);
        bytes memory bytecodeWithArgs = abi.encodePacked(catalogsBytecode, constructorArgs);

        // Combine user address with salt for unique deterministic addresses per user
        bytes32 finalSalt = keccak256(abi.encodePacked(msg.sender, _salt));

        // Check if contract already exists at predicted address
        address predicted = Create2.computeAddress(finalSalt, keccak256(bytecodeWithArgs));
        if (predicted.code.length > 0) revert ContractAlreadyDeployed(predicted);

        // Deploy via CREATE2
        deployed = Create2.deploy(0, finalSalt, bytecodeWithArgs);
        if (deployed == address(0)) revert DeploymentFailed();

        // Record deployment
        userContracts[msg.sender].push(deployed);
        deployments[deployed] = DeploymentRecord({
            contractAddress: deployed,
            owner: msg.sender,
            catalogName: _name,
            deployedAt: block.timestamp
        });
        totalDeployments++;

        emit ContractDeployed(msg.sender, deployed, _name, block.timestamp);
    }

    // ── View Functions ───────────────────────────────────────────────────

    /**
     * @notice Predict the address of a contract before deployment
     * @param _deployer The address that will deploy the contract
     * @param _name Catalog name for constructor
     * @param _description Catalog description for constructor
     * @param _metadata Catalog metadata for constructor
     * @param _qrCode Catalog QR code for constructor
     * @param _salt User-provided salt
     * @return predicted The deterministic address
     */
    function predictAddress(
        address _deployer,
        string calldata _name,
        string calldata _description,
        string calldata _metadata,
        string calldata _qrCode,
        bytes32 _salt
    ) external view returns (address predicted) {
        bytes memory constructorArgs = abi.encode(_name, _description, _metadata, _qrCode);
        bytes memory bytecodeWithArgs = abi.encodePacked(catalogsBytecode, constructorArgs);
        bytes32 finalSalt = keccak256(abi.encodePacked(_deployer, _salt));
        predicted = Create2.computeAddress(finalSalt, keccak256(bytecodeWithArgs));
    }

    /**
     * @notice Get all contracts deployed by a specific user
     * @param _user The user's wallet address
     * @return contracts Array of contract addresses
     */
    function getUserContracts(address _user) external view returns (address[] memory contracts) {
        return userContracts[_user];
    }

    /**
     * @notice Get the number of contracts a user has deployed
     * @param _user The user's wallet address
     * @return count Number of deployed contracts
     */
    function getUserContractCount(address _user) external view returns (uint256 count) {
        return userContracts[_user].length;
    }

    /**
     * @notice Get deployment details for a specific contract
     * @param _contract The contract address to query
     * @return record The deployment record
     */
    function getDeploymentRecord(address _contract) external view returns (DeploymentRecord memory record) {
        return deployments[_contract];
    }

    /**
     * @notice Get remaining deployments for a user
     * @param _user The user's wallet address
     * @return remaining Number of deployments the user can still make
     */
    function getRemainingDeployments(address _user) external view returns (uint256 remaining) {
        uint256 limit = _getDeploymentLimit(_user);
        if (limit == 0) return type(uint256).max; // Unlimited
        uint256 used = userContracts[_user].length;
        return used >= limit ? 0 : limit - used;
    }

    // ── Admin Functions ──────────────────────────────────────────────────

    /**
     * @notice Set deployment limit for a specific user (enterprise tier upgrade)
     * @param _user The user's wallet address
     * @param _limit New deployment limit (0 = use default)
     */
    function setDeploymentLimit(address _user, uint256 _limit)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        deploymentLimits[_user] = _limit;
        emit DeploymentLimitUpdated(_user, _limit);
    }

    /**
     * @notice Update the default deployment limit (free tier)
     * @param _limit New default limit
     */
    function setDefaultDeploymentLimit(uint256 _limit)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        if (_limit == 0) revert InvalidDeploymentLimit();
        defaultDeploymentLimit = _limit;
    }

    /**
     * @notice Update the Catalogs implementation bytecode
     * @param _newBytecode New bytecode to use for future deployments
     */
    function updateCatalogsBytecode(bytes calldata _newBytecode)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        if (_newBytecode.length == 0) revert EmptyBytecode();
        catalogsBytecode = _newBytecode;
    }

    // ── Internal ─────────────────────────────────────────────────────────

    function _getDeploymentLimit(address _user) internal view returns (uint256) {
        uint256 custom = deploymentLimits[_user];
        if (custom > 0) return custom;
        if (hasRole(DEFAULT_ADMIN_ROLE, _user)) return 0; // Unlimited for admins
        return defaultDeploymentLimit;
    }
}
