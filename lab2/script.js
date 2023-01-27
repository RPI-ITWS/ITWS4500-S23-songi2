function getLocation() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLoc, showError);
  }else{
  }
}
    
function showLoc(pos) {

  var lat = pos.coords.latitude;
  var long = pos.coords.longitude;
  weather.fetchWeather(lat, long);
  // var xhttp = new XMLHttpRequest();

  //   xhttp.onreadystatechange = function () {
  //     if (this.readyState == 4 && this.status == 200) {

  //       var jsonObj = JSON.parse(this.responseText);

  //       var temperature = (1.8 * (jsonObj.main.temp - 273) + 32).toFixed(0) + "°F";
  //       var feelsLike = "<strong>feels like:</strong> " + (1.8 * (jsonObj.main.feels_like - 273) + 32).toFixed(0) + "°F";
  //       var pressure = jsonObj.main.pressure + " hPa";
  //       var humidity = jsonObj.main.humidity + "%";
  //       var wind = (jsonObj.wind.speed * 2.237).toFixed(2) + " mph";

  //       document.getElementById("loc").innerHTML = jsonObj.name;
  //       document.getElementById("temp").innerHTML = temperature;
  //       document.getElementById("weather").innerHTML = jsonObj.weather[0].description + "<br><br>";
  //       document.getElementById("feels").innerHTML = feelsLike;
  //       document.getElementById("hum").innerHTML = humidity;
  //       document.getElementById("pre").innerHTML = pressure;
  //       document.getElementById("speed").innerHTML = wind;
  //     }
  //   };

  //   xhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=269c0626376ca1c96a1e100335085499", true);

  //   xhttp.send();
}

let weather = {
  fetchWeather: function (lat, long){ //Fetch helps you to create a request as GET
      fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=d39206d578254def9b2b2af92b7bcdff"
      ).then((response) => {if (!response.ok) alert("No City Was Found"); return response.json();})
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
      const {name} = data.name; //I am extracting data from the json file now
      // const {icon} = data.cion
      // const{icon, description} = data.weather[0]; //the data under weather
      // const{temp,humidity} = data.main;
      // const{speed} = data.wind;
      // document.querySelector(".city").innerText = "Weather in " + name;
      // document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
      // document.querySelector(".description").innerText = description;
      // document.querySelector(".temp").innerText = temp + "°C";
      // document.querySelector(".humidity").innerText ="Humidity: " + humidity + "%";
      // document.querySelector(".wind").innerText ="Wind speed: " + speed + " km/h";
  },
};


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