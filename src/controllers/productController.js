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
  }
  return res.status(201).json({ id, name });
};

const updateItems = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const exist = await productService.findItensById(id);
    console.log(exist, 'exist');
    if (exist.err) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const updatedItem = await productService.updateItems(id, name);
    if (updatedItem) return res.status(200).json({ id, name });
    return res.status(404).json({ message: 'Product not updated' });
  } catch (error) {
    next(error);
  }
};

const deleteItems = async (req, res) => {
  const { id } = req.params;
  const deletedItems = await productService.deleteItems(id);
  if (deletedItems.affectedRows === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(204).json();
};

module.exports = {
  findAllItens,
  findItensById,
  createItems,
  updateItems,
  deleteItems,
};