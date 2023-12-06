<script lang="ts">
import { ref } from "vue";
import { getProduct } from "@/services/thridWeb/contractReadInteract";
import { useSmartContract } from '@/store/smart-contract'
import { storeToRefs } from 'pinia'

const store = useSmartContract()
// but skip any action or non reactive (non ref/reactive) property
const { contract, contractInfo, hasContract, error, errorMessage, isConnecting } = storeToRefs(store) // Destructuring from a Store 
// actions can just be destructured
const { setContract, setProductsInfo, setHasContract, setError, setErrorMessage, setIsConnecting, clearError, clearContract } = store

const PRODUCT_ID = ref(1);
let LOAD_PRODUCT = ref(true);

const LoadProductsInfo = async () => {
  if (LOAD_PRODUCT.value && hasContract.value) {
    try { 
    await getProduct(PRODUCT_ID.value).then((resp) => {
      // TODO: Puede obtener multiples registros de productos
      setProductsInfo(resp)
      console.log('getProduct', resp)
      LOAD_PRODUCT.value = false
    })
    } catch (err: any) {
            // err.string === "Catalog does not exist"
            console.log(err.reason)
            alert("Este catalogo aun no existe")
            PRODUCT_ID.value = 1 
        }
  }
}

export { LoadProductsInfo }
</script>