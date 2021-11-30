import HttpClient from "./httpClient";

/**
 * metaapi.cloud MetaStats MetaTrader API client
 */
export default class MetaStatsClient {

  /**
   * Constructs MetaStats API client instance
   * @param {HttpClient} httpClient HTTP client
   * @param {String} token authorization token
   * @param {String} [domain] domain to connect to, default is agiliumtrade.agiliumtrade.ai
   */
  constructor(httpClient: HttpClient, token: String, domain?: String);
  
  /**
   * Returns metrics of MetaApi account. This API call is billable
   * https://metaapi.cloud/docs/metastats/restApi/api/calculateMetrics/
   * @param {String} accountId MetaApi account id
   * @param {Boolean} [includeOpenPositions] indicates whether open positions will be included
   * in the metrics, default false
   * @return {Metrics} account metrics
   */
  getMetrics(accountId: String, includeOpenPositions?: Boolean): Metrics;

  /**
   * Returns historical trades of MetaApi account
   * https://metaapi.cloud/docs/metastats/restApi/api/getHistoricalTrades/
   * @param {String} accountId MetaApi account id
   * @param {String} startTime start of time range, inclusive
   * @param {String} endTime end of time range, exclusive
   * @param {Boolean} [updateHistory] update historical trades before returning results. If set to true, 
   * the API call will be counted towards billable MetaStats API calls. If set to false, the API call is not billable.
   * @param {Number} [limit] pagination limit
   * @param {Number} [offset] pagination offset
   * @return {Array<Trade>} account historical trades
   */
  getAccountTrades(accountId: String, startTime: String, endTime: String, updateHistory?: Boolean, limit?: Number, offset?: Number): Array<Trade>;

  /**
   * Returns open trades of MetaApi account. This API call is not billable
   * https://metaapi.cloud/docs/metastats/restApi/api/getOpenTrades/
   * @param {String} accountId MetaApi account id
   * @return {Array<OpenTrade>} account historical trades
   */
  getAccountOpenTrades(accountId: String): Array<OpenTrade>
}

/**
 * Open trade
 */
export declare type OpenTrade = {

  /**
   * _id historical trade id
   */
  _id: String,

  /**
   * MetaApi account id
   */
  accountId: String,

  /**
   * trade volume
   */
  volume: Number,

  /**
   * trade duration in minutes
   */
  durationInMinutes: Number,

  /**
   * trade profit
   */
  profit: Number,

  /**
   * trade gain
   */
  gain: Number,

  /**
   * trade success
   */
  success: String,

  /**
   * time the trade was opened at in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   */
  openTime: String,

  /**
   * trade type
   */
  type: String,

  /**
   * symbol the trade relates to
   */
  symbol: String,

  /**
   * trade opening price
   */
  openPrice: Number,

  /**
   * the number of pips earned (positive) or lost (negative) in this trade
   */
  pips: Number
}

/**
 * Historical trade
 */
export declare type Trade = {

  /**
   * historical trade id
   */
  _id: String,

  /**
   * MetaApi account id
   */
  accountId: String,

  /**
   * trade volume
   */
  volume: Number,

  /**
   * trade duration in minutes
   */
  durationInMinutes: Number,

  /**
   * trade profit
   */
  profit: Number,

  /**
   * trade gain
   */
  gain: Number,

  /**
   * trade success
   */
  success: String,

  /**
   * time the trade was opened at in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   */
  openTime: String,

  /**
   * trade type
   */
  type: String,

  /**
   * symbol the trade relates to
   */
  symbol?: String,

  /**
   * time the trade was closed at in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   */
  closeTime?: String,

  /**
   * trade opening price
   */
  openPrice?: Number,

  /**
   * trade closing price
   */
  closePrice?: Number,

  /**
   * the number of pips earned (positive) or lost (negative) in this trade
   */
  pips?: Number
}

/**
 * profit from trading a currency pair in one trading day
 */
export declare type CurrencySummaryHistoryDayMetrics = {

  /**
   * date of trading day, in broker timezone, YYYY-MM-DD format
   */
  date: String,

  /**
   * total profit at the end of the day
   */
  totalProfit: Number,

  /**
   * total pips of trading day
   */
  totalPips?: Number,

  /**
   * total profit of short trades per day
   */
  shortProfit?: Number,

  /**
   * total profit of long trades per day
   */
  longProfit?: Number,

  /**
   * total pips of short trades per day
   */
  shortPips?: Number,

  /**
   * total pips of long trades per day
   */
  longPips?: Number
}

