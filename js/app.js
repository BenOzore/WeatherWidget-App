const apiKey = `32fea0d9f2d9bfc792de0894cfdd9a51`;
let lat, long;
const currentConditions = document.querySelector(".current-conditions");
const forecastEleTag = document.querySelector(".forecast");
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

navigator.geolocation.getCurrentPosition((position) => {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  currentWeather(lat, long);
  fiveDaysForecast(lat, long);
});

function currentWeather(lat, long) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`)
    .then((resp) => resp.json())
    .then((currentWeatherData) => {
      const currentWeatherTemp = currentWeatherData.main.temp;
      const currentWeatherCelcius = currentWeatherTemp - 273; //converting kelvin to celcius

      currentConditions.innerHTML = "";
      currentConditions.insertAdjacentHTML(
        "afterbegin",
        `<h2>Current Conditions</h2>
          <img src="http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png"/>
          <div class="current">
          <div class="temp">${currentWeatherCelcius.toFixed(0)}℃</div>
          <div class="condition">${currentWeatherData.weather[0].description}
        </div>`
      );
    });
}

function fiveDaysForecast(lat, long) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`)
    .then((resp) => resp.json())
    .then((weatherForecast) => {
      const weatherArray = weatherForecast.list;

      weatherArray.forEach((dayForecast) => {
        let date = new Date(dayForecast.dt_txt);

        const highForecastTemp = dayForecast.main.temp_max;
        const lowForecastTemp = dayForecast.main.temp_min;
        const highTempCelcius = highForecastTemp - 273;
        const lowTempCelcius = lowForecastTemp - 273;
        if (date.toLocaleTimeString() === "12:00:00 PM") {
          forecastEleTag.insertAdjacentHTML(
            "beforeend",
            `
              <div class="day">
                <h3>${weekdays[date.getDay()]}</h3>
                <img src="http://openweathermap.org/img/wn/${dayForecast.weather[0].icon}@2x.png"/>
                <div class="description">${dayForecast.weather[0].description}</div>
                <div class="temp">
              <span class="high">℃</span> / 
              <span class="low">℃</span>
            </div>
          </div>`
          );
        }
      });
    });
}
