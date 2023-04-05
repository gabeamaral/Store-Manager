const connection = require('../database/connection');

const findAllSales = async () => {
  const querySales = `SELECT
    (sp.sale_id) AS saleId,
    (s.date) AS date,
    (sp.product_id) AS productId,
    (sp.quantity) AS quantity
  FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS s ON s.id = sp.sale_id
      ORDER BY sp.sale_id ASC, sp.product_id ASC`;
  const [allSales] = await connection.execute(querySales);
  return allSales;
};

const findSaleById = async (id) => {
  const queryId = `SELECT
  (s.date) AS date,
      (sp.product_id) AS productId,
      (sp.quantity) AS quantity
      FROM StoreManager.sales_products AS sp
      JOIN StoreManager.sales AS s ON s.id = sp.sale_id
        WHERE sp.sale_id = ?`;
  const [idSale] = await connection.execute(queryId, [id]);
  return idSale;
};

const createSales = async (sale, idSale) => {
  console.log(idSale, 'service');
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [idSale, sale.productId, sale.quantity],
  );
};

const createDate = async () => {
  const [date] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES(NOW())',
  );
  console.log(date, 'date');
  const { insertId } = date;
  return insertId;
};

const idTotal = async () => {
  const [id] = await connection.execute(
    'Select Max(id) as id from products',
  );
  return id[0].id;
};

module.exports = {
  findAllSales,
  findSaleById,
  idTotal,
  createSales,
  createDate,
};