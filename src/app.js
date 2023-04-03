const express = require('express');
const productControler = require('./controllers/productController');
const validateItem = require('./middlewares/validateItem');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.get('/products', productControler.findAllItens);
app.get('/products/:id', productControler.findItensById);
app.post('/products', validateItem, productControler.createItems);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;