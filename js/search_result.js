// search_result.js 
// JavaScript for search_result.ejs page

// Global variable to hold database data
var data = {};

$(document).ready(function() {
    get_data(update_prof_filter);
}); 

// Get database data based on class and filter
function get_data(functionality = 0) {
    // Get class code and filter info from selections on page
    var dep = document.getElementById("department").innerHTML;
    var class_num = document.getElementById("class_num").innerHTML;
    var filter_select = document.getElementById("select_filter");
    var filter = filter_select.options[filter_select.selectedIndex].text;

    // Request to get ratings from database
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;
    
        if (this.status == 200) {
            data = JSON.parse(this.responseText);

            // Call function if it exists 
            if (functionality) {
                functionality();
            }
            sort_data();
        }
    };
    url = "/get_search_result?" + "dep=" + dep + "&class_num=" + class_num + "&filter=" + filter;
    xhr.open('GET', url, true);
    xhr.send();
}

// Update professor dropdown options 
function update_prof_filter() {
    // Get all unique professors for current class
    var ratings = Object.values(data);
    profs = new Set();
    ratings.forEach(rating => profs.add(rating.prof));

    // Add options to filter dropdown 
    profs.forEach(function(prof) {
        $("#select_filter").append(`<option value="` + prof + `">` + prof + `</option>`)
    });
}

// Sort data based on selected sort dropdown option 
function sort_data() {
    // Get sort option from selection on page 
    var sort_select = document.getElementById("select_sort");
    var sort = sort_select.options[sort_select.selectedIndex].value;

    // Map object to an array
    var items = Object.keys(data).map(function(key) {
        return [key, data[key]];
    });
    var list = [];

    // Sort array
    if (sort == "Date") {
        // Sort by date
        list = items.sort(function(a, b) {
            date1 = new Date(a[1].date);
            date2 = new Date(b[1].date);
            return ((date1 > date2) ? -1 : 1);
        });
    } else if (sort == "LtoH") {
        // Sort by rating (low to high)
        list = items.sort((a, b) => (a[1].overall > b[1].overall) ? 1 : -1);
    } else if (sort == "HtoL") {
        // Sort by rating (high to low)
        list = items.sort((a, b) => (a[1].overall > b[1].overall) ? -1 : 1);
    } else {
        list = items;
    }

    // Convert array back to object
    sorted_data = {}
    list.forEach((val, index) => { sorted_data[val[0]] = val[1] });
    data = sorted_data;

    // Display sorted data
    update_display();
}

// Update display of class ratings based on current data
function update_display() {
    var ratings = Object.values(data);

    // Define alternating background colors 
    var color1 = "(35, 94, 164, 0.8)";
    var color2 = "(57, 62, 65, 0.8)";

    var difficulty = 0;
    var overall = 0;
    var workload = 0;

    // Clear display, add one section per class rating 
    $("#display").html("");
    ratings.forEach(function(rating, index) {
        // Calculate sum of difficulty/overall/workload
        difficulty += parseInt(rating.difficulty);
        overall += parseInt(rating.overall);
        workload += parseInt(rating.workload);

        // Alternate colors
        color = (index % 2 == 0) ? color1 : color2;

        // Add class rating to page 
        $("#display").append(display_html(rating, color));
    });

    // Calculate averages for difficulty/overall/workload, update page 
    total = ratings.length;
    difficulty = (difficulty / total).toFixed(1);
    overall = (overall / total).toFixed(1);
    workload = (workload / total).toFixed(1);

    $("#avg_difficulty").html(difficulty);
    $("#avg_overall").html(overall);
    $("#avg_workload").html(workload);
}

// Defines the HTML for one class rating 
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
                <div class="col-sm-7 white">
                    <div class="row">
                        <div class="col-2 col-sm-3 white">
                            Overall Rating:
                        </div>
                        <div class="col-4 col-sm-3 white">
                            `+ overall_desc(rating.overall) + `
                        </div>
                        <div class="col-2 col-sm-3 white">
                            Professor:
                        </div>
                        <div class="col-4 col-sm-3 white">
                            ` + rating.prof + `
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-2 col-sm-3 white">
                            Difficulty:
                        </div>
                        <div class="col-4 col-sm-3 white">
                            `+ difficulty_desc(rating.difficulty) + `
                        </div>
                        <div class="col-2 col-sm-3 white">
                            Grade:
                        </div>
                        <div class="col-4 col-sm-3 white">
                            ` + rating.grade + `
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-2 col-sm-3 white">
                            Workload:
                        </div>
                        <div class="col-4 col-sm-3 white">
                            `+ workload_desc(rating.workload) + `
                        </div>
                        <div class="col-2 col-sm-3 white">
                            Attendance:
                        </div>
                        <div class="col-4 col-sm-3 white">
                            ` + rating.attendance + `
                        </div>
                    </div>
                </div>
                <div class="col-sm-5 white">
                    ` + rating.comments + `
                </div>
            </div>
    `
}

// Returns overall description based on number rating
function overall_desc(num) {
    words = ["Terrible", 
            "Mediocre", 
            "Average", 
            "Good", 
            "Awesome"
    ];
    return words[num - 1];
}

// Returns difficulty description based on number rating
function difficulty_desc(num) {
    words = ["Just show up to get an A", 
            "Pretty Easy",
            "Manageable", 
            "Hard", 
            "Hardest class I've ever taken"
    ];
    return words[num - 1];
}

// Returns workload description based on number rating
function workload_desc(num) {
    words = ["Little to no work at all", 
            "Some work, but easy",
            "Average amount of work", 
            "Lots of work", 
            "The most work I've ever had"
    ];
    return words[num - 1];
}