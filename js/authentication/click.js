// click.js 
// JavaScript for logging in/loggin out

// Loggin in
$(document).ready(function () {
    $("#signout").click( function () {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                    firebase.auth().signOut().then(function() {
                        }, function(error) {
                    });
                    window.location = 'home';
            }
            if (!user){
                $("display_name").empty();
            }
        });
    });
});

// Logging out
$(document).ready(function () {
    $("#login").click( function () {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                window.location = 'login.ejs';
            }
        });
    });
});