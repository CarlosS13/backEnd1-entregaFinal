# Entrega final - Backend Ecommerce

Este proyecto es una API y aplicación web para la gestión de productos y carritos de compras, utilizando **MongoDB** como sistema de persistencia principal y **Express** como framework de servidor.

## Características

- Persistencia de productos y carritos en MongoDB.
- Endpoints RESTful para productos y carritos.
- Consultas de productos con filtros, paginación y ordenamiento.
- Gestión profesional de carritos: agregar, eliminar, actualizar productos y cantidades.
- Vistas dinámicas con Handlebars para productos, detalle de producto y carrito.
- Relación entre carritos y productos usando referencias y `populate`.

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   cd TU_REPOSITORIO
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura tu conexión a MongoDB:
   - Crea un archivo `.env` en la raíz del proyecto con la siguiente variable:
     ```
     MONGO_URI=mongodb://localhost:27017/ecommerce
     ```
   - Puedes usar tu propia URI de MongoDB Atlas si lo prefieres.

## Ejecución

Inicia el servidor con:

```
node src/app.js
```
o si tienes configurado un script en `package.json`:
```
npm start
```

## Endpoints principales

### Productos

- `GET /api/products`  
  Consulta productos con filtros, paginación y ordenamiento.  
  Query params: `limit`, `page`, `sort`, `query`.

- `GET /api/products/:pid`  
  Consulta detalle de un producto.

### Carritos

- `GET /api/carts/:cid`  
  Consulta un carrito específico con productos populados.

- `DELETE /api/carts/:cid/products/:pid`  
  Elimina un producto del carrito.

- `PUT /api/carts/:cid`  
  Actualiza todos los productos del carrito.

- `PUT /api/carts/:cid/products/:pid`  
  Actualiza la cantidad de un producto en el carrito.

- `DELETE /api/carts/:cid`  
  Vacía el carrito.

## Vistas

- `/products`  
  Lista de productos con paginación y botón para agregar al carrito.

- `/products/:pid`  
  Detalle de producto y opción para agregar al carrito.

- `/carts/:cid`  
  Vista de carrito con productos, opción para actualizar cantidad, eliminar y vaciar carrito.

## Notas

- La carpeta `node_modules` está ignorada por `.gitignore`.
- La carpeta `public` incluye un archivo `.gitkeep` para ser rastreada por git.
- Los datos de ejemplo pueden migrarse desde los archivos JSON a MongoDB si lo necesitas.

---

**Autor:** CarlosS13 