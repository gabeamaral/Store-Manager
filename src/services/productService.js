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

const createItems = async (name) => {
  const createdItems = await products.createItems(name);
  return createdItems;
};

const updateItems = async (id, name) => {
  const updatedItems = await products.updateItems(id, name);
  return updatedItems;
};

const deleteItems = async (id) => {
  const deletedItems = await products.deleteItems(id);
  return deletedItems;
};

module.exports = {
  findAllItens,
  findItensById,
  createItems,
  updateItems,
  deleteItems,
};