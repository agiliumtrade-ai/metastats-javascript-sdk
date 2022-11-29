import DomainClient from "./domain.client";

/**
 * metaapi.cloud MetaStats MetaTrader API client
 */
export default class MetaStatsClient {

  /**
   * Constructs MetaStats API client instance
   * @param {DomainClient} domainClient domain client
   */
  constructor(domainClient: DomainClient);
  
  /**
   * Returns metrics of MetaApi account. This API call is billable
   * https://metaapi.cloud/docs/metastats/restApi/api/calculateMetrics/
   * @param {string} accountId MetaApi account id
   * @param {boolean} [includeOpenPositions] indicates whether open positions will be included
   * in the metrics, default false
   * @return {Promise<Metrics>} account metrics
   */
  getMetrics(accountId: string, includeOpenPositions?: boolean): Promise<Metrics>;

  /**
   * Returns historical trades of MetaApi account
   * https://metaapi.cloud/docs/metastats/restApi/api/getHistoricalTrades/
   * @param {string} accountId MetaApi account id
   * @param {string} startTime start of time range, inclusive
   * @param {string} endTime end of time range, exclusive
   * @param {boolean} [updateHistory] update historical trades before returning results. 
   * If set to true, the API call will be counted towards billable MetaStats API calls. 
   * If set to false, the API call is not billable. Default is true
   * @param {number} [limit] pagination limit
   * @param {number} [offset] pagination offset
   * @return {Promise<Array<Trade>>} account historical trades
   */
  getAccountTrades(accountId: string, startTime: string, endTime: string, updateHistory?: boolean, limit?: number, offset?: number): Promise<Array<Trade>>;

  /**
   * Returns open trades of MetaApi account. This API call is not billable
   * https://metaapi.cloud/docs/metastats/restApi/api/getOpenTrades/
   * @param {string} accountId MetaApi account id
   * @return {Array<OpenTrade>} account historical trades
   */
  getAccountOpenTrades(accountId: string): Promise<Array<OpenTrade>>;
}

/**
 * Open trade
 */
export declare type OpenTrade = {

  /**
   * _id historical trade id
   */
  _id: string,

  /**
   * MetaApi account id
   */
  accountId: string,

  /**
   * trade volume
   */
  volume: number,

  /**
   * trade duration in minutes
   */
  durationInMinutes: number,

  /**
   * trade profit
   */
  profit: number,

  /**
   * trade gain
   */
  gain: number,

  /**
   * trade success
   */
  success: string,

  /**
   * time the trade was opened at in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   */
  openTime: string,

  /**
   * trade type
   */
  type: string,

  /**
   * symbol the trade relates to
   */
  symbol: string,

  /**
   * trade opening price
   */
  openPrice: number,

  /**
   * the number of pips earned (positive) or lost (negative) in this trade
   */
  pips: number

  /**
   * trade risk in % of balance
   */
  riskInBalancePercent?: number

  /**
   * trade risk in pips
   */
  riskInPips?: number

  /**
   * trade comment
   */
   comment?: string

  /**
   * trade market value
   */
   marketValue?: number
}

/**
 * Historical trade
 */
export declare type Trade = {

  /**
   * historical trade id
   */
  _id: string,

  /**
   * MetaApi account id
   */
  accountId: string,

  /**
   * trade volume
   */
  volume: number,

  /**
   * trade duration in minutes
   */
  durationInMinutes: number,

  /**
   * trade profit
   */
  profit: number,

  /**
   * trade gain
   */
  gain: number,

  /**
   * trade success
   */
  success: string,

  /**
   * time the trade was opened at in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   */
  openTime: string,

  /**
   * trade type
   */
  type: string,

  /**
   * symbol the trade relates to
   */
  symbol?: string,

  /**
   * time the trade was closed at in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   */
  closeTime?: string,

  /**
   * trade opening price
   */
  openPrice?: number,

  /**
   * trade closing price
   */
  closePrice?: number,

  /**
   * the number of pips earned (positive) or lost (negative) in this trade
   */
  pips?: number
  
  /**
   * trade risk in % of balance
   */
  riskInBalancePercent?: number

   /**
    * trade risk in pips
    */
  riskInPips?: number

  /**
   * trade comment
   */
  comment?: string

  /**
   * trade market value
   */
   marketValue?: number
}

/**
 * profit from trading a currency pair in one trading day
 */
