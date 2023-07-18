import fetch from 'node-fetch';

async function run() {
  const xpub = 'YOUR_xpub_PARAMETER';
  const index = 'YOUR_index_PARAMETER';
  const resp = await fetch(
    `https://api.tatum.io/v3/polygon/address/${xpub}/${index}`,
    {
      method: 'GET',
      headers: {
        'x-api-key': 'YOUR_API_KEY_HERE'
      }
    }
  );

  const data = await resp.text();
  console.log(data);
}

// run();