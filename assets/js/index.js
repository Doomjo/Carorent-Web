  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCxMgnhDN_KwRAKSOgfdc7lQKRwi_0MNvA",
    authDomain: "registersystem-e2f2b.firebaseapp.com",
    projectId: "registersystem-e2f2b",
    storageBucket: "registersystem-e2f2b.appspot.com",
    messagingSenderId: "744061335916",
    appId: "1:744061335916:web:183bc2942c48d054791b49"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth()
  const database = firebase.database()

  function register() {
    // Get all our input fields
    email = document.getElementById('email1').value
    password = document.getElementById('password1').value
    full_name = document.getElementById('full_name1').value

    //validate
    if(validate_email(email) == false|| validate_password(password) == false){
      alert('Email or Password is Incorrect!!')
      return
      //Don't continue running the code
    }
    if(validate_field(full_name) == false){
      alert("Full Name is empty")
    }

  auth.createUserWithEmailAndPassword(email,password)
  .then(function(){
    var user = auth.currentUser

    //add this user to firebase database
    var database_ref = database.ref()

    //create user data
    var user_data = {
      email : email,
      full_name :full_name,
      last_login : Date.now()
    }

    //Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)
    alert('User Created!!')

  })

  .catch(function(error){

  })
  }
  function validate_email(email){
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if(expression.test(email) == true){
      //email correct
      return true
    }
    else{
      return false
    }
  }

  function validate_password(password){
    if(password < 6){
      return false
    }
    else{
      return true
    }
  }

  function validate_field(field){
    if(field == null){
      return false
    }
    if(field.length <= 0){
      return false
    }
    else{
      return true
    }
  }


  // Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In!!')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}