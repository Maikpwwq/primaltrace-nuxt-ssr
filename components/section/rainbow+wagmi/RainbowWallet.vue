<script setup lang="ts">
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import {
//     useAccount,
//     useContractRead,
//     useContractWrite,
//     usePrepareContractWrite,
//     useWaitForTransaction,
// } from "wagmi";
import { connect, getAccount, readContract, writeContract, prepareWriteContract, waitForTransaction, fetchEnsName } from '@wagmi/core'
import tokenContract from "../contracts/contract.json";  // Full artifact import including ABI and bytecode
import extContract from "../contracts/rawABI.json"; // Raw ABI import (pulled from etherscan)
import { InjectedConnector } from '@wagmi/core/connectors/injected'
// import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x3990fabc23d9ac11164624e37141617ad4760e2b";
const contractConfig = {
    address: CONTRACT_ADDRESS,
    //abi: tokenContract.abi,
    abi: extContract,
};

// const { address, isConnected } = getAccount()

// const { account } = await connect({
//     connector: new InjectedConnector(),
// })
// const ensName = await fetchEnsName({ address })

/***************************************************************************** */
// AddProduct Function - with payable option

/** @dev Setup Prepare contract to grab information before button execution
 * The information is "Prepared" before you push the button for execution
 */
const configAddProduct = prepareWriteContract({
    address: CONTRACT_ADDRESS,
    abi: tokenContract.abi,
    functionName: "addProduct",
    args: [],
    // overrides: {
    //   value: ethers.utils.parseEther('0.01'),
    // },
    // onError(error: any) {
    //   console.log("Error", error);
    // },
});

/** @dev Pull the "adminMinter" config from the usePrepareContractWrite hook
 *  Put it into the "mintAdmin" function to execute in the front end
 */
const addProductResponse = await writeContract(configAddProduct);

/* *************************************************************************** */

/***************************************************************************** */
// Read Function
/** @dev Read the total supply of the token
 *  Data is set to "totalSupply" variable
 * NOTE, THERE IS CURRENTLY A CONSOLE BUG WITH THE READ FUNCTION HOOK
 * The isDataEqual option has been deprecated and will be removed in the next release....
 */
const totalSupplyData = readContract({
    ...contractConfig,
    functionName: "totalSupplyData",
});
/* *************************************************************************** */
</script>

<template>
    <div className="flex mb-6">
        <ConnectButton showBalance={false} />
    </div>
</template>