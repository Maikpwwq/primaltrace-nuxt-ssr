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
    <div id="display-wallet" class="wallet-navigation">
        <v-row justify="center" align="center" class="mt-3 wallet-row">
            <v-col cols="12" class="d-flex flex-column align-center">
                <!-- Logo -->
                <img :src="IsoLogoZkevm" class="zkevm-logo mb-4" alt="Polygon zkEVM" />

                <!-- State: No Provider — Install wallet buttons -->
                <div v-if="!hasProvider" class="wallet-actions">
                    <v-btn
                        href="https://metamask.io"
                        target="_blank"
                        rel="noreferrer"
                        size="large"
                        class="wallet-install-btn metamask-btn"
                        flat
                    >
                        <!-- MetaMask Fox SVG -->
                        <svg class="wallet-icon" viewBox="0 0 35 33" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32.96 1l-13.14 9.72 2.45-5.73L32.96 1z" fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.66 1l13.02 9.82L13.35 4.99 2.66 1z" fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M28.23 23.53l-3.5 5.34 7.49 2.06 2.14-7.28-6.13-.12zM.51 23.65l2.13 7.28 7.47-2.06-3.48-5.34-6.12.12z" fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.72 14.51l-2.09 3.17 7.44.34-.26-8-5.09 4.49zM25.9 14.51l-5.17-4.58-.17 8.09 7.44-.34-2.1-3.17z" fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10.11 28.87l4.49-2.16-3.88-3.03-.61 5.19zM21.02 26.71l4.49 2.16-.6-5.19-3.89 3.03z" fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Instalar MetaMask
                    </v-btn>

                    <v-btn
                        href="https://safepal.com"
                        target="_blank"
                        rel="noreferrer"
                        size="large"
                        class="wallet-install-btn safepal-btn"
                        flat
                    >
                        <!-- SafePal Shield SVG -->
                        <svg class="wallet-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 2L4 7v9c0 8.28 5.12 16.02 12 18 6.88-1.98 12-9.72 12-18V7L16 2z" fill="#4A56E2"/>
                            <path d="M16 6l-8 3.5v6.5c0 5.8 3.58 11.2 8 12.6V6z" fill="#6C78FF"/>
                            <text x="16" y="22" text-anchor="middle" fill="white" font-size="12" font-weight="bold">S</text>
                        </svg>
                        Instalar SafePal
                    </v-btn>
                </div>

                <!-- State: Provider exists but not connected -->
                <div v-if="hasProvider && wallet.accounts.length < 1" class="wallet-actions">
                    <v-btn
                        size="large"
                        class="connect-btn"
                        flat
                        :disabled="isConnecting"
                        @click="handleConnect"
                    >
                        <svg class="wallet-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 6v3"/>
                        </svg>
                        Conectar Wallet
                    </v-btn>
                </div>

                <!-- State: Connected — Show address -->
                <div v-if="hasProvider && wallet.accounts.length > 0" class="wallet-actions">
                    <v-btn
                        :href="etherScan"
                        target="_blank"
                        rel="noreferrer"
                        size="large"
                        class="address-btn"
                        flat
                    >
                        <svg class="wallet-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                        </svg>
                        {{ formatAddress(wallet.accounts[0]) }}
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped>
.wallet-navigation {
    width: 100%;
}

.wallet-row {
    padding: 0.5rem 1rem;
}

.zkevm-logo {
    height: 36px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
}

.wallet-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 500px;
}

.wallet-icon {
    width: 22px;
    height: 22px;
    margin-right: 8px;
    flex-shrink: 0;
}

/* Install wallet buttons */
.wallet-install-btn {
    text-transform: none !important;
    font-weight: 600;
    letter-spacing: 0.01em;
    border-radius: 12px !important;
    padding: 12px 24px !important;
    min-width: 200px;
    height: auto !important;
    transition: all 0.2s ease;
}

.metamask-btn {
    background: linear-gradient(135deg, #f6851b 0%, #e2761b 100%) !important;
    color: white !important;
}

.metamask-btn:hover {
    box-shadow: 0 4px 16px rgba(226, 118, 27, 0.4);
    transform: translateY(-1px);
}

.safepal-btn {
    background: linear-gradient(135deg, #6C78FF 0%, #4A56E2 100%) !important;
    color: white !important;
}

.safepal-btn:hover {
    box-shadow: 0 4px 16px rgba(74, 86, 226, 0.4);
    transform: translateY(-1px);
}

/* Connect wallet button */
.connect-btn {
    text-transform: none !important;
    font-weight: 600;
    letter-spacing: 0.01em;
    border-radius: 12px !important;
    padding: 12px 32px !important;
    min-width: 220px;
    height: auto !important;
    background-color: white !important;
    color: #1a1a2e !important;
    transition: all 0.2s ease;
}

.connect-btn:hover {
    box-shadow: 0 4px 16px rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
}

/* Address button */
.address-btn {
    text-transform: none !important;
    font-weight: 500;
    font-family: 'Roboto Mono', monospace;
    letter-spacing: 0.03em;
    border-radius: 12px !important;
    padding: 0 24px !important;
    background: rgba(255, 255, 255, 0.15) !important;
    color: white !important;
    border: 1px solid rgba(255, 255, 255, 0.25) !important;
    backdrop-filter: blur(8px);
    transition: all 0.2s ease;
}

.address-btn:hover {
    background: rgba(255, 255, 255, 0.25) !important;
    box-shadow: 0 4px 16px rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
}

/* Responsive */
@media (max-width: 600px) {
    .wallet-actions {
        flex-direction: column;
        gap: 8px;
    }

    .wallet-install-btn,
    .connect-btn,
    .address-btn {
        width: 100%;
        min-width: unset;
    }

    .zkevm-logo {
        height: 28px;
    }
}
</style>