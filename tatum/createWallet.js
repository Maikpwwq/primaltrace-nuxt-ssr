import fetch from 'node-fetch';

async function run() {
  const resp = await fetch(
    `https://api.tatum.io/v3/polygon/wallet`,
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