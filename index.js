var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyCPydI_Vzq2WR9hp5YfOFEZQWI4J3hPSoI",
    authDomain: "comp231-59031.firebaseapp.com",
    databaseURL: "https://comp231-59031.firebaseio.com",
    storageBucket: "comp231-59031.appspot.com",
    messagingSenderId: "889658949600"
  };
  
  firebase.initializeApp(config);
 // firebase.initializeApp(config);
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

const credential = firebase.auth.EmailAuthProvider.credential(
    'test@test.com', 
    'test123'
);


var userInfo =firebase.auth().signInWithEmailAndPassword('test@test.com', 
    'test123').then(function(user) {
    var user = firebase.auth().currentUser;
    console.log(user); // Optional
}, function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
});



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

