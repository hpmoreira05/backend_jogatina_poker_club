/* eslint-disable mocha/no-mocha-arrows */
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = require('chai');
const server = require('../src/app');

chai.use(chaiHttp);

describe('POST /login', () => {
  describe('When login and password is not informed', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/login').send({});
    });

    it('returns status code "401"', () => {
      expect(response).to.have.status(401);
    });
    it('returns a object', () => {
      expect(response.body).to.be.an('object');
    });
    it('the object has property "message"', () => {
      expect(response.body).to.have.property('message');
    });
    it('property "message" has value "All fields must be filled"', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });
  describe('When user does not exists or invalid password', () => {});
  describe('when login is done successfully', () => {});
});