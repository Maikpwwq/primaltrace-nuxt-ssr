<script setup lang="ts">
// Optional install suggestions for users without a wallet
</script>

<template>
  <div class="install-suggestions mt-4">
    <p class="text-white op-7 text-caption mb-2">¿No tienes una billetera?</p>
    <div class="d-flex flex-wrap justify-center ga-2">
      <v-btn
        href="https://metamask.io"
        target="_blank"
        rel="noreferrer"
        size="small"
        class="wallet-install-btn metamask-btn"
        flat
      >
        <img src="/images/logos/wallets/icon-32-metamask.png" alt="MetaMask" class="wallet-icon" />
        MetaMask
      </v-btn>
      <v-btn
        href="https://safepal.com"
        target="_blank"
        rel="noreferrer"
        size="small"
        class="wallet-install-btn safepal-btn"
        flat
      >
        <img src="/images/logos/wallets/sfp4.png" alt="SafePal" class="wallet-icon" />
        SafePal
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
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

/* Responsive */
@media (max-width: 600px) {
    .wallet-install-btn {
        width: 100%;
        min-width: unset;
    }
}
</style>
