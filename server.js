const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');

app.get('/styles.css', function(req, res) {
     res.sendFile(path.join(__dirname, 'public/stylesheets/styles.css'));
});

app.get('/', function(req, res) {
     res.render('pages/index');
});

app.get('/home', function(req, res) {
     res.render('pages/index');
});

app.get('/search', function(req, res) {
     res.render('pages/search');
});

app.get('/search_result', function(req, res) {
     res.render('pages/search_result');
});

app.get('/rate', function(req, res) {
     res.render('pages/rate');
});

app.get('/about', function(req, res) {
     res.render('pages/about');
});

app.get('/guidelines', function(req, res) {
     res.render('pages/guidelines');
});

app.get('/contact', function(req, res) {
     res.render('pages/contact');
});

app.get('/login', function(req, res) {
     res.render('pages/login');
});

app.listen(port);
console.log('Running at Port 5000');
