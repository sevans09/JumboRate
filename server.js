const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.get('/', function(req, res) {
     res.sendFile(path.join(__dirname, 'index.html'));
 });

app.get('/styles.css', function(req, res) {
     res.sendFile(path.join(__dirname, 'styles.css'));
});


app.listen(port);

console.log('Running at Port 5000');
