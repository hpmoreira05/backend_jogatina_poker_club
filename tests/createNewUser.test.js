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

describe('POST /users', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('When email is not informed', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/users').send({
        name: 'test',
        password: '123456',
      });
    });

    it('returns status code "400"', () => {
      expect(response).to.have.status(400);
    });
    it('returns an object', () => {
      expect(response.body).to.be.an('object');
    });
    it('the object has property "message"', () => {
      expect(response.body).to.have.property('message');
    });
    it('property "message" has value "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });
});