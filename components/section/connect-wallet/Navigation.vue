<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useWalletStore } from "@/stores"
import { formatBalance, formatAddress } from "@/utils";
import detectEthereumProvider from "@metamask/detect-provider";
import { storeToRefs } from 'pinia'
import IsoLogoZkevm from "/images/polygon-zkevm/IsoLogo.svg";
import type { WalletState } from "@/schemas/index"

const store = useWalletStore()
const { wallet, hasProvider, error, errorMessage, isConnecting } = storeToRefs(store)
const { setWallet, setHasProvider, setError, setErrorMessage, setIsConnecting, clearError, clearWallet } = store

let provider: any = null;

const updateWallet = async (accounts?: any) => {
    if (!accounts || accounts.length === 0) {
        clearWallet()
        return
    }

    try {
        const balance = formatBalance(
            await provider.request({
                method: "eth_getBalance",
                params: [accounts[0], "latest"],
            }),
        );

        const chainId = await provider.request({
            method: "eth_chainId",
        });

        const privateKey = "";
        const walletState: WalletState = { accounts, balance, chainId, privateKey };
        setWallet(walletState)
    } catch (err: any) {
        console.error("updateWallet failed:", err);
        setError(true)
        setErrorMessage(err.message || "Failed to update wallet")
    }
};

const handleConnect = async () => {
    setIsConnecting(true)

    try {
        const accounts = await window.ethereum?.request({
            method: 'eth_requestAccounts',
        })
        clearError()
        updateWallet(accounts)
    } catch (err: any) {
        setError(true)
        setErrorMessage(err.message)
    }

    setIsConnecting(false)
};

// Reactive computed properties — re-evaluate when store state changes
const disableConnect = computed(() => {
    return Boolean(wallet.value.accounts.length > 0) || isConnecting.value;
});

const etherScan = computed(() => {
    const account = wallet.value.accounts[0];
    return account ? `https://etherscan.io/address/${account}` : '#';
});

onMounted(async () => {
    try {
        provider = await detectEthereumProvider({ silent: true });
        setHasProvider(Boolean(provider))

        if (provider) {
            const chainId = await provider.request({
                method: "eth_chainId",
            });
            console.log("Ethereum successfully detected!", chainId);

            const accounts = (await provider.request({ method: "eth_accounts" })) || [];
            updateWallet(accounts);

            provider.on("accountsChanged", updateWallet);
            provider.on("chainChanged", updateWallet);
        } else {
            console.error("Please install MetaMask!");
        }
    } catch (err: any) {
        console.error("MetaMask provider detection failed:", err);
        setHasProvider(false)
    }
});

onBeforeUnmount(() => {
    if (provider) {
        provider.removeListener("accountsChanged", updateWallet);
        provider.removeListener("chainChanged", updateWallet);
    }
});
</script>
<template>
    <div id="display-wallet">
        <!-- -----------------------------------------------
            Display Wallet Info
        ----------------------------------------------- -->
        <v-row justify="center" class="mt-3">
            <img :src="IsoLogoZkevm" class="logo-height" alt="logo smartChain polygon Zkevm" />
            <v-col cols="12" md="10" lg="7" sm="6">
                <div class="navigation-wallet">
                    <div class="flexContainer-wallet" v-if="!hasProvider">
                        <a href="https://metamask.io" target="_blank" rel="noreferrer">
                            Instalar MetaMask
                        </a>
                        <a href="https://safepal.com" target="_blank" rel="noreferrer">
                            Instalar SafePal
                        </a>
                    </div>
                    <div class="flexContainer-wallet" v-if="wallet.accounts.length < 1">
                        <!-- window.ethereum?.isMetaMask &&  -->
                        <v-btn class="connect-button btn bg-white text-decoration-none text-dark" flat
                            :disabled="isConnecting" @click="handleConnect" @disabled="disableConnect">
                            Conectar Wallet
                        </v-btn>
                    </div>
                    <div class="flexContainer-wallet" v-if="hasProvider && wallet.accounts.length > 0">
                        <a class="text_link tooltip-bottom" :href="etherScan" target="_blank"
                            data-tooltip="Abrir en el Explorador de bloques" rel="noreferrer">
                            {{ formatAddress(wallet.accounts[0]) }}
                        </a>
                    </div>
                </div>
            </v-col>
        </v-row>
        <!-- -----------------------------------------------
            Display Wallet Info
        ----------------------------------------------- -->
    </div>
</template>
<style>
.connect-button {
    margin-top: 0.5em;
}
.navigation-wallet {
    height: 36px;
    padding: 16px;
    background-color: white;
    color: black;
}
.flexContainer-wallet {
    display: flex;
    align-self: flex-end;
    flex-direction: row;
    min-width: calc(100vw -2em);
    gap: 0em;
    row-gap: 0em;
}
.logo-height {
  height: 33px;
}

</style>