const fs = require('fs')
const inputPath = '/Users/aritraaritra/Documents/basic-node-forms/index.html'
const filePath = '/Users/aritraaritra/Documents/basic-node-forms/sampleTextFile.txt'
let readFileAsync = function (inputPath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(inputPath, 'utf-8', function (err, data) {
      if (err)
        reject(err)
      else
        resolve(data)
    })
  })
}


// readFileAsync(inputPath)
//   .then((data) => {
//     const fileArray = data.toString().split('ol')
//     readFileAsync(filePath)
//       .then((data) => {
//         const orderedList = data.toString().split('\n')
//         let contentToAdd = ''
//         orderedList.forEach((element) => {
//           contentToAdd += '<li>' + element + '</li>'
//         })
//         fileArray[1] = `>${contentToAdd}<`
//         const text = fileArray.join('ol')
//         console.log(contentToAdd)
//         fs.writeFile(inputPath, text, (err) => {
//           if (err) throw err
//           console.log('It\'s saved!')
//         })
//       })

//   })
//   .catch((error) => {
//     console.error(error)
//   })


module.exports = readFileAsync

// NOTE - ANOTHER IMPLEMENTATION -- readFileAsync = new Promise(function (resolve, reject) { 
