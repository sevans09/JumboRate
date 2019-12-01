$(document).ready(function ()
{
    $("#signout").click( function ()
    {
        firebase.auth().onAuthStateChanged(user => {
                if(user) {
                        firebase.auth().signOut().then(function() {
                                }, function(error) {
                        });
                        window.location = 'home';
                }
        });
    });
});

$(document).ready(function ()
{
    $("#login").click( function ()
    {
        firebase.auth().onAuthStateChanged(user => {
                if(!user) {
                        window.location = 'login.ejs';
                }
        });
    });
});
