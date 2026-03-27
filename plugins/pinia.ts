import { useWalletStore } from '~/stores'
import { useSmartContract } from '~/stores/smart-contract'

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      wallet: useWalletStore($pinia),
      contract: useSmartContract($pinia)
    }
  }
})
