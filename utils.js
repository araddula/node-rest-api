const fs = require('fs');
const path = require('path');

const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on('data', (chunk) => {
        body += chunk.toString()
      });

      req.on('end', () => {
        resolve(body)
      });
    } catch (e) {
      reject(e)
    }
  });
}

const writeDataToFile = (content) => {
  fs.writeFileSync(path.join(__dirname, 'data', 'products.json'), JSON.stringify(content), 'utf-8', (err) => {
    if(err) {
      throw err;
    }
  });
}

module.exports = {
  getRequestBody,
  writeDataToFile
}