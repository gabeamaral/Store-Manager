const connection = require('../database/connection');

const findAllItens = async () => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return product;
};

const findItensById = async (id) => {
  const [idProduct] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?',
    [id],
  );
  return idProduct;
};

const createItems = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return insertId;
};

const updateItems = async (id, name) => {
  const itemsUpdated = await connection.execute(
    'UPDATE StoreManager.products SET name=? WHERE id=?',
    [name, id],
  );
  if (itemsUpdated) return true;
  return false;
};

module.exports = {
  findAllItens,
  findItensById,
  createItems,
  updateItems,
};