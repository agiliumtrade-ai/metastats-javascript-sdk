'use strict';

import { ValidationError } from './errorHandler';

/**
 * Connection URL and request managing client
 */
export default class DomainClient {

  /**
   * Constructs domain client instance
   * @param {HttpClient} httpClient HTTP client
   * @param {String} token authorization token
   * @param {String} domain domain to connect to, default is agiliumtrade.agiliumtrade.ai
   */
  constructor(httpClient, token, domain = 'agiliumtrade.agiliumtrade.ai') {
    this._httpClient = httpClient;
    this._domain = domain;
    this._token = token;
    this._urlCache = null;
    this._accountCache = {};
  }

  /**
   * Returns domain client token
   * @returns {String} client token
   */
  get token() {
    return this._token;
  }

  /**
   * Sends a MetaStats API request
   * @param {Function} getOpts function to get request options
   * @param {String} accountId account id
   * @returns {Object|String|any} request result
   */
  async requestMetastats(getOpts, accountId) {
    await this._updateHost();
    await this._updateAccountHost(accountId);
    const accountCache = this._accountCache[accountId];
    try {
      const regionSettings = accountCache.regions[accountCache.regionIndex];
      const opts = getOpts(`https://metastats-api-v1.${regionSettings.region}.${this._urlCache.domain}`, 
        regionSettings.id);

      return await this._httpClient.request(opts);
    } catch (err) {
      if(!['ConflictError', 'InternalError', 'ApiError', 'TimeoutError'].includes(err.name)) {
        throw err;
      } else {
        if(accountCache.regions.length === accountCache.regionIndex + 1) {
          accountCache.regionIndex = 0;
          throw err;
        } else {
          accountCache.regionIndex++;
          return await this.requestMetastats(getOpts, accountId);
        }
      }
    }

  }

  async _updateHost() {
    if(!this._urlCache || this._urlCache.lastUpdated < Date.now() - 1000 * 60 * 10) {
      const urlSettings = await this._httpClient.requestWithFailover({
        url: `https://mt-provisioning-api-v1.${this._domain}/users/current/servers/mt-client-api`,
        method: 'GET',
        headers: {
          'auth-token': this._token
        },
        json: true,
      });
      this._urlCache = {
        domain: urlSettings.domain,
        lastUpdated: Date.now()
      }; 
    }
  }
  
  async _updateAccountHost(accountId) {
    if(!this._accountCache[accountId] || this._accountCache[accountId].lastUpdated < Date.now() - 1000 * 60 * 10) {

      const getAccount = async (id) => {
        const accountOpts = {
          url: `https://mt-provisioning-api-v1.${this._domain}/users/current/accounts/${id}`,
          method: 'GET',
          headers: {
            'auth-token': this._token
          },
          json: true
        };

        return await this._httpClient.requestWithFailover(accountOpts);
      };

      let accounts = [];
      let accountData = await getAccount(accountId);
      if(accountData.primaryAccountId) {
        accountData = await getAccount(accountData.primaryAccountId);
      }
      accounts = [{_id: accountData._id, region: accountData.region, state: accountData.state}]
        .concat((accountData.accountReplicas || []));
      accounts = accounts.filter(account => account.state === 'DEPLOYED');
      if(!accounts.length) {
        throw new ValidationError('There are no replicas deployed yet. Please make sure at least ' +
        'one of the replicas is deployed.');
      }

      let regions = accounts.map(account => ({region: account.region, id: account._id}));

      this._accountCache[accountId] = {
        regions,
        regionIndex: 0,
        lastUpdated: Date.now()
      };
    }
  }

}
