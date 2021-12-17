'use strict';

import should from 'should';
import sinon  from 'sinon';
import HttpClient from './httpClient';
import MetaStatsClient from './metaStats.client';

/**
   * @test {MetaStatsClient}
   */
describe('MetaStatsClient', () => {

  /**
   * @test {MetaStatsClient#getMetrics}
   */
  describe('MetaStatsClient#getMetrics', () => {

    const expected = {trades: 10, equity: 10102.5, balance: 10105, profit: 104, deposits: 10001};
    const token = 'token.payload.sign';
    const accountId = '1234567';
    const httpClient = new HttpClient();
    let metaStatsClient;
    let sandbox;

    before(() => {
      metaStatsClient = new MetaStatsClient(httpClient, token);
      sandbox = sinon.createSandbox();
      sandbox.stub(httpClient, 'request').resolves({metrics: expected});
    });

    beforeEach(() => {
      metaStatsClient = new MetaStatsClient(httpClient, token);
    });

    afterEach(() => {
      sandbox.resetHistory();
    });

    after(() => {
      sandbox.restore();
    });

    it('should retrieve account metrics from API', async () => {
      const metrics = await metaStatsClient.getMetrics(accountId);
      metrics.should.be.eql(expected);
      sinon.assert.calledOnceWithExactly(httpClient.request, {
        url: `https://metastats-api-v1.agiliumtrade.agiliumtrade.ai/users/current/accounts/${accountId}/metrics`,
        method: 'GET',
        headers: {'auth-token': token},
        json: true,
        qs: {includeOpenPositions: false}
      });
    });

    it('should retrieve account metrics with included open positions from API', async () => {
      expected.inclusive = false;
      const metrics = await metaStatsClient.getMetrics(accountId, true);
      metrics.should.be.eql(expected);
      sinon.assert.calledOnceWithExactly(httpClient.request, {
        url: `https://metastats-api-v1.agiliumtrade.agiliumtrade.ai/users/current/accounts/${accountId}/metrics`,
        method: 'GET',
        headers: {'auth-token': token},
        json: true,
        qs: {includeOpenPositions: true}
      });
    });

  });

  /**
   * @test {MetaStatsClient#getTrades}
   */
  describe('MetaStatsClient#getTrades', () => {
    const expected = {};
    const token = 'token.payload.sign';
    const accountId = '1234567';
    const httpClient = new HttpClient();
    const startTime = '2020-01-01 00:00:00.000';
    const endTime = '2021-01-01 00:00:00.000';
    let metaStatsClient;
    let sandbox;

    before(() => {
      metaStatsClient = new MetaStatsClient(httpClient, token);
      sandbox = sinon.createSandbox();
      sandbox.stub(httpClient, 'request').resolves({trades: expected});
    });

    beforeEach(() => {
      metaStatsClient = new MetaStatsClient(httpClient, token);
    });

    afterEach(() => {
      sandbox.resetHistory();
    });

    after(() => {
      sandbox.restore();
    });

    it('should retrieve account trades from API', async () => {
      const trades = await metaStatsClient.getAccountTrades(accountId, startTime, endTime);
      trades.should.be.eql(expected);
      sinon.assert.calledOnceWithExactly(httpClient.request, {
        url: `https://metastats-api-v1.agiliumtrade.agiliumtrade.ai/users/current/accounts/${accountId}` + 
          `/historical-trades/${startTime}/${endTime}`,
        method: 'GET',
        headers: {'auth-token': token},
        json: true,
        qs: {updateHistory: true, limit: 1000, offset: 0}
      });
    });
  });
  
  /**
   * @test {MetaStatsClient#getOpenTrades}
   */
  describe('MetaStatsClient#getOpenTrades', () => {
    const expected = {};
    const token = 'token.payload.sign';
    const accountId = '1234567';
    const httpClient = new HttpClient();
    let metaStatsClient;
    let sandbox;

    before(() => {
      metaStatsClient = new MetaStatsClient(httpClient, token);
      sandbox = sinon.createSandbox();
      sandbox.stub(httpClient, 'request').resolves({openTrades: expected});
    });

    beforeEach(() => {
      metaStatsClient = new MetaStatsClient(httpClient, token);
    });

    afterEach(() => {
      sandbox.resetHistory();
    });

    after(() => {
      sandbox.restore();
    });

    it('should retrieve account open trades from API', async () => {
      const openTrades = await metaStatsClient.getAccountOpenTrades(accountId);
      openTrades.should.be.eql(expected);
      sinon.assert.calledOnceWithExactly(httpClient.request, {
        url: `https://metastats-api-v1.agiliumtrade.agiliumtrade.ai/users/current/accounts/${accountId}/open-trades`,
        method: 'GET',
        headers: {'auth-token': token},
        json: true
      });
    });
  });
});
