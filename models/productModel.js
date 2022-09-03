const products = require("../data/products.json");
const uuidV4 = require('uuid');
const { writeDataToFile } = require('../utils');

const getAll = () => {
  return new Promise((resolve, reject) => {
    resolve(products);
  })
}

const getByID = (id) => {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product)
  })
}

const create = (product) => {
  return new Promise((resolve, reject) => {
    try {
      const newProduct = {
        id: uuidV4.v4(), 
        ...product
      };
      products.push(newProduct);
      writeDataToFile(products);
      resolve(newProduct);
    } catch (e) {
      reject(e);
    }
  });
}

const update = (product, id) => {
  return new Promise((resolve, reject) => {
      const productIndex = products.findIndex((p) => p.id === id);
      const { id: pId, name, description, price } = products[productIndex];
      products[productIndex] = {
        id: pId,
        name: product.name || name,
        description: product.description || description,
        price: product.price || price
      }
      writeDataToFile(products);
      resolve(products[productIndex]);
  });
}

const remove = (id) => {
  return new Promise((resolve, reject) => {
    const productIndex = products.findIndex((p) => p.id === id);
    if(productIndex > -1) {
      products.splice(productIndex, 1);
      writeDataToFile(products);
      resolve(id)
    } else {
      resolve();
    }
  });
}


module.exports = {
  getAll,
  getByID,
  create,
  update,
  remove
}