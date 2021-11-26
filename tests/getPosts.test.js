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

  after(async () => {
    await connectionMock.db('myFirstDatabase').dropDatabase();
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

  describe('when there is some post created', () => {
    let response;

    before(async () => {
      const userCollection = connectionMock.db('myFirstDatabase').collection('users');

      await userCollection.insertOne({
        name: 'Tester',
        email: 'test@email.com',
        password: '123456',
      });

      const token = await chai.request(server).post('/users/login').send({
        email: 'test@email.com',
        password: '123456',
      });

      await chai.request(server).post('/posts')
      .set('authorization', token.body.token)
      .send({
        title: 'Lorem Ipsum',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor moles.',
      });

      response = await chai.request(server).get('/posts').send();
    });

    it('returns status code "200"', () => {
      expect(response).to.have.status(200);
    });
    it('returns an array', () => {
      expect(response.body).to.be.an('array');
    });
    it('returns one array of objects', () => {
      expect(response.body[0]).to.be.an('object');
    });
    it('the object keys are: "_id", "title", "description", "createdAt" and "userId"', () => {
      expect(response.body[0]).to.have.property('_id');
      expect(response.body[0]).to.have.property('title');
      expect(response.body[0]).to.have.property('description');
      expect(response.body[0]).to.have.property('createdAt');
      expect(response.body[0]).to.have.property('userId');
    });
  });
});