// Logs out current user
function logOut() {
	firebase.auth().signOut();
	console.log('signed user out');
}


// Get the current logged in user (or null if no one logged in)
// Use this function to decide to show log in or sign out
function getUser() {
	var user = firebase.auth().currentUser;
	console.log('user is', user);
	return user;
}


// Get all posts in the database. Update to take a field for dept and class 
// number to allow filtering.
function getPosts() {
	return firebase.database().ref("posts").once('value').then(function(snapshot) {
		var posts = snapshot.val();

		for (var postKey in posts) {
			var post = posts[postKey];
     			console.log(post);
      			// Ideally prepend each post to a div so they are in most-recent order
		}
	});
}
