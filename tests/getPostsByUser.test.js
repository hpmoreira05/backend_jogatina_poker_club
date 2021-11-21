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

describe('GET /posts/myposts', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('When user is not logged in', () => {
    let response;

    before(async () => {
      response = await chai.request(server).get('/posts/myposts').send();
    });

    it('returns status code "401"', () => {
      expect(response).to.have.status(401);
    });
    it('returns an object', () => {
      expect(response.body).to.be.an('object');
    });
    it('the object has property "message"', () => {
      expect(response.body).to.have.property('message');
    });
    it('property "message" has value "Missing auth token"', () => {
      expect(response.body.message).to.be.equal('Missing auth token');
    });
  });

  describe('when token is invalid', () => {
    let response;

    before(async () => {
      response = await chai.request(server).get('/posts/myposts')
      .set('authorization', 'sdsdfs544312sdfsd1a8g2d2s8r');
    });

    it('returns status code "401"', () => {
      expect(response).to.have.status(401);
    });
    it('returns an object', () => {
      expect(response.body).to.be.an('object');
    });
    it('the object has property "message"', () => {
      expect(response.body).to.have.property('message');
    });
    it('property "message" has value "JWT malformed"', () => {
      expect(response.body.message).to.be.equal('JWT malformed');
    });
  });

  describe('when there is nothing posted', () => {
    let response;

    before(async () => {
      const userCollection = connectionMock.db('myFirstDatabase').collection('users');

      await userCollection.insertOne({
        name: 'Tester',
        email: 'test@email.com',
        password: '123456',
      });

      const token = await chai.request(server).post('/login').send({
        email: 'test@email.com',
        password: '123456',
      });

      response = await chai.request(server).get('/posts/myposts')
      .set('authorization', token.body.token);
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