'use strict';

import HttpClient from './clients/httpClient';
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
    this._metaStatsClient = new MetaStatsClient(httpClient, token, opts.domain);
  }

  /**
   * Returns the getMetrics MetaStatsClient method bound to the MetaStatsClient instance
   * @returns {Function} getMetrics MetaStatsClient method
   */
  get getMetrics() {
    return this._metaStatsClient.getMetrics.bind(this._metaStatsClient);
  }

}
