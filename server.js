const http = require('http');
const { 
  getProducts, 
  getProduct, 
  createProduct,
  updateProduct,
  deleteProduct
} = require("./controllers/productController");

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
    res.writeHead(404, { 'Content-Type': "application/json"});
    res.end(JSON.stringify({ message: "Not Found"}));
  }
});

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => { console.log(`Server running on port ${PORT}`)});