export declare type CurrencySummaryHistoryDayMetrics = {

  /**
   * date of trading day, in broker timezone, YYYY-MM-DD format
   */
  date: string,

  /**
   * total profit at the end of the day
   */
  totalProfit: number,

  /**
   * total pips of trading day
   */
  totalPips?: number,

  /**
   * total profit of short trades per day
   */
  shortProfit?: number,

  /**
   * total profit of long trades per day
   */
  longProfit?: number,

  /**
   * total pips of short trades per day
   */
  shortPips?: number,

  /**
   * total pips of long trades per day
   */
  longPips?: number
}

/**
 * provides general data of this currency trading
 */
export declare type CurrencySummaryTotalMetrics = {

  /**
   * cumulative profit of this currency trading
   */
  profit: number,

  /**
   * the number of all trades with this currency
   */
  trades: number,

  /**
   * cumulative pips of this currency trading
   */
  pips?: number,

  /**
   * the number of winning trades with this currency
   */
  wonTrades?: number,

  /**
   * the number of losing trades with this currency
   */
  lostTrades?: number,

  /**
   * percentage of winning trades with this currency
   */
  wonTradesPercent?: number,

  /**
   * percentage of losing trades with this currency
   */
  lostTradesPercent?: number
}

/**
 * provides profit and number of trades in specific trade and currency
 */
export declare type CurrencySummaryTradeMetrics = {

  /**
   * cumulative profit of this currency trading
   */
  profit: number,

  /**
   * the number of all trades with this currency
   */
  trades: number,

  /**
   * cumulative pips of this currency trading
   */
  pips?: number
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
  currency: string,

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
  profit: number,

  /**
   * cumulative pips of this period
   */
  pips: number,

  /**
   * cumulative lots of this period
   */
  lots: number,

  /**
   * gain of this period
   */
  gain: number,

  /**
   * the number of trades of this period
   */
  trades: number,

  /**
   * percentage of winning trades of this period
   */
  wonTradesPercent: number,

  /**
   * difference in profit with the previous period
   */
  profitDifference: number,

  /**
   * difference in pips with the previous period
   */
  pipsDifference: number,

  /**
   * difference in lots with the previous period 
   */
  lotsDifference: number,

  /**
   * difference in gain with the previous period
   */
  gainDifference: number,

  /**
   * difference in the number of trades with the previous period
   */
  tradesDifference: number,

  /**
   * difference in percentage of winning trades with the previous period
   */
  wonTradesPercentDifference: number
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
  date: string,

  /**
   * cumulative profit per day
   */
  profit?: number,

  /**
   * cumulative pips per day
   */
  pips?: number,

  /**
   * cumulative lots per day
   */
  lots?: number,

  /**
   * cumulative gains per day
   */
  gains?: number,

  /**
   * total profit in this day end
   */
  totalProfit: number,

  /**
   * total gains in this day end
   */
  totalGains: number,

  /**
   * balance in this day end
   */
  balance: number,

  /**
   * percentage of balance drawdown in this day end
   */
  drawdownPercentage?: number,

  /**
   * maximum registered balance drawdown in basic currency during this day
   */
  drawdownProfit?: number
}

/**
 * currency pair trading information for monthly analysis
 */
export declare type MonthlyAnalyticCurrencyMetrics = {

  /**
   * currency pair
   */
  currency: string,

  /**
   * average holding time of long trades
   */
  averageHoldingTimeLongsInMilliseconds?: number,

  /**
   * average holding time of short trades
   */
  averageHoldingTimeShortsInMilliseconds?: number,

  /**
   * the difference between reward and risk, where the lesser is always one.
   * So 0 means reward:risk=1:1, 2 means 3:1, -0.5 means 1:1.5
   */
  rewardToRiskRatio: number,

  /**
   * the percentage of popularity of this currency this month
   */
  popularityPercent: number
}

/**
 * monthly analysis of trading on this account
 */
