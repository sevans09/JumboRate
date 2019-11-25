const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

/**********    ROUTES   **********/

// Code
app.get('/styles.css', function(req, res) {
     res.sendFile(path.join(__dirname, 'public/stylesheets/styles.css'));
});

app.get('/nevis.ttf', function(req, res) {
     res.sendFile(path.join(__dirname, '.fonts/nevis.ttf'));
});

app.get('/firebase.js', function(req, res) {
     res.sendFile(path.join(__dirname, 'js/firebase/firebase.js'));
});

app.get('/profile_icon.png', function(req, res) {
     res.sendFile(path.join(__dirname, 'views/images/profile_icon.png'));
});

// Pages
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

app.get('/test', function(req, res) {
     res.render('pages/test');
});

app.get('/display_test', function(req, res) {
     res.render('pages/display_test');
});

app.listen(port);
console.log('Running at Port 5000');

/**********    FIREBASE DATABASE   **********/

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

app.post('/submit-rating', (req, res) => {
     postClass(req.body);
     res.redirect('/about'); //change redirect later
     res.end();
})

function postClass(info) {
     rating = Object.assign({}, info);
     delete rating.dep;
     delete rating.class_num;
     date = new Date(Date.now()).toLocaleString().split(',')[0];
     firebase.database().ref('class/' + info.dep + '/' + info.class_num).push({
          date: date,
          rating: rating
     },   function(error) {
               if (error) {
                    console.log("Error");
               } else {
                    console.log("Success");
          }
     });
 }

 app.post('/submit-display', (req, res) => {
     var course = req.body;
     var ref = firebase.database().ref("class/" + course.dep + "/" + course.class_num);

     ref.on("value", function(snapshot) {
          res.render('./pages/display_test', { dep: course.dep, class_num: course.class_num, ratings: snapshot.val()});
          res.end();
          }, function (errorObject) {
               console.log("The read failed: " + errorObject.code);
     }); 
})

app.post('/submit-display2', (req, res) => {
     var course = req.body;
     res.render('./pages/display_test2', { dep: course.dep, class_num: course.class_num});

     // var ref = firebase.database().ref("class/" + course.dep + "/" + course.class_num);

     // ref.on("value", function(snapshot) {
     //      res.render('./pages/display_test2', { dep: course.dep, class_num: course.class_num, ratings: snapshot.val()});
     //      res.end();
     //      }, function (errorObject) {
     //           console.log("The read failed: " + errorObject.code);
     // }); 
})

app.get('/test_search', function(req, res) {
     queries = req.query;
     console.log("queries: ");
     console.log(req.query);
     url = "class/" + queries.dep + "/" + queries.class_num;
     console.log("url: " + url);

     var ref = firebase.database().ref("class/" + queries.dep + "/" + queries.class_num);

     ref.on("value", function(snapshot) {
          console.log(snapshot.val());
          res.json(snapshot.val());
          res.end();
          }, function (errorObject) {
               console.log("The read failed: " + errorObject.code);
     });
});

// gets all classes in the database
app.get('/classes', function(req, res) {
     var ref = firebase.database().ref("class");

     ref.on("value", function(snapshot) {
          res.json(snapshot.val());
          res.end();
          }, function (errorObject) {
               console.log("The read failed: " + errorObject.code);
     });
});