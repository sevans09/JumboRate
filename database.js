
// sample function
// function writeUserData(userId, name, email) {
//     console.log("user id: " + userId);
// firebase.database().ref('users/' + userId).push({
//     username: name,
//     email: email
//   }, function(error) {
//     if (error) {
//       // The write failed...
//       console.log("the write failed");
//     } else {
//       // Data saved successfully!
//       console.log("saved successfully");
//     }
//   });
// }

function postClass(dep, class_num, info) {
    firebase.database().ref('class/' + dep + '/' + class_num).push({
        rating: info
    }, function(error) {
        if (error) {
        // The write failed...
        console.log("the write failed");
        } else {
        // Data saved successfully!
        console.log("saved successfully");
        }
    });
}
