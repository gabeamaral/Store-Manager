const salesM = require('../models/sales');

const validateQuantity = async (sale) => {
  const saleMap = sale.map((salesSales) => {
    const { quantity } = salesSales;
    if (quantity <= 0) {
      return { status: 422, message: '"quantity" must be greater than or equal to 1' };
    }
    if (!quantity) {
      return { status: 400, message: '"quantity" is required' };
    }
    return true;
  });
  return saleMap;
};

const validateId = async (sale) => {
  const idTotal = await salesM.idTotal();
  const idMap = sale.map((salesSales) => {
    const { productId } = salesSales;
    if (!productId) {
      return { status: 400, message: '"productId" is required' };
    }
    if (productId > idTotal) {
      console.log('entrei');
      return { status: 404, message: 'Product not found' };
    }
    return true;
  });
  return idMap;
};

module.exports = {
  validateQuantity,
  validateId,
};
