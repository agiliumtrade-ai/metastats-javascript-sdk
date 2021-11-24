import { RetryOptions } from "./clients/httpClient";

/**
 * MetaStats API SDK
 */
export default class MetaStats {

  /**
   * Constructs MetaStats class instance
   * @param {String} token authorization token
   * @param {ConnectionOptions} [opts] connection options
   */
  constructor(token: String, opts?: ConnectionOptions);

  /**
   * Returns the getMetrics MetaStatsClient method bound to the MetaStatsClient instance
   * @returns {Function} getMetrics MetaStatsClient method
   */
  get getMetrics(): Function;

  /**
   * Returns the getAccountTrades MetaStatsClient method bound to the MetaStatsClient instance
   * @returns {Function} getAccountTrades MetaStatsClient method
   */
  get getAccountTrades(): Function;

  /**
   * Returns the getAccountOpenTrades MetaStatsClient method bound to the MetaStatsClient instance
   * @returns {Function} getAccountOpenTrades MetaStatsClient method
   */
  get getAccountOpenTrades(): Function;
}

/**
 * connection options
 */
declare type ConnectionOptions = {

  /**
   * request timeout in seconds, default 60
   */
  requestTimeout?: Number,

  /**
   * request domain, default 'agiliumtrade.agiliumtrade.ai'
   */
  domain?: String,

  /**
   * retry options
   */
  retryOpts?: RetryOptions
}