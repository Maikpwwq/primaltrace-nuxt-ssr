<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect } from 'vue'
import { formatBalance, formatChainAsNum } from '@/utils'
import detectEthereumProvider from '@metamask/detect-provider'

const initialState = { accounts: [], balance: "", chainId: "" }
const hasProvider = ref(null); // setHasProvider
const wallet = reactive(initialState); // wallet
const isConnecting = ref(false); // setIsConnecting
const error = ref(false); // setError
const errorMessage = ref("");
let provider
// expose to template and other options API hooks
watchEffect(() => {
    const refreshAccounts = (accounts) => {
        if (accounts.length > 0) {
            updateWallet(accounts)
        } else {
            // if length 0, user is disconnected
            wallet.accounts = initialState.accounts
            wallet.balance = initialState.balance
            wallet.chainId = initialState.chainId
        }
    }

    const refreshChain = (chainId) => {
        wallet.chainId = chainId
    }

    const getProvider = async () => {
        provider = await detectEthereumProvider({ silent: true })
        hasProvider.value = provider

        if (provider) {
            const chainId = await provider.request({
                method: 'eth_chainId'
            })
            console.log('Ethereum successfully detected!', chainId)
            // From now on, this should always be true:
            // provider === window.ethereum

            // Access the decentralized web!

            // Legacy providers may only have ethereum.sendAsync
            const accounts = await provider.request(
                { method: 'eth_accounts' }
            )
            refreshAccounts(accounts)
            provider.on('accountsChanged', refreshAccounts)
            provider.on("chainChanged", refreshChain)

        } else {
            // if the provider is not detected, detectEthereumProvider resolves to null
            console.error('Please install MetaMask!', error)
        }
    }

    getProvider()

    return () => {
        provider.removeListener('accountsChanged', refreshAccounts)
        provider.removeListener("chainChanged", refreshChain)
    }
})

const updateWallet = async (accounts) => {
    const balance = formatBalance(await provider.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
    }))
    const chainId = await provider.request({
        method: "eth_chainId",
    })
    wallet.accounts = accounts
    wallet.balance = balance
    wallet.chainId = chainId

}

const handleConnect = async () => {
    isConnecting.value = (true)
    await provider.request({
        method: "eth_requestAccounts",
    })
        .then((accounts) => {
            error.value = (false)
            updateWallet(accounts)
        })
        .catch((err) => {
            error.value = (true)
            errorMessage.value = (err.message)
        })
    isConnecting.value = (false)
}

const disableConnect = wallet && isConnecting.value ? true : false
</script>

<template>
    <div class="connect-wallet">
        <div>Injected Provider {{ hasProvider ? 'DOES' : 'DOES NOT' }} Exist</div>
        <v-btn class="connect-button btn bg-white text-decoration-none text-dark" flat
            v-if="provider?.isMetaMask && wallet.accounts.length < 1" @click="handleConnect" @disabled="disableConnect">
            Connect MetaMask
        </v-btn>
        <!-- v-if="wallet.accounts.length > 0" -->
        <div class="wallet-info">
            <div>Wallet Accounts: {{ wallet.accounts[0] }}</div>
            <div>Wallet Balance: {{ wallet.balance }}</div>
            <div>Hex ChainId: {{ wallet.chainId }}</div>
            <div>Numeric ChainId: {{ formatChainAsNum(wallet.chainId) }}</div>
        </div>

        <div v-if="error" @click="error = false">
            <strong> Error: </strong> {{ errorMessage }}
        </div>
    </div>
</template>

<style>
.connect-wallet {
    display: flex;
    flex-direction: column;
    min-height: fit-content;
    position: relative;
    top: 30px;
}

.connect-wallet:hover .wallet-info {
    visibility: visible !important;
}

.connect-button {
    margin-top: 0.5em;
}

.wallet-info {
    visibility: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: fit-content;
}
</style>