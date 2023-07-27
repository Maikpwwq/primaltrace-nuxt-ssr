import { useWalletStore } from '@/store'

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      store: useWalletStore($pinia)
    }
  }
})
