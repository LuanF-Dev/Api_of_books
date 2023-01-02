const { request } = require('express');
const express = require('express');
const server = express();
// const books = require('./src/books.json');
const fs = require('fs');
var data = fs.readFileSync('./src/books.json');
var myObject = JSON.parse(data);
const bp = require('body-parser')

server.use(bp.json())
server.use(bp.urlencoded({ extended: true }))

server.get('/books', (req, res) => {
    return res.json(myObject)
});

server.post('/books', (req, res) => {
    // console.log(req.body)
    const { ID, Genres, Title, Cover, Backdrop_path, Author, Rating, Overview } = req.body;

    const book = {
        ID,
        Genres,
        Title,
        Cover,
        Backdrop_path,
        Author,
        Rating,
        Overview
    };

    myObject[0].Books.push(book);
    // return res.json(myObject);

    var newData2 = JSON.stringify(myObject);
    fs.writeFile("./src/books.json", newData2, (err) => {
        // Error checking
        if (err) throw err;
        // console.log("New data added");
        return res.json(myObject)
    });
}); 

server.put('/books', (req, res) => {
    const { ID, Genres, Title, Cover, Backdrop_path, Author, Rating, Overview } = req.body;

    const book = {
        ID,
        Genres,
        Title,
        Cover,
        Backdrop_path,
        Author,
        Rating,
        Overview
    };

    const bookIndex = myObject[0].Books.findIndex(b => b.ID == ID);

    myObject[0].Books[bookIndex] = book;

    var newData2 = JSON.stringify(myObject);
    fs.writeFile("./src/books.json", newData2, (err) => {
        // Error checking
        if (err) throw err;
        // console.log("New data added");
        return res.json(myObject)
    });
});

server.delete('/books', (req, res) => {
    const { ID, Genres, Title, Cover, Backdrop_path, Author, Rating, Overview } = req.body;

    const bookIndex = myObject[0].Books.findIndex(b => b.ID == ID);

    myObject[0].Books.splice(bookIndex, 1)

    var newData2 = JSON.stringify(myObject);
    fs.writeFile("./src/books.json", newData2, (err) => {
        // Error checking
        if (err) throw err;
        // console.log("New data added");
        return res.json(myObject)
    });

})

server.listen(3000, () => {
    console.log("Servidor rodando");
});