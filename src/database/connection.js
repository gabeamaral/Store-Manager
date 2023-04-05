const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'seuusuario',
  password: process.env.MYSQL_PASSWORD || 'suasenha',
  database: process.env.MYSQL_DATABASE || 'StoreManager',
});

module.exports = connection;