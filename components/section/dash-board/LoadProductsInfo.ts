
import { ref } from "vue";
import { getProduct } from "@/services/thridWeb/contractReadInteract";
import { useSmartContract } from '@/stores/smart-contract'
import { storeToRefs } from 'pinia'

const PRODUCT_ID = ref(1);
let LOAD_PRODUCT = ref(true);

const LoadProductsInfo = async () => {
    const store = useSmartContract()
    const { hasContract } = storeToRefs(store) 
    const { setProductsInfo } = store

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

export default LoadProductsInfo