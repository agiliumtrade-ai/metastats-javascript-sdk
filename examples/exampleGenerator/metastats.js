let MetaStats = require('metaapi.cloud-sdk').MetaStats;
let MetaApi = require('metaapi.cloud-sdk').default;

// your MetaApi API token
let token = process.env.TOKEN || '<put in your token here>';
// your MetaApi account id
let accountId = process.env.ACCOUNT_ID || '<put in your MetaApi account id here>';

const api = new MetaApi(token);
const metaStats = new MetaStats(token);
// you can configure http client via second parameter,
// see esdoc in-code documentation for full definition of possible configuration options

async function getAccountMetrics() {
  try {
    let account = await api.metatraderAccountApi.getAccount(accountId);

    // wait until account is deployed and connected to broker
    console.log('Deploying account');
    if (account.state !== 'DEPLOYED') {
      await account.deploy();
    } else {
      console.log('Account already deployed');
    }
    console.log('Waiting for API server to connect to broker (may take couple of minutes)');
    if (account.connectionStatus !== 'CONNECTED') {
      await account.waitConnected();
    }

    let metrics = await metaStats.getMetrics(accountId);
    console.log(metrics);//-> {trades: ..., balance: ..., ...}

  } catch (err) {
    console.error(err);
  }
  process.exit();
}

getAccountMetrics();
