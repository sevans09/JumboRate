// index.js 
// JavaScript for index.ejs page

$(document).ready(function() {
    submit_confirmation();
});

// Show confirmation popup if redirected from "Rate a Class"
function submit_confirmation() {
    // Only called if there are queries in the url
    if (location.search) {
        var submitted = location.search.split('?')[1].split('=')[1];
        if (submitted) {
            $('#confirmation').modal('show');
        }
    }
}