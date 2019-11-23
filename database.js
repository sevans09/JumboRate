
// var database = firebase.database();

function writeUserData(userId, name, email) {
    console.log("user id: " + userId);
firebase.database().ref('users/' + userId).push({
    username: name,
    email: email
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
