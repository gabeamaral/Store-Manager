const express = require('express');
const productControler = require('./controllers/productController');
const salesController = require('./controllers/salesController');
const validateItem = require('./middlewares/validateItem');
const validateIdItem = require('./middlewares/validateIdItem');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.get('/products', productControler.findAllItens);
app.get('/products/:id', productControler.findItensById);
app.post('/products', validateItem, productControler.createItems);
app.put('/products/:id', validateItem, productControler.updateItems);
app.delete('/products/:id', validateIdItem, productControler.deleteItems);
app.get('/sales', salesController.findAllSales);
app.get('/sales/:id', salesController.findSaleById);
app.post('/sales', salesController.createSales);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;