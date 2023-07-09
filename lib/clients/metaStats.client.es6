'use strict';

/**
 * metaapi.cloud MetaStats MetaTrader API client
 */
export default class MetaStatsClient {

  /**
   * Constructs MetaStats API client instance
   * @param {DomainClient} domainClient domain client
   */
  constructor(domainClient) {
    this._domainClient = domainClient;
  }

  /**
   * @typedef {Object} CurrencySummaryHistoryDayMetrics profit from trading a currency pair in one trading day
   * @property {String} date date of trading day, in broker timezone, YYYY-MM-DD format
   * @property {Number} totalProfit total profit at the end of the day
   * @property {Number} [totalPips] total pips of trading day
   * @property {Number} [shortProfit] total profit of short trades per day
   * @property {Number} [longProfit] total profit of long trades per day
   * @property {Number} [shortPips] total pips of short trades per day
   * @property {Number} [longPips] total pips of long trades per day
   */

  /**
   * @typedef {Object} CurrencySummaryTotalMetrics provides general data of this currency trading
   * @property {Number} profit cumulative profit of this currency trading
   * @property {Number} trades the number of all trades with this currency
   * @property {Number} [pips] cumulative pips of this currency trading
   * @property {Number} [wonTrades] the number of winning trades with this currency
   * @property {Number} [lostTrades] the number of losing trades with this currency
   * @property {Number} [wonTradesPercent] percentage of winning trades with this currency
   * @property {Number} [lostTradesPercent] percentage of losing trades with this currency
   */

  /**
   * @typedef {Object} CurrencySummaryTradeMetrics provides profit and number of trades in specific trade and currency
   * @property {Number} profit cumulative profit of this currency trading
   * @property {Number} trades the number of all trades with this currency
   * @property {Number} [pips] cumulative pips of this currency trading
   */

  /**
   * @typedef {Object} CurrencySummaryMetrics provides statistics on winning and losing trades indicating
   * the amount in the context of long and short positions.
   * Statistics is given for all currency pairs, for which positions were opened
   * @property {String} currency trading currency pair
   * @property {Array<CurrencySummaryHistoryDayMetrics>} history history of trading a currency pair per trading days
   * @property {CurrencySummaryTotalMetrics} total general data (such as profit, number of trades)
   * about trading a specific currency pair
   * @property {CurrencySummaryTradeMetrics} [short] profit and number of trades of short trades in a specific currency
   * @property {CurrencySummaryTradeMetrics} [long] profit and number of trades of long trades in a specific currency
   */

  /**
   * @typedef {Object} PeriodMetrics provides statistics for one trade period compared to
   * the results for the previous period
   * @property {Number} [profit] cumulative profit of this period
   * @property {Number} [pips] cumulative pips of this period
   * @property {Number} [lots] cumulative lots of this period
   * @property {Number} [gain] gain of this period
   * @property {Number} [trades] the number of trades of this period
   * @property {Number} [wonTradesPercent] percentage of winning trades of this period
   * @property {Number} [profitDifference] difference in profit with the previous period
   * @property {Number} [pipsDifference] difference in pips with the previous period
   * @property {Number} [lotsDifference] difference in lots with the previous period
   * @property {Number} [gainDifference] difference in gain with the previous period
   * @property {Number} [tradesDifference] difference in the number of trades with the previous period
   * @property {Number} [wonTradesPercentDifference] difference in percentage of winning trades with the previous period
   */

  /**
   * @typedef {Object} Periods provides statistics for today, this week, this month, this year
   * @property {PeriodMetrics} [today] trade information for today
   * @property {PeriodMetrics} [thisWeek] trade information for this week
   * @property {PeriodMetrics} [thisMonth] trade information for this month
   * @property {PeriodMetrics} [thisYear] trade information for this year
   */

