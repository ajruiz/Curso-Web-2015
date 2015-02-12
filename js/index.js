(function() {
  var API_WEATHER_KEY = "80114c7878f599621184a687fc500a12";
  var API_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + API_WEATHER_KEY + "&";
  var IMG_WEATHER = "http://openweathermap.org/img/w/";
  /*var IMG_SAT = "http://maps.googleapis.com/maps/api/staticmap?maptype=hybrid&zoom=13&size=200x100&sensor=false&center="*/

  var timeNow = hora();
  var lat;
  var lon;

  var cityWeather = {};
  cityWeather.zone;
  cityWeather.icon;
  cityWeather.temp;
  cityWeather.temp_max;
  cityWeather.temp_min;
  cityWeather.main;
  cityWeather.image;

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCoords, errorFound);
  } else {
    alert("Por favor, actualiza tu navegador");
  }

  function errorFound(error) {
    alert("Un error ocurrió: " + error.code);
    // 0: Error desconocido
    // 1: Permiso denegado
    // 2: Posición no está disponible
    // 3: Timeout
  };

  function getCoords(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    //console.log("Tu posición es: " + lat + "," + lon);
    $.getJSON(API_WEATHER_URL + "lat=" + lat + "&lon=" + lon, getCurrentWeather);
  };

  function getCurrentWeather(data) {
    cityWeather.zone = data.name + "<br>Ciudad: " + data.sys.country;
    cityWeather.icon = IMG_WEATHER + data.weather[0].icon + ".png";
    cityWeather.temp = data.main.temp - 273.15;
    cityWeather.temp_max = data.main.temp_max - 273.15;
    cityWeather.temp_min = data.main.temp_min - 273.15;
    cityWeather.main = data.weather[0].main;
    /*cityWeather.image = new Image();
    cityWeather.image = IMG_SAT + lat + ","+ lon;*/

    renderTemplate();
    console.log(cityWeather.image);
  };

  function activateTemplate(id) {
    var t = document.querySelector(id);
    return document.importNode(t.content, true);
  };

  function renderTemplate() {
    var clone = activateTemplate("#template--city");

    clone.querySelector("[data-time]").innerHTML = timeNow;
    clone.querySelector("[data-city]").innerHTML = cityWeather.zone;
    clone.querySelector("[data-icon]").src = cityWeather.icon;
   /* clone.querySelector("[data-sat]").src = cityWeather.image;*/
    clone.querySelector("[data-temp='max']").innerHTML = cityWeather.temp_max.toFixed(1);
    clone.querySelector("[data-temp='min']").innerHTML = cityWeather.temp_min.toFixed(1);
    clone.querySelector("[data-temp='current']").innerHTML = cityWeather.temp.toFixed(1);

    $(".loader").hide();
    $("body").append(clone);

  }
 
 /*Colocar la Hora bonita by Jakaboy*/
  
function hora(){
  var fecha = new Date()
  var hora = fecha.getHours()
  var minuto = fecha.getMinutes()
  var meridiano = " am"
  if(hora > 12){hora -= 12; meridiano = " pm"}
  if (hora < 10) {hora = "0" + hora}
  if (minuto < 10) {minuto = "0" + minuto}
  return hora + ":" + minuto + meridiano;
}

})();
