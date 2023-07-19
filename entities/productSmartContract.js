// Filename: productSmartContract.js pnpm i @arcblock/forge-sdk

const { deployContract, sendTransaction } = require("@arcblock/forge-sdk");
const { Products } = require("./smart-contracts/Products.sol");

// Aquí copia y pega el contrato inteligente actualizado aquí
const productContract = `
  ${Products}
`;

(async function () {
  try {
    // Deploy the contract
    const hash = await deployContract({
      code: productContract,
    });
    console.log("Contract deployed successfully!");
    console.log("Contract address:", hash);

    // Send a transaction to add a product (You can modify this part to call other functions)
    const txHash = await sendTransaction({
      from: "your_wallet_address",
      nonce: "0", // Use the correct nonce value based on your wallet address
      pk: "your_wallet_private_key",
      code: productContract,
      itx: {
        func: "addProduct",
        args: [
          // Provide the arguments for the addProduct function here (productName, productDescription, etc.)
          // Example:
          // 'My Product',
          // 'Product Description',
          // 'Manufacturer',
          // Date.UTC(2023, 0, 1),
          // 'Batch123',
          // 'Production Location',
          // 'Product Metadata URL',
        ],
      },
    });
    console.log("Transaction sent successfully!");
    console.log("Transaction hash:", txHash);
  } catch (error) {
    console.error("Error:", error);
  }
})();
