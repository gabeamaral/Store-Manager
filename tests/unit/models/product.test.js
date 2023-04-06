const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../../src/database/connection");
const productMock = require('./productMock')
const products = require("../../../src/models/products");

describe('Testando products da camada Model', () => {
  describe('Testando o método findAllItens', () => {
    afterEach(() => sinon.restore());
    it('Verifica se o método findAllItens funciona', async () => {
      sinon.stub(connection, 'execute').resolves([productMock.allItens]);
      resultTest = await products.findAllItens();
      expect(resultTest).to.be.deep.equal(productMock.allItens);
    });
  });
  describe('Testando o método findItensById', () => {
    afterEach(() => sinon.restore());
    it('Verifica se o método findItensById funciona', async () => {
      sinon.stub(connection, 'execute').resolves([productMock.allItens[0]]);
      resultTest = await products.findItensById(2);
      expect(resultTest).to.be.deep.equal(productMock.oneItem);
    });
  });
});