  /**
   * @typedef {Object} DailyGrowthMetrics provides each profit received from the volume of trade and changes in
   * balance, total accumulated income and existing account drawdown by day
   * @property {String} date date of trading day in broker timezone, YYYY-MM-DD format
   * @property {Number} [profit] cumulative profit per day
   * @property {Number} [pips] cumulative pips per day
   * @property {Number} [lots] cumulative lots per day
   * @property {Number} [gains] cumulative gains per day
   * @property {Number} totalProfit total profit in this day end
   * @property {Number} totalGains total gains in this day end
   * @property {Number} balance balance in this day end
   * @property {Number} [drawdownPercentage] percentage of balance drawdown in this day end
   * @property {Number} [drawdownProfit] maximum registered balance drawdown in basic currency during this day
   */

  /**
   * @typedef {Object} MonthlyAnalyticCurrencyMetrics currency pair trading information for monthly analysis
   * @property {String} currency currency pair
   * @property {Number} [averageHoldingTimeLongsInMilliseconds] average holding time of long trades
   * @property {Number} [averageHoldingTimeShortsInMilliseconds] average holding time of short trades
   * @property {Number} rewardToRiskRatio the difference between reward and risk, where the lesser is always one.
   * So 0 means reward:risk=1:1, 2 means 3:1, -0.5 means 1:1.5
   * @property {Number} popularityPercent the percentage of popularity of this currency this month
   */

  /**
   * @typedef {Object} MonthlyAnalyticsMetrics monthly analysis of trading on this account
   * @property {String} date date of trading month in broker timezone, YYYY-MM format
   * @property {Number} [profit] cumulative profit per month
   * @property {Number} [pips] cumulative pips per month
   * @property {Number} [lots] cumulative lots per month
   * @property {Number} [gains] cumulative gains per month
   * @property {Number} [trades] the number of trades of this month
   * @property {Array<MonthlyAnalyticCurrencyMetrics>} [currencies] list of currency pair trading
   * informations for monthly analysis
   */

  /**
   * @typedef {Object} TradeByTimeMetrics opening/closing deals by days of the week or by by hours of the day
   * @property {String} date date of trading month in broker timezone, YYYY-MM format
   * @property {Number} profit the total profit of the trades at this time
   * @property {Number} [shortProfit] the total profit of short trades at this time
   * @property {Number} [longProfit] the total profit of long trades at this time
   * @property {Number} [wonProfit] the total profit of winning trades at this time
   * @property {Number} [lostProfit] the total profit of losing trades at this time
   * @property {Number} [pips] the total pips of the trades at this time
   * @property {Number} [shortPips] the total pips of short trades at this time
   * @property {Number} [longPips] the total pips of long trades at this time
   * @property {Number} [wonPips] the total pips of winning trades at this time
   * @property {Number} [lostPips] the total pips of losing trades at this time
   * @property {Number} lots cumulative lots of trades at this time
   * @property {Number} gains cumulative gains of trades at this time
   * @property {Number} [shortGains] cumulative gains of short trades at this time
   * @property {Number} [longGains] cumulative gains of long trades at this time
   * @property {Number} [wonGains] cumulative gains of winning trades at this time
   * @property {Number} [lostGains] cumulative gains of losing trades at this time
   * @property {Number} trades the number of all trades at this time
   * @property {Number} [shortTrades] the number of short trades at this time
   * @property {Number} [longTrades] the number of long trades at this time
   * @property {Number} [wonTrades] the number of winning trades at this time
   * @property {Number} [lostTrades] the number of losing trades at this time
   * @property {Number} [shortTradesPercent] percentage of short trades at this time
   * @property {Number} [longTradesPercent] percentage of long trades at this time
   * @property {Number} [wonTradesPercent] percentage of winning trades at this time
   * @property {Number} [lostTradesPercent] percentage of losing trades at this time
   * @property {Number} [hour] day hour (only for by hour case)', within 0-23
   * @property {Number} [day] weekday number (only for by day case), within 0-6
   */

  /**
   * @typedef {Object} RiskOfRuinMetrics risk of ruin of balance metrics
   * @property {Number} lossSize loss size of balance
   * @property {Number} probabilityOfLoss probability of loss shows the risk of losing a particular part of the balance
   * @property {Number} consecutiveLosingTrades the number of losing trades that must be entered sequentially
   * in order for this part of the balance to be lost
   */

