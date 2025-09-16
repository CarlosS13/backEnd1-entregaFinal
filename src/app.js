const express = require('express');
const path = require('path');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const ProductManager = require('./managers/ProductManager');
const productManager = new ProductManager(path.join(__dirname, 'data', 'products.json'));

const viewsRouter = express.Router();

viewsRouter.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products });
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
});

app.use('/', viewsRouter);

const httpServer = app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});

const io = new Server(httpServer);

app.set('io', io);

io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado');

  socket.emit('products', await productManager.getProducts());

  socket.on('addProduct', async (productData) => {
    await productManager.addProduct(productData);
    const products = await productManager.getProducts();
    io.emit('products', products); 
  });

  socket.on('deleteProduct', async (productId) => {
    await productManager.deleteProduct(productId);
    const products = await productManager.getProducts();
    io.emit('products', products); 
  });
});