// server.js
// Defines all requests 

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

/**********    ROUTES   **********/

// Style Files
app.get('/styles.css', function(req, res) {
     res.sendFile(path.join(__dirname, 'public/stylesheets/styles.css'));
});

app.get('/nevis.ttf', function(req, res) {
     res.sendFile(path.join(__dirname, '.fonts/nevis.ttf'));
});

// JavaScript Files
app.get('/firebase.js', function(req, res) {
     res.sendFile(path.join(__dirname, 'js/firebase/firebase.js'));
});

app.get('/index.js', function(req, res) {
     res.sendFile(path.join(__dirname, 'js/index.js'));
});

app.get('/search.js', function(req, res) {
     res.sendFile(path.join(__dirname, 'js/search.js'));
});

app.get('/search_result.js', function(req, res) {
     res.sendFile(path.join(__dirname, 'js/search_result.js'));
});

app.get('/rate.js', function(req, res) {
     res.sendFile(path.join(__dirname, 'js/rate.js'));
});

app.get('/click.js', function(req, res) {
     res.sendFile(path.join(__dirname, 'js/authentication/click.js'));
});

app.get('/login.js', function(req, res) {
     res.sendFile(path.join(__dirname, 'js/authentication/login.js'));
});

// Data Files
app.get('/tufts_logo.png', function(req, res) {
     res.sendFile(path.join(__dirname, 'views/images/tufts_logo.png'));
});

app.get('/profile_icon.png', function(req, res) {
     res.sendFile(path.join(__dirname, 'views/images/profile_icon.png'));
});

app.get('/departments_json', function(req, res) {
     res.sendFile(path.join(__dirname, 'views/partials/departments.json'));
});

// HTML Page Files
app.get('/', function(req, res) {
     res.render('pages/index');
});

app.get('/home', function(req, res) {
     res.render('pages/index');
});

app.get('/search', function(req, res) {
     res.render('pages/search');
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

/**********    FIREBASE DATABASE   **********/

// Initalize database 
var firebase = require('firebase');
var firebaseConfig = {
     apiKey: "AIzaSyC9j40ZN83GVo9IfXUkyh8gmTdyyTlMHxM",
     authDomain: "comp20-rate-my-classes.firebaseapp.com",
     databaseURL: "https://comp20-rate-my-classes.firebaseio.com",
     projectId: "comp20-rate-my-classes",
     storageBucket: "comp20-rate-my-classes.appspot.com",
     messagingSenderId: "567919611027",
     appId: "1:567919611027:web:6d25a44f92e6fe51211166",
     measurementId: "G-MJKBR14WXN"
   };
firebase.initializeApp(firebaseConfig);

// Add a class rating to database 
app.post('/post_class', (req, res) => {
     rating = Object.assign({}, req.body);
     delete rating.dep;
     delete rating.class_num;
     // Add today's date to object 
     date = new Date(Date.now()).toLocaleString().split(',')[0];
     rating.date = date;

     // Post to class/department/class_num
     firebase.database().ref('class/' + req.body.dep + '/' + +(req.body.class_num)).push(rating);
     res.redirect('/home?submit=true');
     res.end();
});

// Load search result page 
app.post('/search_result', (req, res) => {
     var course = req.body;
     // Add class code to parameters
     res.render('pages/search_result', { dep: course.dep, class_num: course.class_num});
     res.end();
});

// Get search results from database (based on filter)
app.get('/get_search_result', function(req, res) {
     // Get class code from queries 
     queries = req.query;
     url = "class/" + queries.dep + "/" + queries.class_num;
     var ref = firebase.database().ref("class/" + queries.dep + "/" + queries.class_num);

     if (queries.filter == "All") {
          // Get all ratings from class code
          ref.once("value", function(snapshot) {
               res.json(snapshot.val());
               res.end();
          });
     } else {
          // Get ratings from class code filtered by professor 
          ref.orderByChild("/prof").equalTo(queries.filter).once("value", function(snapshot) {
               res.json(snapshot.val());
               res.end();
          });
     }

});

// Get all ratings from database 
app.get('/classes', function(req, res) {
     var ref = firebase.database().ref("class");

     ref.once("value", function(snapshot) {
          res.json(snapshot.val());
          res.end();
     });
});

// Functions for testing only 

// Update Field 
// app.get('/update_field', (req, res) => {
//      url = "class/COMP/20/-Lu_WRo4baxR9Y87FFPH/date";
//      firebase.database().ref(url).set("6/5/2018");
//      res.end();
// });

// js function to call /update_field (place in frontend js file)
// function update_field() {
//      var xhr = new XMLHttpRequest();
     
//      xhr.onreadystatechange = function () {
//          if (this.readyState != 4) return;
     
//          if (this.status == 200) {
//              console.log("success");
//          }
//      };
     
//      xhr.open('GET', '/update_field', true);
//      xhr.send();
//  }
