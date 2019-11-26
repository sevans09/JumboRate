$(document).ready(function() {
    load_select_year();
    load_select_departments();
});

function load_select_year() {
    var date = new Date,
    year = date.getFullYear();

    for (var i = year; i > year - 5; i--) {
        $("#year").append(`<option value="` + i + `">` + i + `</option>`)
    }
}

function load_select_departments() {
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;
    
        if (this.status == 200) {
            data = JSON.parse(this.responseText);
            data.forEach(function(elem) {
                $("#department").append(`<option value="` + elem + `">` + elem + `</option>`)
            });
        }
    };

    xhr.open('GET', '/departments_json', true);
    xhr.send();
}