<script setup lang="ts">
import Display from "./Display.vue"
import { storeToRefs } from 'pinia'
import { useWalletStore } from '@/store'
import { useSmartContract } from '@/store/smart-contract'
import { IconCurrencyEthereum } from '@tabler/icons-vue';
import { IconOutbound } from '@tabler/icons-vue';

const store = useWalletStore()
// but skip any action or non reactive (non ref/reactive) property
const { wallet, ethersProvider, web3uth, hasProvider, error, errorMessage, isConnecting } = storeToRefs(store) // Destructuring from a Store 
// actions can just be destructured
const { setWallet, setEthersProvider, setHasProvider, setError, setErrorMessage, setIsConnecting, clearError, clearWallet } = store

const storeContract = useSmartContract()
// but skip any action or non reactive (non ref/reactive) property
// const { contract } = storeToRefs(storeContract) // Destructuring from a Store 
// actions can just be destructured
const { clearContract } = storeContract

const logout = async () => {
    try {
        await web3auth.logout();
        setIsConnecting(false);
        clearWallet()
        clearContract()
        setEthersProvider(null);
        console.log('logout');
    } catch (error: any) {
        console.log("web3authProvider logout", error);
        setError(true)
        setErrorMessage(error.message)
    }
}

</script>

<template>
    <div class="connect-wallet mx-3 flex-md-row flex-sm-column-reverse" v-if="hasProvider && wallet.accounts.length > 0">
        <li class="nav-item">
            <div class="flexContainer-wallet nav-link">
                <IconCurrencyEthereum />
            </div>
        </li>

        <li class="nav-item d-flex align-center">
            <v-btn class="btn v-btn--block text-decoration-none text-white p-3" @click="logout" size="large" style="background-color:#00B0FF"
                flat>
                <IconOutbound /> Cerrar sesión
            </v-btn>
        </li>
        <span class="wallet-info">
            <Display />
        </span>
    </div>
</template>
<style>
.flexContainer-wallet {
    display: flex;
    align-self: center;
    flex-direction: row;
    justify-content: center;
    min-width: calc(100vw -2em);
    gap: 0em;
    row-gap: 0em;
}

.connect-wallet {
    display: flex;
    justify-content: center;
    flex-direction: row;
    min-height: fit-content;
    position: relative;
}

.connect-wallet:hover .wallet-info {
    visibility: visible !important;
}

.wallet-info {
    visibility: hidden;
    display: flex;
    flex-direction: column;
    position: absolute;
    min-height: fit-content;
    top: 48px;
    right: 15px;
}
</style>