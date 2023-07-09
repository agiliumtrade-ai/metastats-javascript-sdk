'use strict';

import should from 'should';
import sinon  from 'sinon';
import MetaStatsClient from './metaStats.client';

/**
 * @test {MetaStatsClient}
 */
describe('MetaStatsClient', () => {
  
  const accountId = '1234567';
  const token = 'token.payload.sign';
  const host = 'agiliumtrade.ai';
  const domainClient = {
    requestMetastats: () => {},
    token: token
  };
  let metaStatsClient, sandbox, requestStub;

  before(() => {
    sandbox = sinon.createSandbox();
  });
  
  beforeEach(() => {
    metaStatsClient = new MetaStatsClient(domainClient);
    requestStub = sandbox.stub(domainClient, 'requestMetastats');
  });

  afterEach(() => {
    sandbox.resetHistory();
    sandbox.restore();
  });

  /**
   * @test {MetaStatsClient#getMetrics}
   */
  describe('MetaStatsClient#getMetrics', () => {

    const expected = {trades: 10, equity: 10102.5, balance: 10105, profit: 104, deposits: 10001};

    beforeEach(() => {
      requestStub.resolves({metrics: expected});
    });

    /**
     * @test {MetaStatsClient#getMetrics}
     */
    it('should retrieve account metrics from API', async () => {
      const metrics = await metaStatsClient.getMetrics(accountId);
      metrics.should.be.eql(expected);
      const args = requestStub.getCall(0).args;
      sinon.assert.match(args[0](host, accountId),
        {url: 'agiliumtrade.ai/users/current/accounts/1234567/metrics',
          method: 'GET',
          headers: {'auth-token': token},
          json: true,
          params: {includeOpenPositions: false}
        }
      );
      sinon.assert.match(args[1], '1234567');
    });

    /**
     * @test {MetaStatsClient#getMetrics}
     */
    it('should retrieve account metrics with included open positions from API', async () => {
      expected.inclusive = false;
      const metrics = await metaStatsClient.getMetrics(accountId, true);
      metrics.should.be.eql(expected);
      const args = requestStub.getCall(0).args;
      sinon.assert.match(args[0](host, accountId),
        {url: 'agiliumtrade.ai/users/current/accounts/1234567/metrics',
          method: 'GET',
          headers: {'auth-token': token},
          json: true,
          params: {includeOpenPositions: true}
        }
      );
      sinon.assert.match(args[1], '1234567');
    });

  });

  /**
   * @test {MetaStatsClient#getAccountTrades}
   */
  describe('MetaStatsClient#getAccountTrades', () => {
    const expected = [{_id: '1'}];
    const startTime = '2020-01-01 00:00:00.000';
    const endTime = '2021-01-01 00:00:00.000';

    beforeEach(() => {
      requestStub.resolves({trades: expected});
    });

    /**
     * @test {MetaStatsClient#getAccountTrades}
     */
    it('should retrieve account trades from API', async () => {
      const trades = await metaStatsClient.getAccountTrades(accountId, startTime, endTime);
      trades.should.be.eql(expected);
      const args = requestStub.getCall(0).args;
      sinon.assert.match(args[0](host, accountId),
        {url: `agiliumtrade.ai/users/current/accounts/1234567/historical-trades/${startTime}/${endTime}`,
          method: 'GET',
          headers: {'auth-token': token},
          json: true,
          params: {updateHistory: true, limit: 1000, offset: 0}
        }
      );
      sinon.assert.match(args[1], '1234567');
    });
  });
  
  /**
   * @test {MetaStatsClient#getOpenTrades}
   */
  describe('MetaStatsClient#getOpenTrades', () => {
    const expected = [{_id: '1'}];

    beforeEach(() => {
      requestStub.resolves({openTrades: expected});
    });

    /**
     * @test {MetaStatsClient#getOpenTrades}
     */
    it('should retrieve account open trades from API', async () => {
      const openTrades = await metaStatsClient.getAccountOpenTrades(accountId);
      openTrades.should.be.eql(expected);
      const args = requestStub.getCall(0).args;
      sinon.assert.match(args[0](host, accountId),
        {url: 'agiliumtrade.ai/users/current/accounts/1234567/open-trades',
          method: 'GET',
          headers: {'auth-token': token},
          json: true,
        }
      );
      sinon.assert.match(args[1], '1234567');
    });
  });
});
