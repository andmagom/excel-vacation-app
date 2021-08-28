const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')
const app = require('electron').remote.app

const verification = require('./lib/verify');

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text, className) => {
    const element = document.getElementById(selector)
    if (element) {
      element.innerText = text
      element.className = className
    }
  }

  const files = verification.getExcelFile(path.dirname(app.getPath('exe')));

  if (files.length == 1) {
    replaceText('excel-found', files[0], 'found')
  } else if (files.length == 0) {
    replaceText('excel-found', 'Ningún archivo de excel encontrado', 'error')
  } else {
    replaceText('excel-found', 'Multiples archivos de excel encontrados, dejar solo uno', 'error')
  }
})