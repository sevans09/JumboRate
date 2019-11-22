const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.get('/styles.css', function(req, res) {
     res.sendFile(path.join(__dirname, 'public/stylesheets/styles.css'));
});

app.get('/', function(req, res) {
     res.sendFile(path.join(__dirname, 'public/pages/index.html'));
});

app.get('/index.html', function(req, res) {
     res.sendFile(path.join(__dirname, 'public/pages/index.html'));
});

app.get('/search.html', function(req, res) {
     res.sendFile(path.join(__dirname, 'public/pages/search.html'));
});

app.get('/search_result.html', function(req, res) {
     res.sendFile(path.join(__dirname, 'public/pages/search_result.html'));
});

app.get('/rate.html', function(req, res) {
     res.sendFile(path.join(__dirname, 'public/pages/rate.html'));
});

app.get('/about.html', function(req, res) {
     res.sendFile(path.join(__dirname, 'public/pages/about.html'));
});

app.get('/guidelines.html', function(req, res) {
     res.sendFile(path.join(__dirname, 'public/pages/guidelines.html'));
});

app.get('/contact.html', function(req, res) {
     res.sendFile(path.join(__dirname, 'public/pages/contact.html'));
});


app.listen(port);
console.log('Running at Port 5000');
