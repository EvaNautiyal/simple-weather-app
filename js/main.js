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
            
        /********************************* OpenWeatherMap API *********************************/     
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=owm_API`;
        
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


            
/********************************* Google Maps API *********************************/     

            const apiloc = `${proxy}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}, ${longitude}&radius=1700&type=park&keyword=walk&key=gp_API`;

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
        });                                                                         //geolocations ends  
    }                                                                               //if navigator.geolocation
    
                                                                                    
    else {                                                                          //if not, notify user
        h1.textContent = "Hey! You have disabled your locations services!"
    }
    
    
//DOM Elements

const time = document.getElementById('time'),
      greeting = document.getElementById('greeting'),
      name = document.getElementById('name'),      
      focus = document.getElementById('focus');

/********************************* Define functions *********************************/

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

    if(hour < 6){                                                                   //morning - dark
        greeting.textContent = 'Good Morning';
        document.body.style.backgroundImage = "url('img/dawn.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
    }
    if(hour < 9){                                                                   //early morning
        greeting.textContent = 'Good Morning';
        document.body.style.backgroundImage = "url('img/morning-clear.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
    }
    else if(hour < 12) {                                                            //late morning
        greeting.textContent = 'Good Morning';
        document.body.style.backgroundImage = "url('img/clear_sky.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
    }
    else if(hour < 18) {                                                            //afternoon
        greeting.textContent = 'Good Afternoon';
        document.body.style.backgroundImage = "url('img/clear_sky_noon.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
    }
    
    else if(hour < 21) {                                                            //evening
        greeting.textContent = 'Good Evening';
        document.body.style.backgroundImage = "url('img/dusk-clear-w.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
    }

    else {                                                                          //night
        greeting.textContent = 'Good Evening';
        document.body.style.backgroundImage = "url('img/night-clear.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
    }
}
    
//Call functions
showTime();
setBackground();        

});
