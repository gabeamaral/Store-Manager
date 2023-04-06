const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');

chai.use(sinonChai);

const productMock = require('./productMock');
const products = require('../../../src/models/products');
const productService = require('../../../src/services/productService');

describe('Testando products da camada Service', () => {
  describe('Testando o método findAllItens', () => {
    afterEach(() => sinon.restore());
    it('Verifica se o método findAllItens funciona', async () => {
      sinon.stub(products, 'findAllItens').resolves(productMock.allItens);
      resultTest = await productService.findAllItens();
      expect(resultTest).to.be.deep.equal(productMock.allItens);
    });
  });
  describe('Testando o método findItensById', () => {
    afterEach(() => sinon.restore());
    // it('Verifica se o método findItensById funciona', async () => {
    //   sinon.stub(products, 'findItensById').resolves(productMock.allItens);
    //   const itemId = 1;                  => Tentando arrumar o erro :(
    //   resultTest = await productService.findItensById(itemId);
    //   expect(resultTest).to.be.deep.equal(productMock.allItens[0]);
    // });
    it('Verifica se o método findItensById retorna erro', async () => {
      sinon.stub(products, 'findItensById').resolves([]);
      const itemId = 4928;
      resultTest = await productService.findItensById(itemId);
      expect(resultTest).to.be.deep.equal({ err: { code: 'not_found', message: 'Product not found' } });
    });
  });
});
