function showNotification(){
    var login_check = sessionStorage.getItem('login');
    var name = sessionStorage.getItem('username');
    if(login_check == "true"){
        const notification = new Notification(" Welcome to Carorent !", {
            body: " Welcome "+ name +" to Carorent, Proceed to book car !",
            icon: "../assets/img/icon-192x192.png",
        });

        notification.onclick = (e) =>{
            window.location.href = "https://carorent.azurewebsites.net/car-list.html";
        }

    }else{
        const notification = new Notification("Message from Carorent !", {
            body:"Welcome to Carorent, Browse Your Favourite Car to Start Your Journey !",
            icon: "../assets/img/icon-192x192.png",
        });
    }
    
}


console.log(Notification.permission)

if(Notification.permission === "granted"){
    showNotification();
}else if(Notification.permission != "denied"){
    Notification.requestPermission().then(permission => {
        if(permission === "granted"){
            showNotification();
        }
    });
}