/**
 * provides general data of this currency trading
 */
export declare type CurrencySummaryTotalMetrics = {

  /**
   * cumulative profit of this currency trading
   */
  profit: Number,

  /**
   * the number of all trades with this currency
   */
  trades: Number,

  /**
   * cumulative pips of this currency trading
   */
  pips?: Number,

  /**
   * the number of winning trades with this currency
   */
  wonTrades?: Number,

  /**
   * the number of losing trades with this currency
   */
  lostTrades?: Number,

  /**
   * percentage of winning trades with this currency
   */
  wonTradesPercent?: Number,

  /**
   * percentage of losing trades with this currency
   */
  lostTradesPercent?: Number
}

/**
 * provides profit and number of trades in specific trade and currency
 */
export declare type CurrencySummaryTradeMetrics = {

  /**
   * cumulative profit of this currency trading
   */
  profit: Number,

  /**
   * the number of all trades with this currency
   */
  trades: Number,

  /**
   * cumulative pips of this currency trading
   */
  pips?: Number
}

/**
 * provides statistics on winning and losing trades indicating
 * the amount in the context of long and short positions.
 * Statistics is given for all currency pairs, for which positions were opened
 */
export declare type CurrencySummaryMetrics = {

  /**
   * trading currency pair
   */
  currency: String,

  /**
   * history of trading a currency pair per trading days
   */
  history: Array<CurrencySummaryHistoryDayMetrics>,

  /**
   * general data (such as profit, number of trades) about trading a specific currency pair
   */
  total: CurrencySummaryTotalMetrics,

  /**
   * profit and number of trades of short trades in a specific currency
   */
  short?: CurrencySummaryTradeMetrics,

  /**
   * profit and number of trades of long trades in a specific currency
   */
  long?: CurrencySummaryTradeMetrics
}

/**
 * provides statistics for one trade period compared to
 * the results for the previous period
 */
export declare type PeriodMetrics = {

  /**
   * cumulative profit of this period
   */
  profit: Number,

  /**
   * cumulative pips of this period
   */
  pips: Number,

  /**
   * cumulative lots of this period
   */
  lots: Number,

  /**
   * gain of this period
   */
  gain: Number,

  /**
   * the number of trades of this period
   */
  trades: Number,

  /**
   * percentage of winning trades of this period
   */
  wonTradesPercent: Number,

  /**
   * difference in profit with the previous period
   */
  profitDifference: Number,

  /**
   * difference in pips with the previous period
   */
  pipsDifference: Number,

  /**
   * difference in lots with the previous period 
   */
  lotsDifference: Number,

  /**
   * difference in gain with the previous period
   */
  gainDifference: Number,

  /**
   * difference in the number of trades with the previous period
   */
  tradesDifference: Number,

  /**
   * difference in percentage of winning trades with the previous period
   */
  wonTradesPercentDifference: Number
}

/**
 * provides statistics for today, this week, this month, this year
 */
export declare type Periods = {
  
  /**
   * trade information for today
   */
  today?: PeriodMetrics,

  /**
   * trade information for this week
   */
  thisWeek?: PeriodMetrics,

  /**
   * trade information for this month
   */
  thisMonth?: PeriodMetrics,

  /**
   * trade information for this year
   */
  thisYear?: PeriodMetrics,
}

/**
 * provides each profit received from the volume of trade and changes in
 * balance, total accumulated income and existing account drawdown by day
 */
export declare type DailyGrowthMetrics = {

  /**
   * date of trading day in broker timezone, YYYY-MM-DD format
   */
  date: String,

  /**
   * cumulative profit per day
   */
  profit?: Number,

  /**
   * cumulative pips per day
   */
  pips?: Number,

  /**
   * cumulative lots per day
   */
  lots?: Number,

  /**
   * cumulative gains per day
   */
  gains?: Number,

  /**
   * total profit in this day end
   */
  totalProfit: Number,

  /**
   * total gains in this day end
   */
  totalGains: Number,

  /**
   * balance in this day end
   */
  balance: Number,

  /**
   * percentage of balance drawdown in this day end
   */
  drawdownPercentage?: Number,

  /**
   * maximum registered balance drawdown in basic currency during this day
   */
  drawdownProfit?: Number
}

