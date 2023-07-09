// import { MetaMaskSDK } from '@metamask/sdk';
// const MMSDK = new MetaMaskSDK(options);

// const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum
// ethereum.request({ method: 'eth_requestAccounts', params: [] });

let signer = null;
let provider;
if (window.ethereum == null) {

    // If MetaMask is not installed, we use the default provider,
    // which is backed by a variety of third-party services (such
    // as INFURA). They do not have private keys installed so are
    // only have read-only access
    console.log("MetaMask not installed; using read-only defaults")
    provider = ethers.getDefaultProvider()

} else {

    // Connect to the MetaMask EIP-1193 object. This is a standard
    // protocol that allows Ethers access to make all read-only
    // requests through MetaMask.
    provider = new ethers.BrowserProvider(window.ethereum)

    // It also provides an opportunity to request access to write
    // operations, which will be performed by the private key
    // that MetaMask manages for the user.
    signer = await provider.getSigner();

    // Look up the current block number (i.e. height)
    // await provider.getBlockNumber()

    // Get the current balance of an account (by address or ENS name)
    balance = await provider.getBalance("ethers.eth")

    // Since the balance is in wei, you may wish to display it
    // in ether instead.
    formatEther(balance)

    // Get the next nonce required to send a transaction
    // await provider.getTransactionCount("ethers.eth")

    // When sending a transaction, the value is in wei, so parseEther
    // converts ether to wei.   
    tx = await signer.sendTransaction({
        to: "ethers.eth",
        value: parseEther("1.0")
    });
    
    // Often you may wish to wait until the transaction is mined
    receipt = await tx.wait();
}