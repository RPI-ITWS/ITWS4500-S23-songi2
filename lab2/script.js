function getLocation() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLoc, showError);
  }else{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

        var jsonObj = JSON.parse(this.responseText);

        var temperature = (1.8 * (jsonObj.main.temp - 273) + 32).toFixed(0) + "°F";
        var feelsLike = "<strong>feels like:</strong> " + (1.8 * (jsonObj.main.feels_like - 273) + 32).toFixed(0) + "°F";
        var pressure = jsonObj.main.pressure + " hPa";
        var humidity = jsonObj.main.humidity + "%";
        var wind = (jsonObj.wind.speed * 2.237).toFixed(2) + " mph";

        document.getElementById("loc").innerHTML = jsonObj.name;
        document.getElementById("temp").innerHTML = temperature;
        document.getElementById("weather").innerHTML = jsonObj.weather[0].description + "<br><br>";
        document.getElementById("feels").innerHTML = feelsLike;
        document.getElementById("hum").innerHTML = humidity;
        document.getElementById("pre").innerHTML = pressure;
        document.getElementById("speed").innerHTML = wind;
      }
    };

    xhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat=42.73&lon=-73.68&APPID=d39206d578254def9b2b2af92b7bcdff", true);

    xhttp.send();
  }
}
    
function showLoc(pos) {

  var lat = pos.coords.latitude;
  var long = pos.coords.longitude;

  var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

        var jsonObj = JSON.parse(this.responseText);

        var temperature = (1.8 * (jsonObj.main.temp - 273) + 32).toFixed(0) + "°F";
        var feelsLike = "<strong>feels like:</strong> " + (1.8 * (jsonObj.main.feels_like - 273) + 32).toFixed(0) + "°F";
        var pressure = jsonObj.main.pressure + " hPa";
        var humidity = jsonObj.main.humidity + "%";
        var wind = (jsonObj.wind.speed * 2.237).toFixed(2) + " mph";

        document.getElementById("loc").innerHTML = jsonObj.name;
        document.getElementById("temp").innerHTML = temperature;
        document.getElementById("weather").innerHTML = jsonObj.weather[0].description + "<br><br>";
        document.getElementById("feels").innerHTML = feelsLike;
        document.getElementById("hum").innerHTML = humidity;
        document.getElementById("pre").innerHTML = pressure;
        document.getElementById("speed").innerHTML = wind;
      }
    };

    xhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=269c0626376ca1c96a1e100335085499", true);

    xhttp.send();
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

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      var jsonObj = JSON.parse(this.responseText);

      var temperature = (1.8 * (jsonObj.main.temp - 273) + 32).toFixed(0) + "°F";
      var feelsLike = "<strong>feels like:</strong> " + (1.8 * (jsonObj.main.feels_like - 273) + 32).toFixed(0) + "°F";
      var pressure = jsonObj.main.pressure + " hPa";
      var humidity = jsonObj.main.humidity + "%";
      var wind = (jsonObj.wind.speed * 2.237).toFixed(2) + " mph";

      document.getElementById("loc").innerHTML = jsonObj.name;
      document.getElementById("temp").innerHTML = temperature;
      document.getElementById("weather").innerHTML = jsonObj.weather[0].description + "<br><br>";
      document.getElementById("feels").innerHTML = feelsLike;
      document.getElementById("hum").innerHTML = humidity;
      document.getElementById("pre").innerHTML = pressure;
      document.getElementById("speed").innerHTML = wind;
    }
  };

  xhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat=42.73&lon=-73.68&APPID=269c0626376ca1c96a1e100335085499", true);

  xhttp.send();
}