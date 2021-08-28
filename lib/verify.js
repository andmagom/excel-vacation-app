const fs = require('fs');
const path = require('path')

function getExcelFile(pathApp) {
  let files = [];
  console.log(pathApp)
  fs.readdirSync(pathApp)
    .filter(file => path.extname(file) == '.xlsx' || path.extname(file) == '.xls')
    .forEach(file => {
      console.log(file)
      files.push(file)
    })
  return files;
}

module.exports = {
  getExcelFile
}