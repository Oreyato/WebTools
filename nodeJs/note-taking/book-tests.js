const fs = require('fs');

// Serializing with JSON ======================

// Javascript object
const book = {
    title: 'Le discours de la méthode',
    author: 'René Descartes'
};

// Converted to JSON
const bookData = JSON.stringify(book);
console.log(bookData);
// console.log(bookData.title) won't work

// Deserializing with JSON ====================
// JSON to object
const parsedData = JSON.parse(bookData);
console.log(parsedData.title); // work this time

// Save JSON files and read from them =========
// Store into a file 
fs.writeFileSync('book.json', bookData);

// Read the file
const dataBuffer = fs.readFileSync('book.json');
const dataJSON = dataBuffer.toString();
const loadedBook = JSON.parse(dataJSON);
console.log(loadedBook.author);