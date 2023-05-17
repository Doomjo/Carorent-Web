
function carFunction(car){
    var login_check = sessionStorage.getItem('login');
    if(login_check == "true"){
        var imgsrc = car.getAttribute("data-car");
        var carPrice = car.getAttribute("data-price");
        var carName = car.getAttribute("data-name");

        if (typeof(Storage) !== "undefined") {
            // Store image location
            sessionStorage.setItem("car-image", imgsrc);
            sessionStorage.setItem("car-price", carPrice);
            sessionStorage.setItem("car-name", carName);
            sessionStorage.setItem("validDate", "false");
            //href to payment UI
            window.location.href = "paymentUI.html";
            // window.open(
            //     'paymentUI.html',
            //     '_blank' // <- This is what makes it open in a new window.
            // );
        } 
        else {
            //dk what to write
            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
    }
    else if(confirm("Please Login to Continue")){
        window.location.href = "login.html";
    }
    else{

    }
}

// function loadPicture(){
//     var imgsrc = sessionStorage.getItem("car-image");
//     document.getElementById("tableBanner").src = imgsrc;
// }



