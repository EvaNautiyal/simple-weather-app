//run function when page loads
window.addEventListener('load', ()=> {
    let longitude;
    let latitude;
    let tempdesc = document.querySelector(".description");
    let tempdegree = document.querySelector(".degree");
    let location = document.querySelector(".location-timezone");
    let country_name = document.querySelector(".country-timezone");
    let tempSection = document.querySelector(".temperature");
    const tempSpan = document.querySelector(".temperature span");
    let places = document.querySelector("#modal-body");
    
    //if this exists in the browser, get longitude and latitude
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            
            //acts as proxy and allows to make requests from localhost
            const proxy = "https://cors-anywhere.herokuapp.com/";
            
            //API call using latitude and longitude 
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=396a75a72e9410a70f072df5bec1b9ca`;
        
            fetch(api)                                                                  //when fetch information succesful, 
                .then(response => {
                    return response.json();                                             //convert to JSON             
                })
                .then(data => {
                    console.log(data);
                    const {temp} = data.main;                                           //get temp from JSON
                    const {description} = data.weather[0];                              //get the weather description from JSON
                    const {country} = data.sys;
                
                //Set DOM elements from the API                
                tempdegree.textContent = Math.floor(temp - 273.15);                     //temperature in Celsius
                tempdesc.textContent = description;                                     //weather description
                location.textContent = data.name;                                       //timezone location
                country_name.textContent = country;
                
                let fahrenheit = (temp - 273.15)*1.8 + 32
                
                //convert to fahrenheit/celsius
                tempSection.addEventListener('click', () => {
                   if(tempSpan.textContent === "C"){
                       tempSpan.textContent = "F";
                       tempdegree.textContent = Math.floor(fahrenheit);
                   } 
                    else {
                        tempSpan.textContent = "C";
                        tempdegree.textContent = Math.floor(temp - 273.15);
                    }
                });
            
            });            


            
/////////////////////////////////// Google Maps API  ///////////////////////////////////     
/*
            let parks = document.querySelector(".walk");
            let map;
            let pos;
            
            pos = {lat: ${latitude}, lng: ${longitude}};
          
            function initMap() {
                
                map = new google.maps.Map(document.getElementById('map'), {
                    center: pos,
                    zoom: 15;
                });
            }
*/
            //API call  
            const apiloc = `${proxy}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}, ${longitude}&radius=1700&type=park&keyword=walk&key=AIzaSyCIt2PouMjpZho8KXPm0uLW2O7rc143FP0`;

            var s = [];
            var obj;
            fetch(apiloc) 
                .then(response => {
                return response.json();                                             //convert to JSON             
                })

                .then(data => {
                    
                var json = data.results;
                   
                for(i in json) {
                    s += json[i].name + "\n";
                }
                
                    places.textContent = s + "\n\n";
                                
                });
                                                                     
        });     //geolocations ends   
        
    } //if navigator.geolocation
    
    
    //if not, ask user to enable locations
    else {
        h1.textContent = "Hey! You have disabled your locations services!"
    }

    /*
    function setBGImage(tempdesc) {    
        var x = tempdesc.includes("clear");
        var num = x.equals("clear");
        
        if(x === true ) {
        console.log(x);
        document.body.style.background = "url('cooking.jpg')";
    }
}*/


    
    ///////////////////////////////////////////////////////////////////////////////

//DOM Elements

const time = document.getElementById('time'),
      greeting = document.getElementById('greeting'),
      name = document.getElementById('name'),      
      focus = document.getElementById('focus');

//Show Time

function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    // Set AM or PM
    const ap = hour >= 12 ? 'PM' : 'AM';

    // 12 hour format
    hour = hour % 12 || 12;

    //output time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    
    setTimeout(showTime, 100-0);
}

//Add zeroes
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

    //set background
function setBackground() {
    let today = new Date(),
        hour = today.getHours();

    if(hour < 6){
        //Morning
        greeting.textContent = 'Good Morning';
        document.body.style.backgroundImage = "url('img/dawn.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
    }
    if(hour < 9){
        //Morning
        greeting.textContent = 'Good Morning';
        document.body.style.backgroundImage = "url('img/morning-clear.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
    }
    else if(hour < 12) {
        //Afternoon
        greeting.textContent = 'Good Morning';
        document.body.style.backgroundImage = "url('img/clear_sky.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
    }
    else if(hour < 18) {
        //Afternoon
        greeting.textContent = 'Good Afternoon';
        document.body.style.backgroundImage = "url('img/clear_sky_noon.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
    }
    
    else if(hour < 21) {
        //Afternoon
        greeting.textContent = 'Good Evening';
        document.body.style.backgroundImage = "url('img/dusk-clear-w.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
    }

    else {
        //Evening
        greeting.textContent = 'Good Evening';
        document.body.style.backgroundImage = "url('img/night-clear.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
    }
}
    
//Run
showTime();
setBackground();
//setBGImage();
        

});
