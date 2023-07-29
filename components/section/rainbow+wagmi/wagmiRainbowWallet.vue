<script setup lang="ts">
import "@rainbow-me/rainbowkit/styles.css";
import { apiProvider, getDefaultWallets, RainbowKitProvider, lightTheme, darkTheme, midnightTheme } from "@rainbow-me/rainbowkit";
// import { chain, configureChains, createClient, WagmiConfig } from "wagmi"; // @wagmi/core
import { createConfig, configureChains, Config } from "@wagmi/core";
import { polygonZkEvmTestnet, polygonZkEvm, mainnet } from '@wagmi/core/chains'
// import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { publicProvider } from "@wagmi/core/providers/public";
// import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc';

const CLOUD_PROJECT_ID = "21f8c5b6495c7781b23bf5920e3e8c30"

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [ polygonZkEvmTestnet ], // chain.polygonZkevm, 
    [
        // jsonRpcProvider({ rpc: () => ({ http: 'https://rpc.ankr.com/eth' }) }),
        // alchemyProvider({ apiKey: your API Here }),
        publicProvider()
        // apiProvider.fallback()
    ]
);

const { connectors } = getDefaultWallets({
    appName: "PrimalTrace",
    projectId: CLOUD_PROJECT_ID,
    chains,
    publicClient,
});

const wagmiClient = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

const themeRainbow = midnightTheme({
    accentColor: '#623485',
    accentColorForeground: 'white',
    borderRadius: 'large',
    fontStack: 'system',
})


</script>

<template>
    <div id="dash-board">
        <div class="mini-spacer">
            <v-container>
                <WagmiConfig :client="wagmiClient">
                    <RainbowKitProvider :chains="chains" :theme="themeRainbow">
                    </RainbowKitProvider>
                </WagmiConfig>
            </v-container>
        </div>
    </div>
</template>

<style>
.logo-white-text {
    height: 133px;
}
</style>
