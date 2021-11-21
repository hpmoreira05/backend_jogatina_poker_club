/* eslint-disable no-unused-expressions */
/* eslint-disable mocha/no-mocha-arrows */
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const server = require('../src/app');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

describe('GET /posts', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('When there is no post', () => {
    let response;

    before(async () => {
      response = await chai.request(server).get('/posts').send();
    });

    it('returns status code "200"', () => {
      expect(response).to.have.status(200);
    });
    it('returns an array', () => {
      expect(response.body).to.be.an('array');
    });
    it('array is empty', () => {
      expect(response.body).to.have.lengthOf(0);
    });
  });
});