const productService = require('../services/productService');

const findAllItens = async (_req, res) => {
  const product = await productService.findAllItens();
  res.status(200).json(product);
};

const findItensById = async (req, res) => {
  const { id } = req.params;
  const idProduct = await productService.findItensById(id);
  if (idProduct.err) {
    return res.status(404).json(idProduct.err);
  }
  return res.status(200).json(idProduct[0]);
};

const createItems = async (req, res) => {
  const { name } = req.body;
  const id = await productService.createItems(name);
  if (id.status) {
    return res.status(id.status).json(id.response);
  };
  return res.status(201).json({ id, name });
};

module.exports = {
  findAllItens,
  findItensById,
  createItems,
};