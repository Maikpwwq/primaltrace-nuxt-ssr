
import { ref } from "vue";
import { getCatalog } from "@/services/thridWeb/contractReadInteract";
import { useSmartContract } from '@/stores/smart-contract'
import { storeToRefs } from 'pinia'
// import type { Catalog } from "@/schemas/index"

const CATALOG_ID = ref(1);
let LOAD_CATALOG = ref(true);

const LoadCatalogsInfo = async () => {
    const store = useSmartContract()
    const { hasContract } = storeToRefs(store) 
    const { setCatalogsInfo } = store

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

export default LoadCatalogsInfo