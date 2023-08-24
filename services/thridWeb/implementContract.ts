import { deploy } from './ethers-lib'

(async () => {
    try {
        // const result = await deploy('Products', [Product])
        const result = await deploy('Catalogs', [])
        console.log(`address: ${result.address}`)
    } catch (e) {
        console.log(e.message)
    }
  })()