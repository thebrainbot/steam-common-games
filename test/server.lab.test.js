/* eslint-disable jest/valid-expect */
const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

exports.lab = Lab.script();

const { before, afterEach, beforeEach, describe, it } = exports.lab;
const { testInit } = require('../src/server');

describe('GET /', () => {
  let server;

  before(async () => {
    server = await testInit();
  });

  beforeEach(async () => {
    await server.initialize();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('responds with 404', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/',
    });
    expect(res.statusCode).to.equal(404);
  });
  it('responds with error and message', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/',
    });
    expect(res.result.error).to.equal('Not Found');
    expect(res.result.message).to.equal('Not Found');
  });
  it('responds with 200', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/app/status',
    });
    expect(res.statusCode).to.equal(200);
  });
});
