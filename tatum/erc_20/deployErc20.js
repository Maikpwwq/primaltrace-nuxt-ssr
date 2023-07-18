import fetch from 'node-fetch';

async function run() {
  const resp = await fetch(
    `https://api.tatum.io/v3/blockchain/token/deploy`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'YOUR_API_KEY_HERE'
      },
      body: JSON.stringify({
        chain: 'ETH',
        symbol: 'ERC_SYMBOL',
        name: 'MyERC20',
        supply: '10000000',
        digits: 18,
        address: '0xa0Ca9FF38Bad06eBe64f0fDfF279cAE35129F5C6',
        fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2'
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

// run();