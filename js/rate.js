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
                $("#dep").append(`<option value="` + elem + `">` + elem + `</option>`)
            });
            load_preset_class();
        }
    };

    xhr.open('GET', '/departments_json', true);
    xhr.send();
}

// Only called if there are queries in the url
function load_preset_class() {
    if (location.search) {
        var pairs = location.search.split('?')[1].split('&');
        var dep = pairs[0].split('=')[1];
        var class_num = pairs[1].split('=')[1];

        document.getElementById("dep").value = dep;
        alert(typeof class_num); //"string"
        alert(class_num);// "00005"

        class_num = +class_num ; //or x= +"00005"; //do NOT confuse with x+=x, which will only concatenate the value
        alert(typeof class_num); //number , voila!
        alert(class_num); // 5 (as number)
        document.getElementById("class_num").value = class_num;
    }
}
