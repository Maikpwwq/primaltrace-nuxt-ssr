<script lang="ts">
import { ref } from "vue";
import { getAlert } from "@/services/thridWeb/contractReadInteract";
import { useSmartContract } from '@/store/smart-contract'
import { storeToRefs } from 'pinia'

const store = useSmartContract()
// but skip any action or non reactive (non ref/reactive) property
const { hasContract } = storeToRefs(store) // Destructuring from a Store 
// actions can just be destructured
const { setAlertsInfo } = store

const PRODUCT_ID = ref(1);
let LOAD_ALERT = ref(true);

const LoadAlerts = async () => {
  if (LOAD_ALERT.value && hasContract.value) {
    try { 
    await getAlert(PRODUCT_ID.value).then((resp: any) => {
      // TODO: Puede obtener multiples alertas
      setAlertsInfo(resp)
      console.log('getAlert', resp)
      LOAD_ALERT.value = false
    })
    } catch (err: any) {
            // err.string === "Catalog does not exist"
            console.log(err.reason)
            alert("Aun no existen alertas")
            PRODUCT_ID.value = 1 
        }
  }
}

export { LoadAlerts }
</script>