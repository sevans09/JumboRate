var data = {};

$(document).ready(function() {
    get_data(update_prof_filter);
}); 

function get_data(functionality = 0) {
    var dep = document.getElementById("department").innerHTML;
    var class_num = document.getElementById("class_num").innerHTML;
    var filter_select = document.getElementById("select_filter");
    var filter = filter_select.options[filter_select.selectedIndex].text;

    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;
    
        if (this.status == 200) {
            data = JSON.parse(this.responseText);
            if (functionality) {
                functionality();
            }
            sort_data();
            update_display();
        }
    };
    url = "/get_search_result?" + "dep=" + dep + "&class_num=" + class_num + "&filter=" + filter;
    xhr.open('GET', url, true);
    xhr.send();
}

function update_prof_filter() {
    var ratings = Object.values(data);
    profs = new Set();
    ratings.forEach(rating => profs.add(rating.prof));

    profs.forEach(function(prof) {
        $("#select_filter").append(`<option value="` + prof + `">` + prof + `</option>`)
    });
}

function sort_data() {
    var sort_select = document.getElementById("select_sort");
    var sort = sort_select.options[sort_select.selectedIndex].value;

    var items = Object.keys(data).map(function(key) {
        return [key, data[key]];
    });
    var list = [];

    if (sort == "Date") {
        list = items.sort(function(a, b) {
            date1 = new Date(a[1].date);
            date2 = new Date(b[1].date);
            return ((date1 > date2) ? -1 : 1);
        });
    } else if (sort == "LtoH") {
        list = items.sort((a, b) => (a[1].overall > b[1].overall) ? 1 : -1);
    } else if (sort == "HtoL") {
        list = items.sort((a, b) => (a[1].overall > b[1].overall) ? -1 : 1);
    } else {
        list = items;
    }

    sorted_data = {}
    list.forEach((val, index) => { sorted_data[val[0]] = val[1] });
    data = sorted_data;
    update_display();
}

function update_display() {
    var ratings = Object.values(data);
    var color1 = "(35, 94, 164, 0.8)";
    var color2 = "(57, 62, 65, 0.8)";

    var difficulty = new Number(0);
    var overall = 0;
    var workload = 0;

    $("#display").html("");
    ratings.forEach(function(rating, index) {
        difficulty += parseInt(rating.difficulty);
        overall += parseInt(rating.overall);
        workload += parseInt(rating.workload);

        color = (index % 2 == 0) ? color1 : color2;
        $("#display").append(display_html(rating, color));
    });

    total = ratings.length;

    difficulty = (difficulty / total).toFixed(1);
    overall = (overall / total).toFixed(1);
    workload = (workload / total).toFixed(1);

    $("#avg_difficulty").html(difficulty);
    $("#avg_overall").html(overall);
    $("#avg_workload").html(workload);
}

function display_html(rating, color) {
    return html = 
    `<div class="container" style="background-color: rgba` + color + `; padding: 2% 2%;">
            <div class="row">
                <div class="col-3">
                    <div class="white">
                        ` + rating.term + ` ` + rating.year + `
                        (` + rating.date + `)
                    </div>
                </div>
            </div>
            <hr style="background-color:white">
            <div class="row">
                <div class="col-3">
                    <div class="white">
                        <span>` + rating.overall + `</span> Overall Rating
                    </div>
                    <div class="white">
                        <span>` + rating.difficulty + `</span> Difficulty
                    </div>
                    <div class="white">
                        <span>` + rating.workload + `</span> Workload
                    </div>
                </div>
                <div class="col-1.5 white">
                    Professor: <br>
                    Grade: <br> 
                    Attendance:  
                </div>
                <div class="col-2 white">
                    ` + rating.prof + `<br>
                    ` + rating.grade + `<br> 
                    ` + rating.attendance + `
                </div>
                <div class="col-5 white">
                    ` + rating.comments + `
                </div>
            </div>
        </div>`
}