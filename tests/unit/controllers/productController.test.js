const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');

chai.use(sinonChai);

const connection = require('../../../src/database/connection');
const productMock = require('./productMock');
const productService = require('../../../src/services/productService');
const productController = require('../../../src/controllers/productController');

describe('Testando products da camada Controller', () => {
  describe('Testando o método findAllItens', () => {
    afterEach(() => sinon.restore());
    const req = {};
    const res = {};
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    it(`Verifica se o método findAllItens funciona e 
      retorna o status 200`, async () => {
        sinon.stub(productService, 'findAllItens').resolves(productMock.allItens);
        await productController.findAllItens(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productMock.allItens);
    });
  });
  describe('Testando o método findItensById', () => {
    afterEach(() => sinon.restore());
    const req = { params: { id: 1 } };
    const res = {};
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    it('Verifica se o método findItensById funciona e retorna o status 200', async () => {
      sinon.stub(productService, 'findItensById').resolves(productMock.oneItem);
      await productController.findItensById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productMock.oneItem[0]);
    });
  });
});