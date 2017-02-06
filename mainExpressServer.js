const express = require('express')
const app = express()
const fs = require('fs')
//const syncFileRead = require('./syncFileRead')
const asyncFileRead = require('./fileReadUsingPromises')
const appendFile = require('./fileAppend')
const bodyParser = require('body-parser')
const changeFile = require('./filechange')
const fileDelete = require('./fileDelete')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
const filePath1 = '/Users/aritraaritra/Documents/basic-node-forms/index.html'
const filePath2 = '/Users/aritraaritra/Documents/basic-node-forms/sampleTextFile.txt'
app.get('/read', function (req, response) {
  asyncFileRead(filePath1)
  .then((data) => {
    const fileArray = data.toString().split('ol')
    asyncFileRead(filePath2)
      .then((data) => {
        const orderedList = data.toString().split('\n')
        let contentToAdd = ''
        orderedList.forEach((element) => {
          contentToAdd += '<li>' + element + '</li>'
        })
        fileArray[1] = `>${contentToAdd}<`
        const text = fileArray.join('ol')
        fs.writeFile(filePath1, text, (err) => {
          if (err) throw err
          //console.log('It\'s saved!')
        })
      })

  })
  .catch((error) => {
    console.error(error)
  })
  response.sendFile(filePath1)
})
app.post('/write/', function (req, response) {
  const data = req.body.writeFile
  appendFile(filePath2, `\n${data}`)
  response.redirect('http://localhost:3009/read')
})
app.post('/update/', function (req, response) {
  const lineNumber = req.body.lineNumberUpdate
  const dataToWrite = req.body.updateFile
  const isValid = changeFile(filePath2, lineNumber, dataToWrite)
  if (isValid < 0) {
    response.send(500)
  }
  response.redirect('http://localhost:3009/read')
})
app.post('/destroy/', function (req, response) {
  const lineNumber = req.body.lineNumberDelete
  const isValid = fileDelete(filePath2, lineNumber)
  if (isValid < 0)
    response.send(500)
  response.redirect('http://localhost:3009/read')
})
app.listen(3009)
