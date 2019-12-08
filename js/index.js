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

        // Change model body based on submission type 
        if (submitted == "rating") {
            $("#submission-body").html("Thank you for taking the time to review a Tufts class! </br> Your submission has been added.")
            $('#confirmation').modal('show');
        } else if (submitted == "comment") {
            $("#submission-body").html("Thank you for taking the time to send us a comment! </br> We appreciate your feeedback.")
            $('#confirmation').modal('show');
        }
    }
}