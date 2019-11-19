const express = require('express');
const app = express();
const path = require('path');
app.get('/', function(req, res) {
     res.sendFile(path.join(__dirname, 'index.html'));
 });

app.get('/styles.css', function(req, res) {
     res.sendFile(path.join(__dirname, 'styles.css'));
});

app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