  /**
   * @typedef {Object} OneTradeDurationMetrics metrics of one trade duration
   * @property {Array<Number>} gains list of gains for this duration
   * @property {Array<Number>} profits list of profits for this duration
   * @property {Array<Number>} lots list of lots for this duration
   * @property {Array<Number>} [pips] list of pips for this duration
   * @property {Number} durationInMinutes duration of trades in minutes
   */

  /**
   * @typedef {Object} TradeDurationMetrics metrics for each duration of trades
   * @property {Array<OneTradeDurationMetrics>} [won] metrics of winning trades
   * @property {Array<OneTradeDurationMetrics>} [lost] metrics of losing trades
   */

  /**
   * @typedef {Object} TradeDurationDiagramColumnCollectionMetrics collection of metrics of trades
   * in the current column for the diagram
   * @property {Array<Number>} gains list of gains
   * @property {Array<Number>} profits list of profits
   * @property {Array<Number>} lots list of lots
   * @property {Array<Number>} [pips] list of pips
   */

  /**
   * @typedef {Object} TradeDurationDiagramColumnMetrics information column about
   * the duration of trades for the diagram
   * @property {Number} durations the number of durations in this column
   * @property {Number} trades the number of trades in this column
   * @property {String} name name of this column, one of 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months'
   * @property {Number} minDurationInSeconds minimum trade duration in this column in seconds
   * @property {Number} [maxDurationInSeconds] maximum trade duration in this column in seconds
   * @property {TradeDurationDiagramColumnCollectionMetrics} [won] collection of metrics of winning
   * trades in this column
   * @property {TradeDurationDiagramColumnCollectionMetrics} [lost] collection of metrics of losing
   * trades in this column
   */

