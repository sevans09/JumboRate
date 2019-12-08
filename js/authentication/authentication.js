// authentication.js 
// JavaScript for authentication actions

// Logs out current user
function logOut() {
	firebase.auth().signOut();
	// console.log('signed user out');
}

// Get the current logged in user (or null if no one logged in)
// Use this function to decide to show log in or sign out
function getUser() {
	var user = firebase.auth().currentUser;
	// console.log('user is', user);
	return user;
}