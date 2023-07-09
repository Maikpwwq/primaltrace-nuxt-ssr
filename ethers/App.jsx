import './App.css'
import { useState, useEffect } from 'react'
import { formatBalance, formatChainAsNum } from '@/utils'
import detectEthereumProvider from '@metamask/detect-provider'

const App = () => {
  const [hasProvider, setHasProvider] = useState(null)
  const initialState = { accounts: [], balance: "", chainId: "" }
  const [wallet, setWallet] = useState(initialState)

  const [isConnecting, setIsConnecting] = useState(false)  /* New */
  const [error, setError] = useState(false)                /* New */
  const [errorMessage, setErrorMessage] = useState("")     /* New */

  useEffect(() => {
    const refreshAccounts = (accounts) => {
      if (accounts.length > 0) {
        updateWallet(accounts)
      } else {
        // if length 0, user is disconnected
        setWallet(initialState)
      }
    }

    const refreshChain = (chainId) => {
      setWallet((wallet) => ({ ...wallet, chainId }))
    }

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(provider)

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
      window.ethereum?.removeListener('accountsChanged', refreshAccounts)
      window.ethereum?.removeListener("chainChanged", refreshChain)
    }
  }, [])

  const updateWallet = async (accounts) => {
    const balance = formatBalance(await window.ethereum.request({
      method: "eth_getBalance",
      params: [accounts[0], "latest"],
    }))
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    })
    setWallet({ accounts, balance, chainId })
  }

  const handleConnect = async () => {                   /* Updated */
    setIsConnecting(true)                               /* New */
    await window.ethereum.request({                     /* Updated */
      method: "eth_requestAccounts",
    })
    .then((accounts) => {                            /* New */
      setError(false)                                   /* New */
      updateWallet(accounts)                            /* New */
    })                                                  /* New */
    .catch((err) => {                               /* New */
      setError(true)                                    /* New */
      setErrorMessage(err.message)                      /* New */
    })                                                  /* New */
    setIsConnecting(false)                              /* New */
  }

  const disableConnect = wallet && isConnecting

  return (
    <div className="App">
      <div>Injected Provider {hasProvider ? 'DOES' : 'DOES NOT'} Exist</div>

      {window.ethereum?.isMetaMask && wallet.accounts.length < 1 &&
                /* Updated */
        <button disabled={disableConnect} onClick={handleConnect}>Connect MetaMask</button>
      }

      {wallet.accounts.length > 0 &&
        <>
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
          <div>Wallet Balance: {wallet.balance}</div>
          <div>Hex ChainId: {wallet.chainId}</div>
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
        </>
      }
      { error && (                                        /* New code block */
          <div onClick={() => setError(false)}>
            <strong>Error:</strong> {errorMessage}
          </div>
        )
      }
    </div>
  )
}

export default App