export declare type MonthlyAnalyticsMetrics = {

  /**
   * date of trading month in broker timezone, YYYY-MM format
   */
  date: string,

  /**
   * cumulative profit per month
   */
  profit: number,

  /**
   * cumulative pips per month
   */
  pips: number,

  /**
   * cumulative lots per month
   */
  lots: number,

  /**
   * cumulative gains per month
   */
  gains: number,

  /**
   * the number of trades of this month
   */
  trades: number,

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
  date: string,

  /**
   * the total profit of the trades at this time
   */
  profit: number,

  /**
   * the total profit of short trades at this time
   */
  shortProfit?: number,

  /**
   * the total profit of long trades at this time
   */
  longProfit?: number,

  /**
   * the total profit of winning trades at this time
   */
  wonProfit?: number,

  /**
   * the total profit of losing trades at this time
   */
  lostProfit?: number,

  /**
   * the total pips of the trades at this time
   */
  pips?: number,

  /**
   * the total pips of short trades at this time
   */
  shortPips?: number,

  /**
   * the total pips of long trades at this time
   */
  longPips?: number,

  /**
   * the total pips of winning trades at this time
   */
  wonPips?: number,

  /**
   * the total pips of losing trades at this time
   */
  lostPips?: number,

  /**
   * cumulative lots of trades at this time 
   */
  lots: number,

  /**
   * cumulative gains of trades at this time
   */
  gains: number,

  /**
   * cumulative gains of short trades at this time
   */
  shortGains?: number,

  /**
   * cumulative gains of long trades at this time
   */
  longGains?: number,

  /**
   * cumulative gains of winning trades at this time
   */
  wonGains?: number,

  /**
   * cumulative gains of losing trades at this time
   */
  lostGains?: number,

  /**
   * the number of all trades at this time
   */
  trades: number,

  /**
   * the number of short trades at this time
   */
  shortTrades?: number,

  /**
   * the number of long trades at this time
   */
  longTrades?: number,

  /**
   * the number of winning trades at this time
   */
  wonTrades?: number,

  /**
   * the number of losing trades at this time
   */
  lostTrades?: number,

  /**
   * percentage of short trades at this time
   */
  shortTradesPercent?: number,

  /**
   * percentage of long trades at this time
   */
  longTradesPercent?: number,

  /**
   * percentage of winning trades at this time
   */
  wonTradesPercent?: number,

  /**
   * percentage of losing trades at this time
   */
  lostTradesPercent?: number,

  /**
   * day hour (only for by hour case)', within 0-23
   */
  hour?: number,

  /**
   * weekday number (only for by day case), within 0-6
   */
  day?: number
}

/**
 * risk of ruin of balance metrics
 */
export declare type RiskOfRuinMetrics = {

  /**
   * loss size of balance
   */
  lossSize: number,

  /**
   * probability of loss shows the risk of losing a particular part of the balance
   */
  probabilityOfLoss: number,

  /**
   * the number of losing trades that must be entered sequentially
   * in order for this part of the balance to be lost
   */
  consecutiveLosingTrades: number
}

/**
 * metrics of one trade duration
 */
export declare type OneTradeDurationMetrics = {

  /**
   * list of gains for this duration
   */
  gains: Array<number>,

  /**
   * list of profits for this duration
   */
  profits: Array<number>,

  /**
   * list of lots for this duration
   */
  lots: Array<number>,

  /**
   * list of pips for this duration
   */
  pips?: Array<number>,

  /**
   * duration of trades in minutes
   */
  durationInMinutes: number
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
  gains: Array<number>,

  /**
   * list of profits
   */
  profits: Array<number>,

  /**
   * list of lots
   */
  lots: Array<number>,

  /**
   * list of pips
   */
  pips?: Array<number>
}

/**
 * information column about the duration of trades for the diagram
 */
