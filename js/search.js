// search.js 
// JavaScript for search.ejs page

// Global variable to hold database data
var data = {};

$(document).ready(function() {
    get_data();
}); 

// Get all class rating data from database 
function get_data() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;
    
        if (this.status == 200) {
            data = JSON.parse(this.responseText);
            update_class_dep();
        }
    };
    
    xhr.open('GET', '/classes', true);
    xhr.send();
}

// Update the class department options dropdown based on available reviews 
function update_class_dep() {
    var classes = Object.keys(data);

    // Update class department options 
    $("#select_dep_num").html("");
    classes.forEach(function(elem) {
        $("#select_dep_num").append(`<option value="` + elem + `">` + elem+ `</option>`)
    });

    update_class_num();
}

// Update the class number options dropdown based on available reviews & department 
function update_class_num() {
    // Get the available class numbers based on current department
    var e = document.getElementById("select_dep_num");
    var selected = e.options[e.selectedIndex].text;
    var classes = Object.keys(data[selected]);

    // Update the class number options in dropdown 
    $("#select_class_num").html("");
    classes.forEach(function(elem) {
        if (elem != 0) { 
            $("#select_class_num").append(`<option value="` + elem + `">` + elem+ `</option>`);
        }
    });
}