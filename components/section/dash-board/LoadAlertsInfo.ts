
import { ref } from "vue";
import { getAlert } from "@/services/thridWeb/contractReadInteract";
import { useSmartContract } from '@/stores/smart-contract'
import { storeToRefs } from 'pinia'

const PRODUCT_ID = ref(1);
let LOAD_ALERT = ref(true);

const LoadAlerts = async () => {
  const store = useSmartContract()
  const { hasContract } = storeToRefs(store) 
  const { setAlertsInfo } = store

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