export declare type TradeDurationDiagramColumnMetrics = {

  /**
   * the number of durations in this column
   */
  durations: number,

  /**
   * the number of trades in this column
   */
  trades: number,

  /**
   * name of this column, one of 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months'
   */
  name: string,

  /**
   * minimum trade duration in this column in seconds
   */
  minDurationInSeconds: number,

  /**
   * maximum trade duration in this column in seconds
   */
  maxDurationInSeconds?: number,

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
  inclusive?: boolean,

  /**
   * money on the account, not accounting for the results of currently open positions
   */
  balance: number,

  /**
   * date of maximum balance that have ever been on the account,
   * in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   */
  highestBalanceDate?: string,

  /**
   * maximum balance that have ever been on the account
   */
  highestBalance?: number,

  /**
   * the result (current amount) of all positions, including opened
   */
  equity: number,

  /**
   * current value of margin
   */
  margin: number,

  /**
   * current value of free margin
   */
  freeMargin: number,

  /**
   * current value of margin level 
   */
  marginLevel?: number,

  /**
   * total number of closed positions on the account
   */
  trades: number,

  /**
   * total amount withdrawn from the deposit
   */
  withdrawals?: number,

  /**
   * average trade length
   * (time from open to close) in milliseconds
   */
  averageTradeLengthInMilliseconds?: number,

  /**
   * the best profit from one trade that has ever been on the account
   */
  bestTrade?: number,

  /**
   * the worst profit from one trade that has ever been on the account
   */
  worstTrade?: number,

  /**
   * the best pips from one trade that has ever been on the account
   */
  bestTradePips?: number,

  /**
   * the worst pips from one trade that has ever been on the account
   */
  worstTradePips?: number,

  /**
   * date of the best profit from one trade that have ever been on the account,
   * in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   */
  bestTradeDate?: string,

  /**
   * date of the best pips from one trade that have ever been on the account,
   * in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   */
  bestTradePipsDate?: string,

  /**
   * date of the worst profit from one trade that have ever been on the account,
   * in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   */
  worstTradeDate?: string,

  /**
   * date of the worst pips from one trade that have ever been on the account,
   * in broker timezone, YYYY-MM-DD HH:mm:ss.SSS format
   */
  worstTradePipsDate?: string,

  /**
   * compound annual growth rate
   */
  cagr?: number,

  /**
   * commissions charged by the broker for the entire period
   */
  commissions?: number,

  /**
   * compound daily rate of return
   */
  dailyGain?: number,

  /**
   * compound monthly rate of return
   */
  monthlyGain?: number,

  /**
   * percentage of current equity to balance
   */
  equityPercent?: number,

  /**
   * the average expected profitability of one trade in basic currency
   */
  expectancy?: number,

  /**
   * the average expected profitability of one trade in pips
   */
  expectancyPips?: number,

  /**
   * time-weighted rate of return
   */
  gain?: number,

  /**
   * geometric holding period return
   */
  geometricHoldingPeriodReturn?: number,

  /**
   * cumulative interest and swap for the entire period
   */
  interest?: number,

  /**
   * the number of long trades
   */
  longTrades?: number,

  /**
   * the number of short trades
   */
  shortTrades?: number,

  /**
   * the number of long winning trades
   */
  longWonTrades?: number,

  /**
   * the number of short winning trades
   */
  shortWonTrades?: number,

  /**
   * percentage of long winning trades
   */
  longWonTradesPercent?: number,

  /**
   * percentage of short winning trades
   */
  shortWonTradesPercent?: number,

  /**
   * percentage of maximum drawdown of balance during the entire trading history
   */
  maxDrawdown?: number,

  /**
   * mar ratio
   */
  mar?: number,

  /**
   *  total volume of trades
   */
  lots?: number,

  /**
   * cumulative price units
   */
  pips?: number,

  /**
   * the total yield of closed positions for the entire period (total result)
   */
  profit: number,

  /**
   * cumulative deposit for the entire period
   */
  deposits: number,

  /**
   * simple deposit increase without regard to reinvestment
   */
  absoluteGain?: number,

  /**
   * the amount yielded by winning trades divided by the amount
   * of losses yielded by losing trades. Result in range 0 - Infinity means: `0` - only loss, `1` - profit equals to
   * loss, `Infinity` - only profit.
   */
  profitFactor?: number,

  /**
   * average return earned in excess of the risk-free rate per unit of volatility.
   * It is calculated if there are at least 30 closed deals in the history
   */
  sharpeRatio?: number,

  /**
   * differentiates harmful volatility from total overall volatility.
   * It is calculated if there are at least 30 closed deals in the history
   */
  sortinoRatio?: number,

  /**
   * statistical measure of volatility shows how much
   * variation or dispersion. It is calculated if there are at least 30 closed deals in the history
   */
  standardDeviationProfit?: number,

  /**
   * a statistical measure that is used to describe profit distribution.
   * It is calculated if there are at least 30 closed deals in the history
   */
  kurtosisProfit?: number,

  /**
   * average holding period return.
   * It is calculated if there are at least 30 closed deals in the history
   */
  averageHoldingPeriodReturn?: number,

  /**
   * average win in basic currency
   */
  averageWin?: number,

  /**
   * average win in pips
   */
  averageWinPips?: number,

  /**
   * average loss in basic currency
   */
  averageLoss?: number,

  /**
   * average loss in pips
   */
  averageLossPips?: number,

  /**
   * percentage of winning trades
   */
  wonTradesPercent?: number,

  /**
   * percentage of losing trades
   */
  lostTradesPercent?: number,

  /**
   * ability of a trading system to generate wins and losses in streaks.
   * It is calculated if there are at least 30 closed deals in the history
   */
  zScore?: number,

  /**
   * probability that a profit will be followed by a profit and a loss by a loss
   */
  probability?: number,

  /**
   * the number of days that have passed since the opening of the first trade
   */
  daysSinceTradingStarted?: number,

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
  
  /**
   * total market value of all trades on the account
   */
   totalTradeMarketValue?: number
}