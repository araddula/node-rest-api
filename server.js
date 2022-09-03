const http = require('http');
const fs = require('fs');
const path = require('path');

const { 
  getProducts, 
  getProduct, 
  createProduct,
  updateProduct,
  deleteProduct
} = require("./public/controllers/productController");

const READ_API_MATCH = "/api/products";
const WRITE_API_MATCH = /\/api\/products\/\w+/;

const server = http.createServer((req, res) => {
  const id = req.url.split("/")[3];
  if(req.url === READ_API_MATCH && req.method === "GET") {
    getProducts(req, res);
  } else if(req.url.match(WRITE_API_MATCH) && req.method === "GET") {
    getProduct(req, res, id);
  } else if(req.url === READ_API_MATCH && req.method === "POST") {
    createProduct(req, res);
  } else if(req.url.match(WRITE_API_MATCH) && req.method === "PUT") {
    updateProduct(req, res, id);
  } else if(req.url.match(WRITE_API_MATCH) && req.method === "DELETE") {
    deleteProduct(req, res, id);
  } else {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
      if(err) {
        if(err.code === "ENOENT") {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("<h2>Not Found</h2>", 'utf-8');
        }
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
      } 
    });
  }
});

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => { console.log(`Server running on port ${PORT}`)});
