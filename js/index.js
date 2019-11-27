$(document).ready(function() {
    submit_confirmation();
});

// Only called if there are queries in the url
function submit_confirmation() {
    if (location.search) {
        var submitted = location.search.split('?')[1].split('=')[1];
        if (submitted) {
            $('#confirmation').modal('show');
        }
    }
}