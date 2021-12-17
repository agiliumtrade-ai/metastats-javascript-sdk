import { RetryOptions } from "./clients/httpClient";

/**
 * MetaStats API SDK
 */
export default class MetaStats {

  /**
   * Constructs MetaStats class instance
   * @param {string} token authorization token
   * @param {ConnectionOptions} [opts] connection options
   */
  constructor(token: string, opts?: ConnectionOptions);

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
export declare type ConnectionOptions = {

  /**
   * request timeout in seconds, default 60
   */
  requestTimeout?: number,

  /**
   * request domain, default 'agiliumtrade.agiliumtrade.ai'
   */
  domain?: string,

  /**
   * retry options
   */
  retryOpts?: RetryOptions
}