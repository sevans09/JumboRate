var data = {};

$(document).ready(function() {
    get_data(update_class_dep, update_class_num);
}); 

function get_data(update_class_num) {
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

function update_class_num() {
    var e = document.getElementById("select_dep_num");
    var selected = e.options[e.selectedIndex].text;
    var classes = Object.keys(data[selected]);
    $("#select_class_num").html("");

    classes.forEach(function(elem) {
        if (elem != 0) { 
            $("#select_class_num").append(`<option value="` + elem + `">` + elem+ `</option>`);
        }
    });
}

function update_class_dep() {
    var classes = Object.keys(data);

    $("#select_dep_num").html("");
    classes.forEach(function(elem) {
        $("#select_dep_num").append(`<option value="` + elem + `">` + elem+ `</option>`)
    });
    update_class_num();
}
