function splitdate(){

    var start = document.getElementById( 'start' ).value;
    var end = document.getElementById( 'end' ).value;

    var p = sessionStorage.getItem("car-price");
   
    var d = new Date(start); //8am
    var d2 = new Date(end);
    
    const today = new Date(); 

    const oneDay = 24 * 60 * 60 * 1000;

    if(today > d || today >= d2){
        document.getElementById("rentperiod").innerHTML = "Need to choose date after today to start booking.";
        sessionStorage.setItem("validDate", "false");
    }
    else{
        if ( !!d.valueOf() && !!d2.valueOf() ) { // Valid date
            year = d.getFullYear();
            month = d.getMonth() + 1;
            day = d.getDate();


            year2 = d2.getFullYear();
            month2 = d2.getMonth() + 1;
            day2 = d2.getDate();

            var diffDays = Math.round((d2 - d) / oneDay);

            if(diffDays > 0 && diffDays <= 365){
                sessionStorage.setItem("validDate", "true");
                document.getElementById("rentperiod").innerHTML = "Duration : " + diffDays + " day(s)";
                
            }
            else{
                sessionStorage.setItem("validDate", "false");
                diffDays = null;
                document.getElementById("rentperiod").innerHTML = "Invalid day";
            }
        } 
        else { 
            sessionStorage.setItem("validDate", "false");
            document.getElementById("rentperiod").innerHTML = "Invalid Time Entered";
        }

        if(diffDays > 0){
            var value = parseInt(p);
            var pricehour = value*diffDays;
            var deposit = pricehour/3;
            var gst = pricehour*0.06;
            var sertax = pricehour*0.1;
            var insurance = 0;

            if(value > 300 && value <= 500){
                insurance = parseInt(300);
                document.getElementById("insurancefees").innerHTML = "RM " + insurance.toFixed(2);
            }
            else if(value > 500 && value <= 1000 ){
                insurance = parseInt(400);
                document.getElementById("insurancefees").innerHTML = "RM " + insurance.toFixed(2);
            }
            else if(value > 1000){
                insurance = parseInt(500);
                document.getElementById("insurancefees").innerHTML = "RM " + insurance.toFixed(2);
            }
            else{
                insurance = parseInt(200);
                document.getElementById("insurancefees").innerHTML = "RM " + insurance.toFixed(2);
            }

            var calculatevalue = pricehour + gst + sertax + deposit + insurance;
            document.getElementById("totalprice").innerHTML = "RM " + pricehour.toFixed(2);
            document.getElementById("deposit").innerHTML = "RM " + deposit.toFixed(2);
            document.getElementById("govtax").innerHTML = "RM " + gst.toFixed(2);
            document.getElementById("servicetax").innerHTML = "RM " + sertax.toFixed(2);
            document.getElementById("totalpayment").innerHTML = "RM " + calculatevalue.toFixed(2);
            


            localStorage.setItem("pickupdate", start);
            localStorage.setItem("dropoff", end);


            localStorage.setItem("rentperiod", diffDays);
            sessionStorage.setItem("insurancefees",insurance.toFixed(2));
            localStorage.setItem("totalprice", pricehour.toFixed(2));
            localStorage.setItem("deposit", deposit.toFixed(2));
            localStorage.setItem("ggovtax", gst.toFixed(2));
            localStorage.setItem("servicetax", sertax.toFixed(2));
            localStorage.setItem("totalpayment", calculatevalue.toFixed(2));
            
        }
    }


}
