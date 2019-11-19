const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.get('/styles.css', function(req, res) {
     res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/', function(req, res) {
     res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/search', function(req, res) {
     res.sendFile(path.join(__dirname, 'search.html'));
});

app.get('/rate', function(req, res) {
     res.sendFile(path.join(__dirname, 'rate.html'));
});

app.get('/about', function(req, res) {
     res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/guidelines', function(req, res) {
     res.sendFile(path.join(__dirname, 'guidlines.html'));
});

app.get('/contact', function(req, res) {
     res.sendFile(path.join(__dirname, 'contact.html'));
});


app.listen(port);
console.log('Running at Port 5000');
