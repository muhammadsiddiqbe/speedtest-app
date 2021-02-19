const start = Date.now()
const url = window.location.href
const xhr = new XMLHttpRequest()

let end = 0
let size = 0
let time = 0

xhr.addEventListener("progress", updateProgress)
xhr.addEventListener("load", transferComplete)
xhr.addEventListener("error", transferFailed)
xhr.addEventListener("abort", transferCanceled)

xhr.open('GET', url)
xhr.send()

function updateProgress(oEvent) {
  if (oEvent.lengthComputable) {
    if (!size) {
      size = oEvent.total
      document.querySelector('#size').innerHTML = `${Number.parseFloat(size / 1024 / 1024).toFixed(2)} MB`
    }

    var percentComplete = oEvent.loaded / oEvent.total * 100
    document.querySelector('#progress').innerHTML = `${parseInt(percentComplete, 10)}%`
  }
}

function transferComplete(evt) {
  console.log('The transfer is complete.')
  end = Date.now()

  time = (end - start) / 1000
  document.querySelector('#time').innerHTML = `${parseInt(time, 10)} seconds`
  document.querySelector('#speed').innerHTML = `${Number.parseFloat(size / time / 1024).toFixed(2)} kB/s`
}

function transferFailed(evt) {
  console.log('An error occurred while transferring the file.');
}

function transferCanceled(evt) {
  console.log('The transfer has been canceled by the user.');
}