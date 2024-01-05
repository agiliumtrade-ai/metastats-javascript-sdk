4.0.0
  - increment version for synchronization with Python SDK version

3.5.6
  - fix TS declarations

3.5.5
  - fix docs

3.5.4
  - fix docs and package.json

3.5.3
  - fix docs and package.json

3.5.2
  - added the request URL to the error log
  - fixed tests for the httpClient

3.5.1
  - refactored file structure for backward compatibility
  - fixed support for Node.js v13.x.x
  - fixed build for Node.js v11.x.x.

3.5.0
  - refactored build to support ESM, UMD, CJS

3.4.1
  - update package info

3.4.0
  - added totalTradeMarketValue metric
  - added marketValue metric to trades and open trades

3.3.1
  - added rolling over to the first region if requests on all regions failed

3.3.0
  - fix balance metric
  - added comment parameter to trades and open trades

3.2.1
  - fix faq url

3.2.0
  - added riskInBalancePercent metric to trades and open trades
  - added riskInPips metric to trades and open trades

3.1.2
  - added references to MT manager api and risk management api

3.1.1
  - fix domain client

3.1.0
  - added region support

3.0.1
  - fix broken release

3.0.0
  - breaking change: changed default value for updateHistory parameter getAccountTrades method
  - breaking change: updated typescript types

2.0.5
  - fixed export declared types in typings

2.0.4
  - improved readme and examples

2.0.3
  - fixed missing typings for browser frameworks

2.0.2
  - fixed missing typings from previous release

2.0.1
  - added typings for public classes and objects

2.0.0
  - breaking change: the order of arguments for the getAccountTrades method have changed
  - added query parameter updateHistory to getAccountTrades method

1.1.0
  - added getAccountTrades method
  - added getAccountOpenTrades method
  - added freeMargin metric
  - added margin metric
  - added marginLevel metric
  - added cagr metric
  - added mar metric

1.0.3
  - documentation clarifications for some metrics

1.0.0
  - Implemented MetaStats SDK
