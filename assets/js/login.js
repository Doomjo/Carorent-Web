  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAekOrfwb3qXJCTz_yCEm4kSnIQpvM1Ego",
    authDomain: "carorent-main.firebaseapp.com",
    databaseURL: "https://carorent-main-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "carorent-main",
    storageBucket: "carorent-main.appspot.com",
    messagingSenderId: "588998238751",
    appId: "1:588998238751:web:b348d81dbd1c7e1e1e6b2a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth()
  const database = firebase.database()
  const db = firebase.firestore()
  

  function register(event){
      event.preventDefault()
      const email = document.getElementById('email1').value
      const password = document.getElementById('password1').value
      const full_name = document.getElementById('full_name1').value
      //phone_num = document.getElementById('phone_num1').value

      //validate
      if(validate_email(email) == false|| validate_password(password) == false){
        document.querySelector("#alert").innerHTML = '<div class="alert alert-danger" role="alert"> '+ 'Email or Password is Incorrect!!' + '</div>'
        document.querySelector("#alert").style.display = "block"
        document.querySelector("#alert").style.fontSize = "36px"
        return
        //Don't continue running the code
      }
      if(validate_field(full_name) == false){
        document.querySelector("#alert").innerHTML = '<div class="alert alert-danger" role="alert"> '+ 'Full Name is Empty!!' +'</div>'
        document.querySelector("#alert").style.display =  "block"
        document.querySelector("#alert").style.fontSize = "36px"
      }
      
      auth.createUserWithEmailAndPassword(email,password).then(cred=>{
          return db.collection('carorent-users').doc(cred.user.uid).set({
            username: full_name,
            phonenumber: "null",
            password_user: password,
            booking_num: 0
          })
        })
      .then(function(){
        var user = auth.currentUser
        document.querySelector("#alert").innerHTML = '<div class="alert alert-success" role="alert"> '+ 'User Created!' +'</div>'
        document.querySelector("#alert").style.display = "block"
        document.querySelector("#alert").style.fontSize = "36px"
        setTimeout(function(){window.location.reload();},3000);
        sign-up-form.reset();
      }).catch(err=>{
        if(err.message == "The email address is already in use by another account.")
        document.querySelector("#alert").innerHTML = '<div class="alert alert-danger" role="alert"> '+ err.message +'</div>'
        document.querySelector("#alert").style.display = "block"
        document.querySelector("#alert").style.fontSize = "24px"
      });
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
    event.preventDefault();
    var complete = false;
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {

      document.querySelector("#alert").innerHTML = '<div class="alert alert-danger" role="alert"> '+ 'Wrong Email or Password!!' +'</div>'
      document.querySelector("#alert").style.display = "block"
      document.querySelector("#alert").style.textAlign = "right"
      document.querySelector("#alert").style.fontSize = "36px"

      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  

      if(user){
        db.collection('carorent-users').doc(user.uid).get().then(doc => {
          {
            var full_name = (doc.data().username);
            sessionStorage.setItem('username',full_name);

            var phone_num = (doc.data().phonenumber);
            sessionStorage.setItem('phone_num',phone_num);

            var email = (user.email);
            sessionStorage.setItem('email',email);

            var userid = (user.uid);
            sessionStorage.setItem('userid',userid);

            var booking_num = (doc.data().booking_num);
            sessionStorage.setItem('booking_num',booking_num);

            document.querySelector("#alert").innerHTML = '<div class="alert alert-success" role="alert"> '+ 'User Logged in' +'</div>'
            document.querySelector("#alert").style.display = "block"
            document.querySelector("#alert").style.textAlign = "right"
            document.querySelector("#alert").style.fontSize = "36px"

            }
        }).then(()=>{
          if(window.history.length>2){
            window.history.back();
          }
          else{
            window.location.href = "index.html"
          }

        });
        sessionStorage.setItem('login',"true");
        //sessionStorage.setItem('username',full_name);
        complete = true;
      }

  
      // Push to Firebase Database
      //database_ref.child('users/' + user.uid).update(user_data)
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
      document.querySelector("#alert").innerHTML = '<div class="alert alert-danger" role="alert"> '+ 'Wrong Email or Password' +'</div>'
      document.querySelector("#alert").style.display = "block"
      document.querySelector("#alert").style.textAlign = "right"
      document.querySelector("#alert").style.fontSize = "36px"
      document.getElementById("loginform").reset();
    })
  }

  function logout2(){
    //alert("Sign-Out Successful");
    auth.signOut().then(function(){
      
      alert("Sign-Out Successful")
      sessionStorage.setItem('login',"false");
      sessionStorage.clear();
      window.location.reload();
    }).catch(function(error){

    })
  }

  function updateProfile2(){
    var newname,newphone;
    var update = false;
    newname = document.getElementById("newUsername").value;
    console.log(newname);
    newphone = document.getElementById("newPhone_num").value;
    console.log(newphone);
    var user = auth.currentUser
    if(user){
      db.collection('carorent-users').doc(user.uid).update({
        username: newname,
        phonenumber: newphone,
      }).then(()=>{
        sessionStorage.setItem("username", newname);
        sessionStorage.setItem("phone_num", newphone);
        window.location.reload();

      });

    // document.getElementById("name").innerHTML = '<p id="name">'+newname+'</p>'
    // document.getElementById("phone").innerHTML = '<p id="phone">'+newphone+'</p>'
    }
  }

  // function reload(){
  //   window.location.reload();
  // }
  function completed(event){
    event.preventDefault();
    var date_check = sessionStorage.getItem('validDate');

    if(date_check == "true"){
        var user = auth.currentUser;
        var pickup_date = document.getElementById('start').value;
        var dropoff_date = document.getElementById('end').value;
        var totalpayment = document.getElementById('totalpayment').textContent;
        var booking_num = parseInt(sessionStorage.getItem('booking_num'));
        var carname = sessionStorage.getItem("car-name");
        booking_num+=1;
        console.log(pickup_date);
        console.log(dropoff_date);
        console.log(totalpayment);
        console.log(booking_num);
        console.log(carname);
        booking_num_str = ''+ booking_num;
        console.log(booking_num_str);
        dbName = user.uid + booking_num_str;
        console.log(dbName)
        if(user){
          db.collection('carorent-booking').doc(dbName).set({
            carname: carname,
            pickup_date:pickup_date,
            dropoff_date:dropoff_date,
            totalpayment: totalpayment,
          }).then(()=>{db.collection('carorent-users').doc(user.uid).update({
            booking_num: booking_num,

          }).then(()=>{
            sessionStorage.setItem('booking_num',booking_num);
            //notification after succesful booking
            const notification = new Notification("Dear Valued Customer, Thanks For Choosing Carorent !", {
              body:"Your Booking Has Been Recorded !",
              icon: "../assets/img/icon-192x192.png",
              });
            window.location.href="paymentcomplete.html";
          });
        });
      }
    }
    else{
      alert("Please select a valid date !");
    }
  }
  function getBookingData(){
    console.log("haii");
    var code,carname,drop_off,pickup_date,totalpayment
    var userid = sessionStorage.getItem('userid');
    console.log(userid);
    var show_booking = document.getElementById('booking_body');
    var booking_num = parseInt(sessionStorage.getItem('booking_num'));
    number = "" + booking_num;
    for(var i =1;i<=booking_num;i++){
    dbName = userid + i;
    console.log(dbName);
      db.collection('carorent-booking').doc(dbName).get().then(doc => {
        console.log("2");
        carname = (doc.data().carname);
        drop_off = (doc.data().dropoff_date);
        pickup_date = (doc.data().pickup_date);
        totalpayment = (doc.data().totalpayment);
      }).then(()=>{
        show_booking.innerHTML += '<tr><th>'+carname+'</th><th>'+pickup_date+'</th><th>'+drop_off+'</th><th>'+totalpayment+'</th></tr>'
      }).then(()=>{
        console.log("1");
        console.log(code);
      });
    }
  }
