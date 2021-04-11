let MetaStats = require('metaapi-metastats-sdk').default;

// your MetaApi API token
let token = process.env.TOKEN || '<put in your token here>';
// your MetaApi account id
let accountId = process.env.ACCOUNT_ID || '<put in your MetaApi account id here>';

const metaStats = new MetaStats(token);
// you can configure http client via second parameter,
// see esdoc in-code documentation for full definition of possible configuration options

async function getAccountMetrics() {
  try {
    let metrics = await metaStats.getMetrics(accountId);
    console.log(metrics);//-> {trades: ..., balance: ..., ...}

  } catch (err) {
    console.error(err);
  }
  process.exit();
}

getAccountMetrics();
