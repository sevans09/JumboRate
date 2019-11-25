// Logs out current user
function logOut() {
  firebase.auth().signOut();
  console.log('signed user out');
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
