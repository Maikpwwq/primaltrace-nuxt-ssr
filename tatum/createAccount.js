import fetch from "node-fetch";

async function run() {
  const APIKEY2 = `${import.meta.env.VITE_API_KEY_TATUM}`;
  const config = useRuntimeConfig();
  const APIKEY = config.public.apiKeyTatum;
  console.log("VITE_API_KEY_TATUM", APIKEY, APIKEY2);
  //   const resp = await fetch(`https://api.tatum.io/v3/ledger/account`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-api-key": APIKEY,
  //     },
  // body: JSON.stringify({
  //   currency: "MATIC",
  //   xpub: "xpub6Doh6NHQB7Vie2BKWoFi15uQD8mwuvLam6fEgK9ig9QzMm7DEMh82jqYrAmhtSt7RJ45P1x7r5qbq77G8fwH4Gyzsnzx2b63iDa2GytYYk7",
  // }),
  //   });

  //   const data = await resp.json();
  //   console.log(data);
}

// run();
