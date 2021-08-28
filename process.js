const process = require('./lib/process');

function processFile() {
  const cedula = document.getElementById('cedula-input').value;
  const excelFile = document.getElementById('excel-found').innerText;
  const table = document.getElementById('result');

  process.processFile(__dirname + '/' + excelFile, cedula)
    .then(result => showResult(result, table))
    .catch(err => table.innerText = err)
}

function cleanTable(table) {
  size = table.rows.length;
  for (let i = 1; i < size; i++) {
    table.deleteRow(1);
  }
}

function showResult(result, table) {
  cleanTable(table);
  if (result.length == 0) {
    table.innerText == 'No se encontraron resultados'
  } else {
    for (const obj of result) {
      const tr = document.createElement('tr');

      const nameTD = document.createElement('td');
      const hojaTD = document.createElement('td');
      const fechaSalidaTD = document.createElement('td');
      const diasTiempoTD = document.createElement('td');
      const observacionesTD = document.createElement('td');

      const nameT = document.createTextNode(obj.name);
      const hojaT = document.createTextNode(obj.sheet);
      const fechaSalidaT = document.createTextNode(obj.fechaSalida);
      const diasTiempoT = document.createTextNode(obj.diasTiempo);
      const observacionesT = document.createTextNode(obj.observacion);

      nameTD.appendChild(nameT);
      hojaTD.appendChild(hojaT);
      fechaSalidaTD.appendChild(fechaSalidaT);
      diasTiempoTD.appendChild(diasTiempoT);
      observacionesTD.appendChild(observacionesT);

      tr.appendChild(nameTD);
      tr.appendChild(hojaTD);
      tr.appendChild(fechaSalidaTD);
      tr.appendChild(diasTiempoTD);
      tr.appendChild(observacionesTD);

      table.appendChild(tr);
    }
  }
}