  /**
   * @typedef {Object} Metrics trading statistics metrics
   * @property {Boolean} [inclusive] indicates whether open positions are included in the metrics,
   * "false" means that there are no open positions. Only for a request with includeOpenPositions=true
   * @property {Number} balance money on the account, not accounting for the results of currently open positions
   * @property {String} [highestBalanceDate] date of maximum balance that have ever been on the account,
   * in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   * @property {Number} [highestBalance] maximum balance that have ever been on the account
   * @property {Number} equity the result (current amount) of all positions, including opened
   * @property {Number} margin current value of margin
   * @property {Number} freeMargin current value of free margin
   * @property {Number} [marginLevel] current value of margin level 
   * @property {Number} trades total number of closed positions on the account
   * @property {Number} [withdrawals] total amount withdrawn from the deposit
   * @property {Number} [averageTradeLengthInMilliseconds] average trade length
   * (time from open to close) in milliseconds
   * @property {Number} [bestTrade] the best profit from one trade that has ever been on the account
   * @property {Number} [worstTrade] the worst profit from one trade that has ever been on the account
   * @property {Number} [bestTradePips] the best pips from one trade that has ever been on the account
   * @property {Number} [worstTradePips] the worst pips from one trade that has ever been on the account
   * @property {String} [bestTradeDate] date of the best profit from one trade that have ever been on the account,
   * in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   * @property {String} [bestTradePipsDate] date of the best pips from one trade that have ever been on the account,
   * in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   * @property {String} [worstTradeDate] date of the worst profit from one trade that have ever been on the account,
   * in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   * @property {String} [worstTradePipsDate] date of the worst pips from one trade that have ever been on the account,
   * in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   * @property {Number} [cagr] compound annual growth rate
   * @property {Number} [commissions] commissions charged by the broker for the entire period
   * @property {Number} [dailyGain] compound daily rate of return
   * @property {Number} [monthlyGain] compound monthly rate of return
   * @property {Number} [equityPercent] percentage of current equity to balance
   * @property {Number} [expectancy] the average expected profitability of one trade in basic currency
   * @property {Number} [expectancyPips] the average expected profitability of one trade in pips
   * @property {Number} [gain] time-weighted rate of return
   * @property {Number} [geometricHoldingPeriodReturn] geometric holding period return
   * @property {Number} [interest] cumulative interest and swap for the entire period
   * @property {Number} [longTrades] the number of long trades
   * @property {Number} [shortTrades] the number of short trades
   * @property {Number} [longWonTrades] the number of long winning trades
   * @property {Number} [shortWonTrades] the number of short winning trades
   * @property {Number} [longWonTradesPercent] percentage of long winning trades
   * @property {Number} [shortWonTradesPercent] percentage of short winning trades
   * @property {Number} [maxDrawdown] percentage of maximum drawdown of balance during the entire trading history
   * @property {Number} [mar] mar ratio
   * @property {Number} [lots] total volume of trades
   * @property {Number} [pips] cumulative price units
   * @property {Number} profit the total yield of closed positions for the entire period (total result)
   * @property {Number} deposits cumulative deposit for the entire period
   * @property {Number} [absoluteGain] simple deposit increase without regard to reinvestment
   * @property {Number} [profitFactor] the amount yielded by winning trades divided by the amount
   * of losses yielded by losing trades. Result in range 0 - Infinity means: `0` - only loss, `1` - profit equals to
   * loss, `Infinity` - only profit.
   * @property {Number} [sharpeRatio] average return earned in excess of the risk-free rate per unit of volatility.
   * It is calculated if there are at least 30 closed deals in the history
   * @property {Number} [sortinoRatio] differentiates harmful volatility from total overall volatility.
   * It is calculated if there are at least 30 closed deals in the history
   * @property {Number} [standardDeviationProfit] statistical measure of volatility shows how much
   * variation or dispersion. It is calculated if there are at least 30 closed deals in the history
   * @property {Number} [kurtosisProfit] a statistical measure that is used to describe profit distribution.
   * It is calculated if there are at least 30 closed deals in the history
   * @property {Number} [averageHoldingPeriodReturn] average holding period return.
   * It is calculated if there are at least 30 closed deals in the history
   * @property {Number} [averageWin] average win in basic currency
   * @property {Number} [averageWinPips] average win in pips
   * @property {Number} [averageLoss] average loss in basic currency
   * @property {Number} [averageLossPips] average loss in pips
   * @property {Number} [wonTradesPercent] percentage of winning trades
   * @property {Number} [lostTradesPercent] percentage of losing trades
   * @property {Number} [zScore] ability of a trading system to generate wins and losses in streaks.
   * It is calculated if there are at least 30 closed deals in the history
   * @property {Number} [probability] probability that a profit will be followed by a profit and a loss by a loss
   * @property {Number} [daysSinceTradingStarted] the number of days that have passed
   * since the opening of the first trade
   * @property {Array<CurrencySummaryMetrics>} [currencySummary] currency trading summary
   * @property {Array<DailyGrowthMetrics>} [dailyGrowth] daily gain shows the change
   * in account profitability on trading days
   * @property {Array<MonthlyAnalyticsMetrics>} [monthlyAnalytics] monthly analysis of trading on this account
   * @property {Array<TradeByTimeMetrics>} [closeTradesByWeekDay] closing deals by days of the week
   * @property {Array<TradeByTimeMetrics>} [openTradesByHour] opening deals by hour of the day
   * @property {Periods} [periods] trading stats for a few periods compared to the results for the previous period
   * @property {Array<RiskOfRuinMetrics>} [riskOfRuin] risk of ruin of balance
   * @property {TradeDurationMetrics} [tradeDuration] metrics for each duration of trades
   * @property {Array<TradeDurationDiagramColumnMetrics>} [tradeDurationDiagram] list of information columns about the
   * duration of trades for the diagram
   * @property {Number} [totalTradeMarketValue] total market value of all trades on the account
   */

