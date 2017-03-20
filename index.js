var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyCPydI_Vzq2WR9hp5YfOFEZQWI4J3hPSoI",
    authDomain: "comp231-59031.firebaseapp.com",
    databaseURL: "https://comp231-59031.firebaseio.com",
    storageBucket: "comp231-59031.appspot.com",
    messagingSenderId: "889658949600"
  };
  
  firebase.initializeApp(config);
  console.log('running client');

 /* create user 

firebase.auth().createUserWithEmailAndPassword('test@test.com', 'test123')
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    console.log('The password is too weak.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});
*/

//requires authentication doesn't work without sign in
 //addUserInfo('firstName'+'','firstName','lastName','member'); 

// login 
var userInfo =firebase.auth().signInWithEmailAndPassword('test@test.com', 
    'test123').then(function(user) {
    var user = firebase.auth().currentUser;
    console.log(user); // Optional
    console.log("current user id"+user.uid);
    var uid = user.uid;
    //addUserInfo(uid,'firstName'+'','lastName','member');
    //editUserInfo(uid,'firstName'+'','lastName','member');
}, function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
});

// adding user information
function addUserInfo(uid,firstName, lastName,userRole)
{
var userInfoRef = firebase.database().ref("users/personal/");
userInfoRef.child(uid).set({
      firstname: firstName,
      lastname: lastName,
      role:userRole
   }), function(error) {
  if (error) {
    console.log("Data could not be saved." + error);
  } else {
    console.log("Data saved successfully.");
  };
   }
}
// update existing user information
function editUserInfo(uid,firstName, lastName,userRole)
{
  var userInfoRef = firebase.database().ref("users/personal/");
  var userRef = userInfoRef.child(uid);
userRef.update({
       "firstname": firstName,
      "lastname": lastName,
     "role":userRole
   }), function(error) {
  if (error) {
    console.log("Data could not be saved." + error);
  } else {
    console.log("Data saved successfully.");
  };
   }
}

// create job posting

// edit job posting

//delete job posting

//


/* admin setup
var admin = require("firebase-admin");

var serviceAccount = require("./comp231-servicekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://comp231-59031.firebaseio.com"
});
console.log('running');

var playersRef = admin.database().ref("node-client/");

playersRef.set({
   John: {
      number: 1,
      age: 30
   },
	
   Amanda: {
      number: 2,
      age: 20
   }
});*/
