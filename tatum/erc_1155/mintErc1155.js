import fetch from 'node-fetch';

async function run() {
  const resp = await fetch(
    `https://api.tatum.io/v3/multitoken/mint`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'YOUR_API_KEY_HERE'
      },
      body: JSON.stringify({
        chain: 'ETH',
        tokenId: '100000',
        to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
        contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
        amount: '100000',
        fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2'
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

// run();