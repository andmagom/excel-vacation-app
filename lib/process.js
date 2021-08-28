const ExcelJS = require('exceljs');
const moment = require('moment');
moment.suppressDeprecationWarnings = true

const workbook = new ExcelJS.Workbook();

async function processFile(nameFile, cedula) {
  return await workbook.xlsx.readFile(nameFile)
    .then(res => search(res, cedula))
    .catch(err => console.log(err));
}

async function search(workbook, cedula) {
  const founds = [];
  const bypass = ['Convenciones', 'Hoja1']
  workbook.worksheets.forEach(worksheet => {
    if (bypass.includes(worksheet.name)) return;
    worksheetName = worksheet.name
    rowCount = worksheet.rowCount
    for (let i = 1; i <= rowCount; i++) {
      row = worksheet.getRow(i)
      cedulaRow = row.getCell(4).value;
      if (cedulaRow == cedula) {
        const obj = {};
        obj.sheet = worksheetName;
        obj.name = row.getCell(5).toString().trim()
        fechaSalida = row.getCell(6).toString().trim()
        obj.fechaSalida = moment(fechaSalida).add(5, 'h').format("DD/MM/YY")

        if (obj.fechaSalida == null) {
          obj.fechaSalida = fechaSalida;
        }

        obj.diasTiempo = row.getCell(7).toString().trim()
        obj.observacion = row.getCell(8).toString().trim()
        founds.push(obj);
      }
    }
  });
  return founds;
}

/*
processFile(__dirname + '/../1. Base de datos.xlsx', '1083881350')
  .then(result => console.log(result))
  .catch(err => console.log(err))
*/

module.exports = {
  processFile
}