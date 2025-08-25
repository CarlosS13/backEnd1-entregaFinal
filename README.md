# Primera Entrega - Coderhouse

Este proyecto es la **primer entrega** del curso BackEnd1 en Coderhouse. Consiste en un servidor básico desarrollado con Node.js y Express, que permite gestionar productos y carritos de compras, almacenando la información en archivos JSON.

## Tecnologías utilizadas

- Node.js
- Express
- JavaScript
- Persistencia de datos en archivos JSON

## ¿Cómo utilizarlo?

1. Instala las dependencias:
   ```
   npm install
   ```

2. Inicia el servidor:
   ```
   node src/app.js
   ```

3. El servidor estará disponible en el puerto 8080.

4. Puedes interactuar con la API usando Postman o cualquier cliente HTTP, utilizando las siguientes rutas principales:

   - **Productos:**  
     - `GET /api/products`  
     - `POST /api/products`  
     - `GET /api/products/:pid`  
     - `PUT /api/products/:pid`  
     - `DELETE /api/products/:pid`

   - **Carritos:**  
     - `POST /api/carts`  
     - `GET /api/carts/:cid`  
     - `POST /api/carts/:cid/product/:pid`

## Resumen

Este proyecto permite crear, consultar, modificar y eliminar productos, así como gestionar carritos de compras, todo a través de una API
Carlos Sanchez.