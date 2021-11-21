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

const returnsObject = 'returns an object';
const objectPropertyMessage = 'the object has property "message"';

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
    it(returnsObject, () => {
      expect(response.body).to.be.an('object');
    });
    it(objectPropertyMessage, () => {
      expect(response.body).to.have.property('message');
    });
    it('property "message" has value "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('when name is not informed', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/users').send({
        email: 'test@email.com',
        password: '123456',
      });
    });

    it('returns status code "400"', () => {
      expect(response).to.have.status(400);
    });
    it(returnsObject, () => {
      expect(response.body).to.be.an('object');
    });
    it(objectPropertyMessage, () => {
      expect(response.body).to.have.property('message');
    });
    it('property "message" has value "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('when password is not informed', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/users').send({
        email: 'test@email.com',
        name: 'test',
      });
    });

    it('returns status code "400"', () => {
      expect(response).to.have.status(400);
    });
    it(returnsObject, () => {
      expect(response.body).to.be.an('object');
    });
    it(objectPropertyMessage, () => {
      expect(response.body).to.have.property('message');
    });
    it('property "message" has value "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('when user is succesfully created', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/users').send({
        email: 'test@test.com',
        name: 'John',
        password: '123456789',
      });
    });

    it('returns status code "201"', () => {
      expect(response).to.have.status(201);
    });
    it(returnsObject, () => {
      expect(response.body).to.be.an('object');
    });
    it(objectPropertyMessage, () => {
      expect(response.body).to.have.property('message');
    });
    it('property "message" has value "User successfully registered"', () => {
      expect(response.body.message).to.be.equal('User successfully registered');
    });
  });

  describe('when email is already registered', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/users').send({
        email: 'test@test.com',
        name: 'Test',
        password: '123456',
      });
    });

    it('returns status code "409"', () => {
      expect(response).to.have.status(409);
    });
    it(returnsObject, () => {
      expect(response.body).to.be.an('object');
    });
    it(objectPropertyMessage, () => {
      expect(response.body).to.have.property('message');
    });
    it('property "message" has value "Email already registered"', () => {
      expect(response.body.message).to.be.equal('Email already registered');
    });
  });
});