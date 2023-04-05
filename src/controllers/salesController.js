const saleService = require('../services/saleService');
const validateSale = require('../middlewares/validateSale');

const createSales = async (req, res) => {
  const sales = req.body;
  const validateCreate = await validateSale.validateId(sales);
  const validacao = validateCreate.find((element) => element.status);
  if (validacao) {
    const msgError = validacao.message;
    return res
      .status(validacao.status).json({ message: msgError });
  }

  const validateQuantityCreated = await validateSale.validateQuantity(sales);
  const validacaoQuantity = validateQuantityCreated.find((element) => element.status);
  if (validacaoQuantity) {
    const msgError = validacaoQuantity.message;
    return res
      .status(validacaoQuantity.status).json({ message: msgError });
  }

  const response = await saleService.createSales(sales);
  return res.status(response.status).json(response.newSale);
};

const findAllSales = async (_req, res) => {
  const allSales = await saleService.findAllSales();
  res.status(200).json(allSales);
};

const findSaleById = async (req, res) => {
  const { id } = req.params;
  const idSale = await saleService.findSaleById(id);
  if (idSale.err) {
    return res.status(404).json(idSale.err);
  }
  res.status(200).json(idSale);
};

module.exports = {
  findAllSales,
  findSaleById,
  createSales,
};  