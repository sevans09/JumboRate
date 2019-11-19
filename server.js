const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

//  app.get('/', function(req, res) {
//      res.sendFile(path.join(__dirname, 'index.html'));
//  });

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
