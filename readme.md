# MetaStats forex metrics API
MetaStats is a fast, cost-efficient, easy to use and standards-driven cloud forex trading statistics API supporting both MetaTrader 4 and MetaTrader 5 platforms designed to boost forex application development process.

Using MetaStats API you can develop applications similar to Myfxbook or MetriX extremely fast, saving time you otherwise spend for coding, optimizing and testing your own trading metrics calculation engine, since we already did it for you.

MetaStats API is a member of MetaApi project ([https://metaapi.cloud](https://metaapi.cloud)), a powerful cloud forex trading API which supports both MetaTrader 4 and MetaTrader 5 platforms.

## MetaStats API features
Features supported:

- support for MetaTrader 4 and MetaTrader 5 platforms
- metrics calculation for MetaTrader accounts added to MetaApi
- optionally include open positions in metrics calculation
- get historical trades for MetaApi account. The historical trades data is updated when you invoke metrics calculation endpoint or when set query parameter updateHistory to true
- get open trades for MetaApi account

The features described above are available for use via a professional, fast, easy to use, standards-driven REST API which can be easily consumed from any programming language.

The primary intended use of MetaStats API is creating trade monitoring applications.

## Pricing
MetaStats is available to all MetaApi users without extra charges at this point.

You pay a fee executing MetaTrader terminal on MetaApi cloud. See [https://metaapi.cloud/#pricing](https://metaapi.cloud/#pricing) for more details.

MetaApi provides a free tier so that you can test our APIs without any charges.

## Frequently asked questions (FAQ)
FAQ is located here: [http://metaapi.cloud/docs/metastats/faq/](http://metaapi.cloud/docs/metastats/faq/)

## REST API documentation
MetaStats SDK is built on top of MetaStats REST API.

MetaStats REST API docs are available at [https://metaapi.cloud/docs/metastats/](https://metaapi.cloud/docs/metastats/)

## Code examples
We published some code examples in our github repository, namely:

- Javascript: [https://github.com/metaapi/metaapi-javascript-sdk/tree/master/examples/node/meta-stats](https://github.com/metaapi/metaapi-javascript-sdk/tree/master/examples/node/meta-stats)

## Installation
```bash
npm install --save metaapi.cloud-sdk
```

## Installing SDK in browser SPA applications
```bash
npm install --save metaapi.cloud-sdk
```

## Installing SDK in browser HTML applications
```html
<script src="unpkg.com/metaapi.cloud-sdk/index.js"></script>
<script>
    const token = '...';
    const metaStats = new MetaStats(token);
</script>
```
## Retrieving API token
Please visit [https://app.metaapi.cloud/token](https://app.metaapi.cloud/token) web UI to obtain your API token.

## Configuring trading statistics
```javascript
import {MetaStats} from 'metaapi.cloud-sdk';

const token = '...';
const metaStats = new MetaStats(token);
```
See esdoc in-code documentation for full definition of possible configuration options.

## Retrieving trading statistics
```javascript
let accountId = '...'; // MetaApi account id

// retrieve MetaApi MetaTrader account statistics
console.log(await metaStats.getMetrics(accountId));

// retrieve MetaApi MetaTrader account statistics including open positions
console.log(await metaStats.getMetrics(accountId, true);

// retrieve MetaApi MetaTrader account trades
console.log(await metaStats.getAccountTrades(accountId, '2020-01-01 00:00:00.000', '2021-01-01 00:00:00.000');

// retrieve MetaApi MetaTrader account open trades
console.log(await metaStats.getAccountOpenTrades(accountId);
```

## Quotas and rate limits
API calls you make are subject to rate limits. See [https://metaapi.cloud/docs/metastats/rateLimiting/](https://metaapi.cloud/docs/metastats/rateLimiting/) for more details.

## Related projects:
See our website for the full list of APIs and features supported [https://metaapi.cloud/#features](https://metaapi.cloud/#features)

Some of the APIs you might decide to use together with this module:

1. MetaApi cloud forex trading API [https://metaapi.cloud/docs/client/](https://metaapi.cloud/docs/client/)
2. CopyFactory copy trading API [https://metaapi.cloud/docs/copyfactory/](https://metaapi.cloud/docs/copyfactory/)
3. MetaTrader account management API [https://metaapi.cloud/docs/provisioning/](https://metaapi.cloud/docs/provisioning/)
4. MetaApi MT manager API [https://metaapi.cloud/docs/manager/](https://metaapi.cloud/docs/manager/>)
5. MetaApi risk management API [https://metaapi.cloud/docs/risk-management/](https://metaapi.cloud/docs/risk-management/>)
