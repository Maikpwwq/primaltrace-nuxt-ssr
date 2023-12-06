<script lang="ts">
import { ref } from "vue";
import { getProductTraceabilityInfo } from "@/services/thridWeb/contractReadInteract";
import { useSmartContract } from "@/store/smart-contract";
import { storeToRefs } from "pinia";

const storeContract = useSmartContract();
// but skip any action or non reactive (non ref/reactive) property
const {
  contract,
  contractInfo,
  hasContract,
  error,
  errorMessage,
  isConnecting,
} = storeToRefs(storeContract); // Destructuring from a Store
// actions can just be destructured
const {
  setContract,
  setTraceabilityInfo,
  setHasContract,
  setError,
  setErrorMessage,
  setIsConnecting,
  clearError,
  clearContract,
} = storeContract;

const PRODUCT_ID = ref(1);
let LOAD_TRACEABILITY = ref(true);

const LoadRastrosInfo = async () => {
  if (LOAD_TRACEABILITY.value && hasContract.value) {
    try {
      await getProductTraceabilityInfo(PRODUCT_ID.value).then((resp) => {
        // TODO: Puede obtener multiples registros de trazabilidad
        setTraceabilityInfo(resp);
        console.log("getProductTraceabilityInfo", resp[1]);
        LOAD_TRACEABILITY.value = false;
      });
    } catch (err: any) {
      // err.string === "Informción de trazabilidad does not exist"
      console.log(err.reason);
      alert("Esta informción de trazabilidad aun no existe");
      PRODUCT_ID.value = 1;
    }
  }
};

export { LoadRastrosInfo }
</script>
