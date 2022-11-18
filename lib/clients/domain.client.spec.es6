'use strict';

import HttpClient from './httpClient';
import sinon from 'sinon';
import DomainClient from './domain.client';
import { ValidationError, InternalError } from './errorHandler';
 
/**
 * @test {DomainClient}
 */
describe('DomainClient', () => {
 
  let domainClient;
  const token = 'header.payload.sign';
  let httpClient = new HttpClient();
  let sandbox;
  let requestStub;
  let getRegionsStub;
  let getHostStub;
  let failoverRequestStub;
  let getAccountStub;
  let clock;
  const expected = {trades: 10, equity: 10102.5, balance: 10105, profit: 104, deposits: 10001};
  const getOpts = (host, id) => ({
    url: host + `/users/current/accounts/${id}/open-trades`,
    method: 'GET',
    headers: {
      'auth-token': token
    },
    json: true,
  });
 
  before(() => {
    sandbox = sinon.createSandbox();
  });
 
  beforeEach(() => {
    domainClient = new DomainClient(httpClient, token);
    clock = sandbox.useFakeTimers({shouldAdvanceTime: true});
    failoverRequestStub = sandbox.stub(httpClient, 'requestWithFailover');
    getAccountStub = failoverRequestStub.withArgs({
      url: 'https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai/users/current/accounts/accountId',
      method: 'GET',
      headers: {
        'auth-token': token
      },
      json: true
    }).resolves({_id: 'accountId', region: 'vint-hill', state: 'DEPLOYED', 
      accountReplicas: [
        {_id: 'accountId2', region: 'us-west', state: 'DEPLOYED'}
      ]});
    requestStub = sandbox.stub(httpClient, 'request');
    requestStub.withArgs({
      url: 'https://metastats-api-v1.vint-hill.agiliumtrade.ai/' +
        'users/current/accounts/accountId/open-trades',
      method: 'GET',
      headers: { 'auth-token': token },
      json: true
    }).resolves(expected);
    getHostStub = failoverRequestStub.withArgs({
      url: 'https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai/users/current/servers/mt-client-api',
      method: 'GET',
      headers: {
        'auth-token': token
      },
      json: true,
    }).resolves({domain: 'agiliumtrade.ai'});
  });
 
  afterEach(() => {
    sandbox.restore();
    clock.restore();
  });
 
  /**
   * @test {DomainClient#requestMetastats}
   */
  describe('requestMetastats', () => {
 
    const opts = {
      url: '/users/current/accounts/accountId/metrics',
      method: 'GET',
      headers: {
        'auth-token': token
      },
      json: true,
    };
 
    /**
     * @test {DomainClient#requestMetastats}
     */
    it('should execute request', async () => {
      const response = await domainClient.requestMetastats(getOpts, 'accountId');
      sinon.assert.match(response, expected);
      sinon.assert.calledWith(requestStub, {
        url: 'https://metastats-api-v1.vint-hill.agiliumtrade.ai/' +
        'users/current/accounts/accountId/open-trades',
        method: 'GET',
        headers: { 'auth-token': token },
        json: true
      });
    });

    describe('_updateHost', () => {
 
      /**
       * @test {DomainClient#requestMetastats}
       */
      it('should request url again if expired', async () => {
        await domainClient.requestMetastats(getOpts, 'accountId');
        await clock.tickAsync(610000);
        const response = await domainClient.requestMetastats(getOpts, 'accountId');
        sinon.assert.match(response, expected);
        sinon.assert.calledWith(requestStub, {
          url: 'https://metastats-api-v1.vint-hill.agiliumtrade.ai/' +
          'users/current/accounts/accountId/open-trades',
          method: 'GET',
          headers: { 'auth-token': token },
          json: true
        });
        sinon.assert.calledTwice(getHostStub);
      });

      /**
       * @test {DomainClient#requestMetastats}
       */
      it('should use cached url on repeated request', async () => {
        await domainClient.requestMetastats(getOpts, 'accountId');
        const response = await domainClient.requestMetastats(getOpts, 'accountId');
        sinon.assert.calledWith(requestStub, {
          url: 'https://metastats-api-v1.vint-hill.agiliumtrade.ai/' +
          'users/current/accounts/accountId/open-trades',
          method: 'GET',
          headers: { 'auth-token': token },
          json: true
        });
        sinon.assert.match(response, expected);
        sinon.assert.calledOnce(getHostStub);
      });
 
      /**
       * @test {DomainClient#requestMetastats}
       */
      it('should return error if failed to get host', async () => {
        getHostStub.throws(new ValidationError('test'));
        try {
          await domainClient.requestMetastats(getOpts, 'accountId');
          throw new Error('ValidationError expected');
        } catch (error) {
          error.name.should.equal('ValidationError');
        }
      });

    });
 
    /**
     * @test {DomainClient#requestMetastats}
     */
    describe('_updateAccountHost', () => {

      /**
       * @test {DomainClient#requestMetastats}
       */
      it('should return error if failed to get account data', async () => {
        getAccountStub.rejects(new ValidationError('test'));
        try {
          await domainClient.requestMetastats(getOpts, 'accountId');
          throw new Error('ValidationError expected');
        } catch (error) {
          error.name.should.equal('ValidationError');
        }
      });

      it('should request main account if using replica', async () => {
        failoverRequestStub.withArgs({
          url: 'https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai/users/current/accounts/accountId2',
          method: 'GET',
          headers: {
            'auth-token': token
          },
          json: true
        }).resolves({_id: 'accountId2', region: 'us-west', primaryAccountId: 'accountId', state: 'DEPLOYED'});

        const response = await domainClient.requestMetastats(getOpts, 'accountId2');
        sinon.assert.match(response, expected);
        sinon.assert.calledWith(requestStub, {
          url: 'https://metastats-api-v1.vint-hill.agiliumtrade.ai/' +
          'users/current/accounts/accountId/open-trades',
          method: 'GET',
          headers: { 'auth-token': token },
          json: true
        });
      });

      /**
       * @test {DomainClient#requestMetastats}
       */
      it('should try another region if the first failed', async () => {
        requestStub.withArgs({
          url: 'https://metastats-api-v1.vint-hill.agiliumtrade.ai/' +
          'users/current/accounts/accountId/open-trades',
          method: 'GET',
          headers: { 'auth-token': token },
          json: true
        }).rejects(new InternalError('test'));
        requestStub.withArgs({
          url: 'https://metastats-api-v1.us-west.agiliumtrade.ai/' +
          'users/current/accounts/accountId2/open-trades',
          method: 'GET',
          headers: { 'auth-token': token },
          json: true
        }).resolves(expected);
        const response = await domainClient.requestMetastats(getOpts, 'accountId');
        sinon.assert.calledWith(requestStub, {
          url: 'https://metastats-api-v1.us-west.agiliumtrade.ai/' +
          'users/current/accounts/accountId2/open-trades',
          method: 'GET',
          headers: { 'auth-token': token },
          json: true
        });
        sinon.assert.match(response, expected);
 
        sinon.assert.calledOnce(getHostStub);
      });

      /**
       * @test {DomainClient#requestMetastats}
       */
      it('should return error if all regions failed', async () => {
        requestStub.withArgs({
          url: 'https://metastats-api-v1.vint-hill.agiliumtrade.ai/' +
          'users/current/accounts/accountId/open-trades',
          method: 'GET',
          headers: { 'auth-token': token },
          json: true
        }).throws(new InternalError('test'));
        requestStub.withArgs({
          url: 'https://metastats-api-v1.us-west.agiliumtrade.ai/' +
          'users/current/accounts/accountId2/open-trades',
          method: 'GET',
          headers: { 'auth-token': token },
          json: true
        }).throws(new InternalError('test'));
 
        try {
          await domainClient.requestMetastats(getOpts, 'accountId');
          throw new Error('InternalError expected');
        } catch (error) {
          error.name.should.equal('InternalError');
        }
      });

      /**
       * @test {DomainClient#requestMetastats}
       */
      it('should roll over to the first region if all regions failed', async () => {
        requestStub.withArgs({
          url: 'https://metastats-api-v1.vint-hill.agiliumtrade.ai/' +
          'users/current/accounts/accountId/open-trades',
          method: 'GET',
          headers: { 'auth-token': token },
          json: true
        }).throws(new InternalError('test'));
        requestStub.withArgs({
          url: 'https://metastats-api-v1.us-west.agiliumtrade.ai/' +
          'users/current/accounts/accountId2/open-trades',
          method: 'GET',
          headers: { 'auth-token': token },
          json: true
        }).throws(new InternalError('test'));
 
        try {
          await domainClient.requestMetastats(getOpts, 'accountId');
          throw new Error('InternalError expected');
        } catch (error) {
          error.name.should.equal('InternalError');
        }

        requestStub.withArgs({
          url: 'https://metastats-api-v1.vint-hill.agiliumtrade.ai/' +
          'users/current/accounts/accountId/open-trades',
          method: 'GET',
          headers: { 'auth-token': token },
          json: true
        }).resolves(expected);        
        const response = await domainClient.requestMetastats(getOpts, 'accountId');
        sinon.assert.match(response, expected);
      });

      /**
       * @test {DomainClient#requestSignal}
       */
      it('should execute a request and update host if expired', async () => {
        const otherRegionOpts = {
          url: 'https://metastats-api-v1.us-west.agiliumtrade.ai/' +
          'users/current/accounts/accountId2/open-trades',
          method: 'GET',
          headers: { 'auth-token': token },
          json: true
        };
        const otherRegionStub = requestStub.withArgs(otherRegionOpts).resolves(expected);
        getAccountStub = failoverRequestStub.withArgs({
          url:  'https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai/users/current/accounts/accountId',
          method: 'GET',
          headers: {
            'auth-token': token
          },
          json: true
        }).resolves({_id: 'accountId', region: 'vint-hill', state: 'DEPLOYED'});
        await domainClient.requestMetastats(getOpts, 'accountId');
        await new Promise(res => setTimeout(res, 50));
        sinon.assert.calledOnce(getAccountStub);
        sinon.assert.notCalled(otherRegionStub);
        getAccountStub.resolves({_id: 'accountId2', region: 'us-west', state: 'DEPLOYED' });
        await clock.tickAsync(610000);
        const result = await domainClient.requestMetastats(getOpts, 'accountId');
        await new Promise(res => setTimeout(res, 50));
        sinon.assert.calledTwice(getAccountStub);
        sinon.assert.calledOnce(otherRegionStub);
        await domainClient.requestMetastats(getOpts, 'accountId');
        await new Promise(res => setTimeout(res, 50));
        sinon.assert.calledTwice(getAccountStub);
        sinon.assert.calledTwice(otherRegionStub);
      });

      /**
       * @test {DomainClient#requestMetastats}
       */
      it('should return error if no replicas are deployed', async () => {
        getAccountStub.resolves({_id: 'accountId', region: 'vint-hill', state: 'UNDEPLOYED'});
        try {
          await domainClient.requestMetastats(getOpts, 'accountId');
          throw new Error('ValidationError expected');
        } catch (error) {
          error.name.should.equal('ValidationError');
        }
      });

      /**
       * @test {DomainClient#requestMetastats}
       */
      it('should filter out undeployed replicas', async () => {
        getAccountStub.resolves({_id: 'accountId', region: 'vint-hill', state: 'UNDEPLOYED', accountReplicas: [
          {_id: 'accountId2', region: 'us-west', state: 'UNDEPLOYED'},
          {_id: 'accountId3', region: 'germany', state: 'DEPLOYED'}
        ]});
        requestStub.withArgs({
          url: 'https://metastats-api-v1.germany.agiliumtrade.ai/' +
          'users/current/accounts/accountId3/open-trades',
          method: 'GET',
          headers: { 'auth-token': token },
          json: true
        }).resolves(expected);
        const response = await domainClient.requestMetastats(getOpts, 'accountId');
        sinon.assert.match(response, expected);
        sinon.assert.calledWith(requestStub, {
          url: 'https://metastats-api-v1.germany.agiliumtrade.ai/' +
          'users/current/accounts/accountId3/open-trades',
          method: 'GET',
          headers: { 'auth-token': token },
          json: true
        });
      });
      

    });

  });

});
 