/**
 * currency pair trading information for monthly analysis
 */
export declare type MonthlyAnalyticCurrencyMetrics = {

  /**
   * currency pair
   */
  currency: String,

  /**
   * average holding time of long trades
   */
  averageHoldingTimeLongsInMilliseconds?: Number,

  /**
   * average holding time of short trades
   */
  averageHoldingTimeShortsInMilliseconds?: Number,

  /**
   * the difference between reward and risk, where the lesser is always one.
   * So 0 means reward:risk=1:1, 2 means 3:1, -0.5 means 1:1.5
   */
  rewardToRiskRatio: Number,

  /**
   * the percentage of popularity of this currency this month
   */
  popularityPercent: Number
}

/**
 * monthly analysis of trading on this account
 */
export declare type MonthlyAnalyticsMetrics = {

  /**
   * date of trading month in broker timezone, YYYY-MM format
   */
  date: String,

  /**
   * cumulative profit per month
   */
  profit: Number,

  /**
   * cumulative pips per month
   */
  pips: Number,

  /**
   * cumulative lots per month
   */
  lots: Number,

  /**
   * cumulative gains per month
   */
  gains: Number,

  /**
   * the number of trades of this month
   */
  trades: Number,

  /**
   * @property {Array<MonthlyAnalyticCurrencyMetrics>} [currencies] list of currency pair trading
   * informations for monthly analysis
   */
  currencies: Array<MonthlyAnalyticCurrencyMetrics>
}

/**
 * opening/closing deals by days of the week or by by hours of the day
 */
export declare type TradeByTimeMetrics = {

  /**
   * date of trading month in broker timezone, YYYY-MM format
   */
  date: String,

  /**
   * the total profit of the trades at this time
   */
  profit: Number,

  /**
   * the total profit of short trades at this time
   */
  shortProfit?: Number,

  /**
   * the total profit of long trades at this time
   */
  longProfit?: Number,

  /**
   * the total profit of winning trades at this time
   */
  wonProfit?: Number,

  /**
   * the total profit of losing trades at this time
   */
  lostProfit?: Number,

  /**
   * the total pips of the trades at this time
   */
  pips?: Number,

  /**
   * the total pips of short trades at this time
   */
  shortPips?: Number,

  /**
   * the total pips of long trades at this time
   */
  longPips?: Number,

  /**
   * the total pips of winning trades at this time
   */
  wonPips?: Number,

  /**
   * the total pips of losing trades at this time
   */
  lostPips?: Number,

  /**
   * cumulative lots of trades at this time 
   */
  lots: Number,

  /**
   * cumulative gains of trades at this time
   */
  gains: Number,

  /**
   * cumulative gains of short trades at this time
   */
  shortGains?: Number,

  /**
   * cumulative gains of long trades at this time
   */
  longGains?: Number,

  /**
   * cumulative gains of winning trades at this time
   */
  wonGains?: Number,

  /**
   * cumulative gains of losing trades at this time
   */
  lostGains?: Number,

  /**
   * the number of all trades at this time
   */
  trades: Number,

  /**
   * the number of short trades at this time
   */
  shortTrades?: Number,

  /**
   * the number of long trades at this time
   */
  longTrades?: Number,

  /**
   * the number of winning trades at this time
   */
  wonTrades?: Number,

  /**
   * the number of losing trades at this time
   */
  lostTrades?: Number,

  /**
   * percentage of short trades at this time
   */
  shortTradesPercent?: Number,

  /**
   * percentage of long trades at this time
   */
  longTradesPercent?: Number,

  /**
   * percentage of winning trades at this time
   */
  wonTradesPercent?: Number,

  /**
   * percentage of losing trades at this time
   */
  lostTradesPercent?: Number,

  /**
   * day hour (only for by hour case)', within 0-23
   */
  hour?: Number,

  /**
   * weekday number (only for by day case), within 0-6
   */
  day?: Number
}

/**
 * risk of ruin of balance metrics
 */
export declare type RiskOfRuinMetrics = {

  /**
   * loss size of balance
   */
  lossSize: Number,

  /**
   * probability of loss shows the risk of losing a particular part of the balance
   */
  probabilityOfLoss: Number,

  /**
   * the number of losing trades that must be entered sequentially
   * in order for this part of the balance to be lost
   */
  consecutiveLosingTrades: Number
}

/**
 * metrics of one trade duration
 */
