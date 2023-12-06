<script lang="ts">
import { ref } from "vue";
import { getCatalog } from "@/services/thridWeb/contractReadInteract";
import { useSmartContract } from '@/store/smart-contract'
import { storeToRefs } from 'pinia'
// import type { Catalog } from "@/schemas/index"

const store = useSmartContract()
// but skip any action or non reactive (non ref/reactive) property
const { contract, contractInfo, hasContract, error, errorMessage, isConnecting } = storeToRefs(store) // Destructuring from a Store 
// actions can just be destructured
const { setContract, setCatalogsInfo, setHasContract, setError, setErrorMessage, setIsConnecting, clearError, clearContract } = store

const CATALOG_ID = ref(1);
let LOAD_CATALOG = ref(true);

const LoadCatalogsInfo = async () => {
    if (LOAD_CATALOG.value && hasContract.value) {
        try { 
            await getCatalog(CATALOG_ID.value).then((resp) => {
                // TODO: Puede obtener multiples registros de productos
                setCatalogsInfo(resp)
                console.log('setCatalogs', resp)
                LOAD_CATALOG.value = false
            })
        } catch (err: any) {
            // err.string === "Catalog does not exist"
            console.log(err.reason)
            alert("Este catalogo aun no existe")
            CATALOG_ID.value = 1 
        }
    }
}

export { LoadCatalogsInfo }
</script>