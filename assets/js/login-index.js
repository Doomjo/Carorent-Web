  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAekOrfwb3qXJCTz_yCEm4kSnIQpvM1Ego",
    authDomain: "carorent-main.firebaseapp.com",
    projectId: "carorent-main",
    storageBucket: "carorent-main.appspot.com",
    messagingSenderId: "588998238751",
    appId: "1:588998238751:web:b348d81dbd1c7e1e1e6b2a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth()
  const database = firebase.database()
  function register(event){
      event.preventDefault()
      email = document.getElementById('email1').value
      password = document.getElementById('password1').value
      full_name = document.getElementById('full_name1').value
      //phone_num = document.getElementById('phone_num1').value

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
        //alert('User Created!!')
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
  function login(event) {
    event.preventDefault()
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

      var email, full_name;
      if(user!=null){
        full_name = user.full_name;
        email = user.email;
      }

      sessionStorage.setItem('full_name',full_name);
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)


  
      // DOne
      sessionStorage.setItem('login',"true");
      alert('User Logged In!!')
      window.location.href="index.html"
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }

  function logout2(){
    //alert("Sign-Out Successful");
    auth.signOut().then(function(){
      alert("Sign-Out Successful")
      sessionStorage.setItem('login',"false");
      window.location.reload();
    }).catch(function(error){

    })
  }