export declare type OneTradeDurationMetrics = {

  /**
   * list of gains for this duration
   */
  gains: Array<Number>,

  /**
   * list of profits for this duration
   */
  profits: Array<Number>,

  /**
   * list of lots for this duration
   */
  lots: Array<Number>,

  /**
   * list of pips for this duration
   */
  pips?: Array<Number>,

  /**
   * duration of trades in minutes
   */
  durationInMinutes: Number
}

/**
 * metrics for each duration of trades
 */
export declare type TradeDurationMetrics = {

  /**
   * metrics of winning trades
   */
  won?: Array<OneTradeDurationMetrics>,

  /**
   * metrics of losing trades
   */
  lost?: Array<OneTradeDurationMetrics>
}

/**
 * collection of metrics of trades in the current column for the diagram
 */
export declare type TradeDurationDiagramColumnCollectionMetrics = {

  /**
   * list of gains
   */
  gains: Array<Number>,

  /**
   * list of profits
   */
  profits: Array<Number>,

  /**
   * list of lots
   */
  lots: Array<Number>,

  /**
   * list of pips
   */
  pips?: Array<Number>
}

/**
 * information column about the duration of trades for the diagram
 */
export declare type TradeDurationDiagramColumnMetrics = {

  /**
   * the number of durations in this column
   */
  durations: Number,

  /**
   * the number of trades in this column
   */
  trades: Number,

  /**
   * name of this column, one of 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months'
   */
  name: String,

  /**
   * minimum trade duration in this column in seconds
   */
  minDurationInSeconds: Number,

  /**
   * maximum trade duration in this column in seconds
   */
  maxDurationInSeconds?: Number,

  /**
   * collection of metrics of winning trades in this column
   */
  won?: TradeDurationDiagramColumnCollectionMetrics,

  /**
   * collection of metrics of losing trades in this column
   */
  lost?: TradeDurationDiagramColumnCollectionMetrics
}

/**
 * trading statistics metrics
 */
