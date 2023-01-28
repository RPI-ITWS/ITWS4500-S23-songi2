
function getLocation() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLoc, showError);
  }else{
  }
}
    
function showLoc(pos) {
  var lat = pos.coords.latitude;
  var long = pos.coords.longitude;
  displayMap(lat, long);
  weather.fetchWeather(lat, long);
}

function convertFahrenheit(input) {
  return ((input - 273.15) * 1.8 + 32).toPrecision(3);
}

let weather = {
  fetchWeather: function (lat, long){ //Fetch helps you to create a request as GET
      fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=d39206d578254def9b2b2af92b7bcdff"
      ).then((response) => {if (!response.ok) alert("No City Was Found"); return response.json();})
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
      var name = data.name; //I am extracting data from the json file now
      let icon = data.weather[0].icon;
      var temp = convertFahrenheit(data.main.temp);
      var description = data.weather[0].description;
      var humidity = data.main.humidity;
      var wind = (data.wind.speed);
      var pressure = data.main.pressure;
      var feels = convertFahrenheit(data.main.feels_like);
      var high = convertFahrenheit(data.main.temp_max);
      var low = convertFahrenheit(data.main.temp_min);
      document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".humidity").innerHTML = "Humidity: " + `<i class="bi bi-droplet-half"></i> ` + humidity + "%";
      document.querySelector(".description").innerHTML = description;
      document.querySelector(".city").innerHTML = "Weather in " + name;
      document.querySelector(".wind").innerHTML = "Wind Speed: " + `<i class="bi bi-wind"></i> ` + wind + "mph";
      document.querySelector(".pressure").innerHTML = "Pressure: " + `<i class="bi bi-cloud-download"></i> ` + pressure + "hPa";
      document.querySelector(".feels").innerHTML = "Feels Like: " + `<i class="bi bi-thermometer-half"></i> ` + feels + "°F";
      document.querySelector(".high").innerHTML = "High Temp: " + `<i class="bi bi-thermometer-high"></i>` + high + "°F";
      document.querySelector(".low").innerHTML = "Low Temp: " + `<i class="bi bi-thermometer-low"></i> ` + low + "°F";
      document.querySelector(".temp").innerText = temp + "°F";
  },
};

function displayMap(lat, long){
  let map = L.map("map").setView([0, 0], 9);
  var msg = "Current Place"
  map.panTo(new L.LatLng(lat, long));
  L.marker([lat, long]).addTo(map).bindPopup(msg).openPopup();
  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    maxZoom: 15,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);



}


function showError(error) {

  switch(error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById("error").innerHTML = "User denied the request for Geolocation. Using default location."
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById("error").innerHTML = "Location information is unavailable. Using default location."
      break;
    case error.TIMEOUT:
      document.getElementById("error").innerHTML = "The request to get user location timed out. Using default location."
      break;
    case error.UNKNOWN_ERROR:
      document.getElementById("error").innerHTML = "An unknown error occurred. Using default location."
      break;
  }
}