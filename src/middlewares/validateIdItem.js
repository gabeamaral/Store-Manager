const productService = require('../services/productService');

const validateIdItem = async (req, res, next) => {
  const { id } = req.params;
  console.log(id, 'id');
  const idProduct = await productService.findItensById(id);
  console.log(idProduct, 'idProduct');
  if (idProduct.err) {
    return res.status(404).json(idProduct.err);
  }
  next();
};

module.exports = validateIdItem;