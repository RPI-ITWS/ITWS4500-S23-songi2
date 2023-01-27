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
      var temp = ((data.main.temp - 273.15) * 1.8 + 32).toPrecision(3);
      var description = data.weather[0].main;
      console.log("hi");
      // console.log(data.weather[0].main);
      document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
      // const {icon} = data.cion
      // const{icon, description} = data.weather[0]; //the data under weather
      // const{temp,humidity} = data.main;
      // const{speed} = data.wind;
      document.querySelector(".description").innerHTML = description;
      document.querySelector(".city").innerHTML = "Weather in " + name;
      // document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
      // document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°F";
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