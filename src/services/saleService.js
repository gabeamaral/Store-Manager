const salesM = require('../models/sales');

const createSales = async (sales) => {
  console.log(sales, 'sales');
  const idSale = await salesM.createDate();
  await Promise.all(sales.map(async (sale) => {
    await salesM.createSales(sale, idSale);
  }));
  const createdSale = {
    id: idSale,
    itemsSold: sales,
  };
  const res = { status: 201, newSale: createdSale };
  return res;
};

const findAllSales = async () => {
  const allSales = await salesM.findAllSales();
  return allSales;
};

const findSaleById = async (id) => {
  const idSale = await salesM.findSaleById(id);
  if (!idSale || idSale.length === 0) {
    return { err: { code: 'not_found', message: 'Sale not found' } };
  }
  return idSale;
};

module.exports = {
  findAllSales,
  findSaleById,
  createSales,
};