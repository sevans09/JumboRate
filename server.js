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

app.get('/departments_json', function(req, res) {
     res.sendFile(path.join(__dirname, 'views/partials/departments.json'));
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
});

app.post('/post_class', (req, res) => {
     date = new Date(Date.now()).toLocaleString().split(',')[0];
     rating = Object.assign({}, req.body);
     delete rating.dep;
     delete rating.class_num;
     rating.date = date;

     firebase.database().ref('class/' + req.body.dep + '/' + req.body.class_num).push(rating);
     res.redirect('/home');
     res.end();
});

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

     ref.once("value", function(snapshot) {
          res.render('./pages/display_test', { dep: course.dep, class_num: course.class_num, ratings: snapshot.val()});
          res.end();
          }, function (errorObject) {
               console.log("The read failed: " + errorObject.code);
     }); 
})

app.post('/submit-display2', (req, res) => {
     var course = req.body;
     res.render('./pages/display_test2', { dep: course.dep, class_num: course.class_num});
     res.end();
})

app.post('/search_result', (req, res) => {
     var course = req.body;
     res.render('pages/search_result', { dep: course.dep, class_num: course.class_num});
     res.end();
});

// gets search results in database based on filter
app.get('/get_search_result', function(req, res) {
     queries = req.query;
     url = "class/" + queries.dep + "/" + queries.class_num;

     var ref = firebase.database().ref("class/" + queries.dep + "/" + queries.class_num);

     if (queries.filter == "All") {
          ref.once("value", function(snapshot) {
               res.json(snapshot.val());
               res.end();
               }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
          });
     } else {
          ref.orderByChild("/prof").equalTo(queries.filter).once("value", function(snapshot) {
               res.json(snapshot.val());
               res.end();
          });
     }

});

// gets all classes in the database
app.get('/classes', function(req, res) {
     var ref = firebase.database().ref("class");

     ref.once("value", function(snapshot) {
          res.json(snapshot.val());
          res.end();
          }, function (errorObject) {
               console.log("The read failed: " + errorObject.code);
     });
});

// update field: testing purposes only
app.get('/update_field', (req, res) => {
     url = "class/COMP/20/-Lu_WRo4baxR9Y87FFPH/date";
     firebase.database().ref(url).set("6/5/2018");
     res.end();
});

// js function to call /update_field
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