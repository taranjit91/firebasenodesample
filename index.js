var firebase = require('firebase');
var config = {
   apiKey: "AIzaSyCxWVz5cArT737pxeIHaZxeO246muY_d3c",
    authDomain: "comp231-centage.firebaseapp.com",
    databaseURL: "https://comp231-centage.firebaseio.com",
    storageBucket: "comp231-centage.appspot.com",
    messagingSenderId: "809164555117"   
  };
  
  firebase.initializeApp(config);
  console.log('running client'+new Date()/1);
  signinUser('parmar.taran@gmail.com','test123');

 // create user 
function registerUser(email, password){
firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(user) {
      var user = firebase.auth().currentUser;
      addUserInfo(user.uid,'Taranjit','Kaur','employer');
    }
    , function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
});
}
 

// login 
function signinUser(email, password){
var userInfo =firebase.auth().signInWithEmailAndPassword(email, 
    password).then(function(user) {
    var user = firebase.auth().currentUser;
   // console.log(user); // Optional
    console.log("current user id :: "+user.uid);
    var uid = user.uid;
    //addUserInfo(uid,'firstName'+'','tommm ','member');
    //editUserInfo(uid,'firstName'+'','lastName','member');
   // createJobPosting(uid,'Business Analyst Internship','Alpha One','940 Progress Ave','Newly Graduates','internship','scarborough','55000-75000','IT, Software Developer');
searchPostings();
  }, function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
});
}
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

/* ********************  JOB POSTINGS QUERIES starts    ************************ */
// create job posting
function createJobPosting(uid,title,company,company_address, job_description,job_type,location,salary,tags)
{
var jobsRef = firebase.database().ref("jobs/postings/");
jobsRef.push({ // using push for inserting record will create id for each record automatically
      uid: uid,
      title: title,
      company: company,
      company_address:company_address,
      job_description: job_description,
      job_type: job_type,
      location: location,
      salary: salary,
      tags: tags
   }), function(error) {
  if (error) {
    console.log("Data could not be saved." + error);
  } else {
    console.log("Data saved successfully.");
  };
   }
}

// edit job posting
function updateJobPosting(postingid,uid,title,company,company_address, job_description,job_type,location,salary,tags)
{
var jobsRef = firebase.database().ref("jobs/postings/");
var postingRef = jobsRef.child(postingid);
postingRef.update({
       uid: uid,
      title: title,
      company: company,
      company_address:company_address,
      job_description: job_description,
      job_type: job_type,
      location: location,
      salary: salary,
      tags: tags   
   }), function(error) {
  if (error) {
    console.log("Data could not be saved." + error);
  } else {
    console.log("Data saved successfully.");
  };
}
}
//delete job posting
function deleteJobPosting(postingid,uid)
{
var jobsRef = firebase.database().ref("jobs/postings/");
var postingRef = jobsRef.child(postingid);
// can check the user id also if it is the same for user who has created posting
postingRef.remove(postingRef), function(error) {
  if (error) {
    console.log("Data could not be saved." + error);
  } else {
    console.log("Data saved successfully.");
  };
  }
}

function searchPostings(searchOn, searchByVal)
{
  var jobsRef = firebase.database().ref("jobs/postings/");
  // replace location by searchOn and the value by searchByVal 
jobsRef.orderByChild("location").equalTo('scarborough').on("child_added", function(snapshot) {
  console.log(snapshot.key);
});
}

/* ********************  JOB POSTINGS QUERIES ENDS    ************************ */
 
/* ********************  employer QUERIES starts    ************************ */
// create job posting
function createEmployerProfile(uid,companyName,company_address, city,contactEmail,contactNumber,contactName,industryCategory)
{
var employerRef = firebase.database().ref("employers/");
employerRef.push({ // using push for inserting record will create id for each record automatically
      uid: uid,
      companyName: companyName,
      company: company,
      company_address:company_address,
      city: city,
      contactEmail: contactEmail,
      contactNumber: contactNumber,
      contactName: contactName,
      industryCategory: industryCategory
   }), function(error) {
  if (error) {
    console.log("Data could not be saved." + error);
  } else {
    console.log("Data saved successfully.");
  };
   }
}

// edit employer information
function updateEmployerInfo(uid,employerid,companyName,company_address, city,contactEmail,contactNumber,contactName,industryCategory)
{
var empRef = firebase.database().ref("employers/");
var employerRef = empRef.child(employerid);
employerRef.update({
      uid: uid,
      companyName: companyName,
      company: company,
      company_address:company_address,
      city: city,
      contactEmail: contactEmail,
      contactNumber: contactNumber,
      contactName: contactName,
      industryCategory: industryCategory  
   }), function(error) {
  if (error) {
    console.log("Data could not be saved." + error);
  } else {
    console.log("Data saved successfully.");
  };
}
}
//delete employer information
function deleteJobPosting(postingid,uid)
{
var empRef = firebase.database().ref("employers/");
var employerRef = empRef.child(employerid);
// can check the user id also if it is the same for user who has created posting
postingRef.remove(employerRef), function(error) {
  if (error) {
    console.log("Data could not be saved." + error);
  } else {
    console.log("Data saved successfully.");
  };
  }
}

function searchEmployers(searchOn, searchByVal)
{
  var jobsRef = firebase.database().ref("employers/");
  // replace location by searchOn and the value by searchByVal 
jobsRef.orderByChild("city").equalTo('scarborough').on("child_added", function(snapshot) {
  console.log(snapshot.key);// key object
});
}

/* ********************  employer QUERIES ends    ************************ */



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
