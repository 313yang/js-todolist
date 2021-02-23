const weather = document.querySelector(".js-weather");

const API_KEY = "5144fe758c943dc22a40738e4091c060";
const COORDS = "coords";

function getWeather(lat, lng){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
      .then(function(response) {
        return response.json();
    })
      .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        const description = json.weather[0].description;
        console.log(json);
        weather.innerText = ` ${temperature}℃ . ${place} . ${description}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }

}

function init(){
    loadCoords();
}
init();