export declare type Metrics = {

  /**
   * indicates whether open positions are included in the metrics,
   * "false" means that there are no open positions. Only for a request with includeOpenPositions=true
   */
  inclusive?: Boolean,

  /**
   * money on the account, not accounting for the results of currently open positions
   */
  balance: Number,

  /**
   * date of maximum balance that have ever been on the account,
   * in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   */
  highestBalanceDate?: String,

  /**
   * maximum balance that have ever been on the account
   */
  highestBalance?: Number,

  /**
   * the result (current amount) of all positions, including opened
   */
  equity: Number,

  /**
   * current value of margin
   */
  margin: Number,

  /**
   * current value of free margin
   */
  freeMargin: Number,

  /**
   * current value of margin level 
   */
  marginLevel?: Number,

  /**
   * total number of closed positions on the account
   */
  trades: Number,

  /**
   * total amount withdrawn from the deposit
   */
  withdrawals?: Number,

  /**
   * average trade length
   * (time from open to close) in milliseconds
   */
  averageTradeLengthInMilliseconds?: Number,

  /**
   * the best profit from one trade that has ever been on the account
   */
  bestTrade?: Number,

  /**
   * the worst profit from one trade that has ever been on the account
   */
  worstTrade?: Number,

  /**
   * the best pips from one trade that has ever been on the account
   */
  bestTradePips?: Number,

  /**
   * the worst pips from one trade that has ever been on the account
   */
  worstTradePips?: Number,

  /**
   * date of the best profit from one trade that have ever been on the account,
   * in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   */
  bestTradeDate?: String,

  /**
   * date of the best pips from one trade that have ever been on the account,
   * in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   */
  bestTradePipsDate?: String,

  /**
   * date of the worst profit from one trade that have ever been on the account,
   * in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   */
  worstTradeDate?: String,

  /**
   * date of the worst pips from one trade that have ever been on the account,
   * in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   */
  worstTradePipsDate?: String,

  /**
   * compound annual growth rate
   */
  cagr?: Number,

  /**
   * commissions charged by the broker for the entire period
   */
  commissions?: Number,

  /**
   * compound daily rate of return
   */
  dailyGain?: Number,

  /**
   * compound monthly rate of return
   */
  monthlyGain?: Number,

  /**
   * percentage of current equity to balance
   */
  equityPercent?: Number,

  /**
   * the average expected profitability of one trade in basic currency
   */
  expectancy?: Number,

  /**
   * the average expected profitability of one trade in pips
   */
  expectancyPips?: Number,

  /**
   * time-weighted rate of return
   */
  gain?: Number,

  /**
   * geometric holding period return
   */
  geometricHoldingPeriodReturn?: Number,

  /**
   * cumulative interest and swap for the entire period
   */
  interest?: Number,

  /**
   * the number of long trades
   */
  longTrades?: Number,

  /**
   * the number of short trades
   */
  shortTrades?: Number,

  /**
   * the number of long winning trades
   */
  longWonTrades?: Number,

  /**
   * the number of short winning trades
   */
  shortWonTrades?: Number,

  /**
   * percentage of long winning trades
   */
  longWonTradesPercent?: Number,

  /**
   * percentage of short winning trades
   */
  shortWonTradesPercent?: Number,

  /**
   * percentage of maximum drawdown of balance during the entire trading history
   */
  maxDrawdown?: Number,

  /**
   * mar ratio
   */
  mar?: Number,

  /**
   *  total volume of trades
   */
  lots?: Number,

  /**
   * cumulative price units
   */
  pips?: Number,

  /**
   * the total yield of closed positions for the entire period (total result)
   */
  profit: Number,

  /**
   * cumulative deposit for the entire period
   */
  deposits: Number,

  /**
   * simple deposit increase without regard to reinvestment
   */
  absoluteGain?: Number,

  /**
   * the amount yielded by winning trades divided by the amount
   * of losses yielded by losing trades. Result in range 0 - Infinity means: `0` - only loss, `1` - profit equals to
   * loss, `Infinity` - only profit.
   */
  profitFactor?: Number,

  /**
   * average return earned in excess of the risk-free rate per unit of volatility.
   * It is calculated if there are at least 30 closed deals in the history
   */
  sharpeRatio?: Number,

  /**
   * differentiates harmful volatility from total overall volatility.
   * It is calculated if there are at least 30 closed deals in the history
   */
  sortinoRatio?: Number,

  /**
   * statistical measure of volatility shows how much
   * variation or dispersion. It is calculated if there are at least 30 closed deals in the history
   */
  standardDeviationProfit?: Number,

  /**
   * a statistical measure that is used to describe profit distribution.
   * It is calculated if there are at least 30 closed deals in the history
   */
  kurtosisProfit?: Number,

  /**
   * average holding period return.
   * It is calculated if there are at least 30 closed deals in the history
   */
  averageHoldingPeriodReturn?: Number,

  /**
   * average win in basic currency
   */
  averageWin?: Number,

  /**
   * average win in pips
   */
  averageWinPips?: Number,

  /**
   * average loss in basic currency
   */
  averageLoss?: Number,

  /**
   * average loss in pips
   */
  averageLossPips?: Number,

  /**
   * percentage of winning trades
   */
  wonTradesPercent?: Number,

  /**
   * percentage of losing trades
   */
  lostTradesPercent?: Number,

  /**
   * ability of a trading system to generate wins and losses in streaks.
   * It is calculated if there are at least 30 closed deals in the history
   */
  zScore?: Number,

  /**
   * probability that a profit will be followed by a profit and a loss by a loss
   */
  probability?: Number,

  /**
   * the number of days that have passed since the opening of the first trade
   */
  daysSinceTradingStarted?: Number,

  /**
   * currency trading summary
   */
  currencySummary?: Array<CurrencySummaryMetrics>,

  /**
   * daily gain shows the change in account profitability on trading days
   */
  dailyGrowth?: Array<DailyGrowthMetrics>,

  /**
   * monthly analysis of trading on this account
   */
  monthlyAnalytics?: Array<MonthlyAnalyticsMetrics>,

  /**
   * closing deals by days of the week
   */
  closeTradesByWeekDay?: Array<TradeByTimeMetrics>,

  /**
   * opening deals by hour of the day
   */
  openTradesByHour?: Array<TradeByTimeMetrics>,

  /**
   * trading stats for a few periods compared to the results for the previous period
   */
  periods?: Periods,

  /**
   * risk of ruin of balance
   */
  riskOfRuin?: Array<RiskOfRuinMetrics>,

  /**
   * metrics for each duration of trades
   */
  tradeDuration?: TradeDurationMetrics,

  /**
   * list of information columns about the duration of trades for the diagram
   */
  tradeDurationDiagram?: Array<TradeDurationDiagramColumnMetrics>
}