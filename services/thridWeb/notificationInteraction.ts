const ethers = require('ethers');

// Configura una instancia de proveedor Ethereum
const provider = new ethers.providers.JsonRpcProvider('URL_DEL_NODO_ETHEREUM'); // Reemplaza con la URL de tu nodo Ethereum

// Dirección del contrato y ABI
const contractAddress = 'DIRECCION_DEL_CONTRATO'; // Reemplaza con la dirección de tu contrato
const contractAbi = [...]; // Reemplaza con el ABI de tu contrato

// Crea una instancia de contrato
const contract = new ethers.Contract(contractAddress, contractAbi, provider);

// Escucha el evento NotificationGenerated
contract.on('NotificationGenerated', (productId, notificationMessage) => {
    console.log(`Nueva notificación para el producto ${productId}: ${notificationMessage}`);
    
    // Notifica a las partes interesadas, por ejemplo, mediante una interfaz de usuario
    // Puedes implementar la lógica de notificación deseada aquí
});

// Maneja errores de conexión con el nodo Ethereum
provider.on('error', error => {
    console.error('Error de conexión al nodo Ethereum:', error);
});
