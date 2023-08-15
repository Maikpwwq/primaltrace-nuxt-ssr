import sdk from "@/services/thridWeb/sdkPrivateInstance.js"
import { IMPLEMENTATION_CONTRACT_ADDRESS } from '@/data/contractVariables'; // "{{implementation_contract_address}}"
import implementationAbi from '@/data/implementationAbi.json';

// import sdk from "./sdkInstance"
// const config = useRuntimeConfig();
// const BuiltInContract = {
//     name: "My Contract",
//     primary_sale_recipient: "{{wallet_address}}",
//     voting_token_address: "{{wallet_address}}", // Only used for Vote
// };
// let contract: any;

let txResult: any;

const deployContract = async () => {
    try {
        // contract = await sdk.deployer.deployBuiltInContract("{{contract-type}}", BuiltInContract);
        txResult = await sdk.deployer.deployProxy(
            IMPLEMENTATION_CONTRACT_ADDRESS,
            implementationAbi,
            "initialize",
            [1, 2, 3],
        );
        console.log("txResult", txResult);
    } catch (error: any) {
        console.log("deployContract", error);
    }
};

export {
    deployContract
}