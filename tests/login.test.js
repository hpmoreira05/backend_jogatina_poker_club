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

describe('POST /login', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('myFirstDatabase').dropDatabase();
    MongoClient.connect.restore();
  });

  describe('When login and password is not informed', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/login').send({});
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
    it('property "message" has value "All fields must be filled"', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });
  describe('When user does not exists or invalid password', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/login').send({
        email: 'hpmoreira05@gmail.com',
        password: '123456',
      });
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
    it('property "message" has value "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });
  describe('when login is done successfully', () => {
    let response;

    before(async () => {
      const userCollection = connectionMock.db('myFirstDatabase').collection('users');

      await userCollection.insertOne({
        name: 'Test',
        email: 'test@email.com',
        password: '123456',
      });

      response = await chai.request(server).post('/login').send({
        email: 'test@email.com',
        password: '123456',
      });
    });

    it('returns status code "200"', () => {
      expect(response).to.have.status(200);
    });
    it('returns an object', () => {
      expect(response.body).to.be.an('object');
    });
    it('the object has property "token"', () => {
      expect(response.body).to.have.property('token');
    });
    it('property "token" is not empty', () => {
      expect(response.body.token).to.be.not.empty;
    });
  });
});