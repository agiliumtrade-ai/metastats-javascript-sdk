'use strict';

import HttpClient from './clients/httpClient';
import DomainClient from './clients/domain.client';
import MetaStatsClient from './clients/metaStats.client';

/**
 * MetaStats API SDK
 */
export default class MetaStats {

  /**
   * @typedef {Object} ConnectionOptions connection options
   * @property {Number} [requestTimeout] request timeout in seconds, default 60
   * @property {String} [domain] request domain, default 'agiliumtrade.agiliumtrade.ai'
   * @property {RetryOptions} [retryOpts] retry options
   */

  /**
   * Constructs MetaStats class instance
   * @param {String} token authorization token
   * @param {ConnectionOptions} [opts] connection options
   */
  constructor(token, opts = {}) {
    const httpClient = new HttpClient(opts.requestTimeout, opts.retryOpts);
    const domainClient = new DomainClient(httpClient, token, opts.domain);
    this._metaStatsClient = new MetaStatsClient(domainClient);
  }

  /**
   * Returns the getMetrics MetaStatsClient method bound to the MetaStatsClient instance
   * @returns {Function} getMetrics MetaStatsClient method
   */
  get getMetrics() {
    return this._metaStatsClient.getMetrics.bind(this._metaStatsClient);
  }

  /**
   * Returns the getAccountTrades MetaStatsClient method bound to the MetaStatsClient instance
   * @returns {Function} getAccountTrades MetaStatsClient method
   */
  get getAccountTrades() {
    return this._metaStatsClient.getAccountTrades.bind(this._metaStatsClient);
  }

  /**
   * Returns the getAccountOpenTrades MetaStatsClient method bound to the MetaStatsClient instance
   * @returns {Function} getAccountOpenTrades MetaStatsClient method
   */
  get getAccountOpenTrades() {
    return this._metaStatsClient.getAccountOpenTrades.bind(this._metaStatsClient);
  }
}
