import fetch from "node-fetch";

async function run() {
  const index = 0;
  const mnemonic =
    "urge pulp usage sister evidence arrest palm math please chief egg abuse";
  const resp = await fetch(`https://api.tatum.io/v3/polygon/wallet/priv`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "YOUR_API_KEY_HERE",
    },
    body: JSON.stringify({
      index: index,
      mnemonic: mnemonic,
    }),
  });

  const data = await resp.json();
  console.log(data);
}

// run();
