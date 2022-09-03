const productModel = require("../models/productModel");
const { getRequestBody } = require("../utils");

const responseHeader = { 'Content-Type': 'application/json'}

const getProducts = async (req, res) => {
  const products = await productModel.getAll();
  res.writeHead(200, responseHeader);
  res.end(JSON.stringify(products));
}

const getProduct = async (req, res, id) => {
  try {
    const product = await productModel.getByID(id);
    if(!product) {
      res.writeHead(404, responseHeader);
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, responseHeader);
      res.end(JSON.stringify(product));
    }
  } catch (e) {
    res.writeHead(500, responseHeader);
    res.end(JSON.stringify({ message: "Server Error" }));
  }
}

const createProduct = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { name, description, price } = JSON.parse(body);
    if(name && description && price) {
      const product = await productModel.create({
        name,
        description,
        price
      });
      res.writeHead(201, responseHeader);
      res.end(JSON.stringify(product));
    } else {
      res.writeHead(200, responseHeader);
      res.end(JSON.stringify({ message: "Error: name, description, price details required"}));
    }
  } catch (e) {
    res.writeHead(500, responseHeader);
    res.end(JSON.stringify({ message: "Server Error" }));
  } 
}

const updateProduct = async (req, res, id) => {
  try {
    const body = await getRequestBody(req);
    const updateObject = JSON.parse(body);
    const updatedProduct = await productModel.update(updateObject, id);
    if(!updatedProduct) {
      res.writeHead(404, responseHeader);
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, responseHeader);
      res.end(JSON.stringify(updatedProduct));
    }
  } catch (e) {
    res.writeHead(500, responseHeader);
    res.end(JSON.stringify({ message: "Server Error" }));
  } 
}

const deleteProduct = async (req, res, id) => {
  try {
    const deletedId = await productModel.remove(id);
    if(!deletedId) {
      res.writeHead(404, responseHeader);
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, responseHeader);
      res.end(JSON.stringify({ message: `Product ${deletedId} deleted` }));
    }
  } catch (e) {
    res.writeHead(500, responseHeader);
    res.end(JSON.stringify({ message: "Server Error" }));
  }
}


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}