const products = require('../models/products');

const findAllItens = async () => {
  const product = await products.findAllItens();
  return product;
};

const findItensById = async (id) => {
  const idProduct = await products.findItensById(id);
  if (idProduct.length === 0) {
    return { err: { code: 'not_found', message: 'Product not found' } };
  }
  return idProduct;
};

module.exports = {
  findAllItens,
  findItensById,
};