import sdk from "@/services/thridWeb/sdkPrivateInstance.js";
import { IMPLEMENTATION_CONTRACT_ADDRESS } from "@/data/contractVariables"; // "{{implementation_contract_address}}"
import implementationAbi from "@/services/thridWeb/implementationAbi.json";
import type { Catalog } from "@/schemas/index";

// import sdk from "./sdkInstance"
// const config = useRuntimeConfig();
// const BuiltInContract = {
//     name: "My Contract",
//     primary_sale_recipient: "{{wallet_address}}",
//     voting_token_address: "{{wallet_address}}", // Only used for Vote
// };
// let contract: any;

let txResult: any;

const deployContract = async (initializerArgs: Catalog) => {
  try {
    // contract = await sdk.deployer.deployBuiltInContract("{{contract-type}}", BuiltInContract);
    console.log("initializerArgs", initializerArgs);
    const { catalogName, catalogDescription, catalogMetadata } =
      initializerArgs;
    const sendCatalog = [catalogName, catalogDescription, catalogMetadata];
    txResult = await sdk.deployer.deployProxy(
      IMPLEMENTATION_CONTRACT_ADDRESS,
      implementationAbi,
      "createCatalog",
      sendCatalog
    );
    console.log("txResult", txResult);
    return txResult;
  } catch (error: any) {
    console.log("deployContract", error);
    throw new Error("No fue posible desplegar este contrato", error);
  }
};

export { deployContract };