  /**
   * Returns metrics of MetaApi account. This API call is billable
   * https://metaapi.cloud/docs/metastats/restApi/api/calculateMetrics/
   * @param {String} accountId MetaApi account id
   * @param {Boolean} [includeOpenPositions] indicates whether open positions will be included
   * in the metrics, default false
   * @return {Metrics} account metrics
   */
  async getMetrics(accountId, includeOpenPositions = false) {

    const getOpts = (host, id) => ({
      url: host + `/users/current/accounts/${id}/metrics`,
      method: 'GET',
      headers: {
        'auth-token': this._domainClient.token
      },
      params: {includeOpenPositions},
      json: true,
    });
  
    const {metrics} = await this._domainClient.requestMetastats(getOpts, accountId);
    return metrics;
  }

  /**
   * @typedef Trade historical trade
   * @property {String} _id historical trade id
   * @property {String} accountId MetaApi account id
   * @property {Number} volume trade volume
   * @property {Number} durationInMinutes trade duration in minutes
   * @property {Number} profit trade profit
   * @property {Number} gain trade gain
   * @property {String} success trade success
   * @property {String} openTime time the trade was opened at in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   * @property {String} type trade type
   * @property {String} [symbol] symbol the trade relates to
   * @property {String} [closeTime] time the trade was closed at in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   * @property {Number} [openPrice] trade opening price
   * @property {Number} [closePrice] trade closing price
   * @property {Number} [pips] the number of pips earned (positive) or lost (negative) in this trade
   * @property {Number} [riskInBalancePercent] trade risk in % of balance
   * @property {Number} [riskInPips] trade risk in pips
   * @property {String} [comment] trade comment
   */

  /**
   * Returns historical trades of MetaApi account
   * https://metaapi.cloud/docs/metastats/restApi/api/getHistoricalTrades/
   * @param {String} accountId MetaApi account id
   * @param {String} startTime start of time range, inclusive
   * @param {String} endTime end of time range, exclusive
   * @param {Boolean} [updateHistory] update historical trades before returning results. 
   * If set to true, the API call will be counted towards billable MetaStats API calls. 
   * If set to false, the API call is not billable. Default is true
   * @param {Number} [limit] pagination limit
   * @param {Number} [offset] pagination offset
   * @param {Number} [marketValue ] trade market value
   * @return {Array<Trade>} account historical trades
   */
  async getAccountTrades(accountId, startTime, endTime, updateHistory = true, limit = 1000, offset = 0) {

    const getOpts = (host, id) => ({
      url: host + `/users/current/accounts/${id}/historical-trades/${startTime}/${endTime}`,
      method: 'GET',
      headers: {
        'auth-token': this._domainClient.token
      },
      params: {updateHistory, limit, offset},
      json: true,
    });

    const {trades} = await this._domainClient.requestMetastats(getOpts, accountId);
    return trades;
  }

  /**
   * @typedef OpenTrade open trade
   * @property {String} _id historical trade id
     @property {String} accountId MetaApi account id
     @property {Number} volume trade volume
     @property {Number} durationInMinutes trade duration in minutes
     @property {Number} profit trade profit
     @property {Number} gain trade gain
     @property {String} success trade success
     @property {String} openTime time the trade was opened at in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
     @property {String} type trade type
     @property {String} symbol symbol the trade relates to
     @property {Number} openPrice trade opening price
     @property {Number} pips the number of pips earned (positive) or lost (negative) in this trade
   * @property {Number} [riskInBalancePercent] trade risk in % of balance
   * @property {Number} [riskInPips] trade risk in pips
   * @property {String} [comment] trade comment
   */

  /**
   * Returns open trades of MetaApi account. This API call is not billable
   * https://metaapi.cloud/docs/metastats/restApi/api/getOpenTrades/
   * @param {String} accountId MetaApi account id
   * @param {Number} [marketValue ] trade market value
   * @return {Array<OpenTrade>} account historical trades
   */
  async getAccountOpenTrades(accountId) {

    const getOpts = (host, id) => ({
      url: host + `/users/current/accounts/${id}/open-trades`,
      method: 'GET',
      headers: {
        'auth-token': this._domainClient.token
      },
      json: true,
    });

    const {openTrades} = await this._domainClient.requestMetastats(getOpts, accountId);
    return openTrades;
  }
}
