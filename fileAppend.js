const fs = require('fs')
function fileAppend(filePath, data) {
  fs.appendFile(filePath, data, (err) => {
    if (err) throw err
    console.log('The data was appended to file!')
  })
}
module.exports = fileAppend