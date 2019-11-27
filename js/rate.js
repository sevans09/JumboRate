// rate.js 
// JavaScript for rate.ejs page

$(document).ready(function() {
    load_select_year();
    load_select_departments();
});

// Load the last five years as options in year dropdown 
function load_select_year() {
    var date = new Date,
    year = date.getFullYear();

    for (var i = year; i > year - 5; i--) {
        $("#year").append(`<option value="` + i + `">` + i + `</option>`)
    }
}

// Load all Tufts department codes as options in department dropdown 
function load_select_departments() {
    // Request to get departments from JSON file
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;
    
        if (this.status == 200) {
            data = JSON.parse(this.responseText);
            // Add department options to dropdown
            data.forEach(function(elem) {
                $("#dep").append(`<option value="` + elem + `">` + elem + `</option>`)
            });
            load_preset_class();
        }
    };

    xhr.open('GET', '/departments_json', true);
    xhr.send();
}

// Fill in class code if redirected from "Search Result" page
function load_preset_class() {
    // Only called if there are queries in the url
    if (location.search) {
        var pairs = location.search.split('?')[1].split('&');
        var dep = pairs[0].split('=')[1];
        var class_num = pairs[1].split('=')[1];

        // Set class code fields
        document.getElementById("dep").value = dep;
        document.getElementById("class_num").value = class_num;
    }
}