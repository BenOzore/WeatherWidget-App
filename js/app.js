const apiKey = `32fea0d9f2d9bfc792de0894cfdd9a51`;
let lat, long;
const currentConditions = document.querySelector('.current-conditions');

navigator.geolocation.getCurrentPosition(position => {
  lat = position.coords.latitude;
  long = position.coords.longitude;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`)
    .then(resp => resp.json())
    .then(currentWeatherData => {
      const kelvinTemp = currentWeatherData.main.temp;
      const celcius = (kelvinTemp - 273);
      
      currentConditions.innerHTML = "";
      currentConditions.insertAdjacentHTML('afterbegin', 
      `<h2>Current Conditions</h2>
          <img src="http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png"/>
        <div class="current">
          <div class="temp">${(celcius).toFixed(0)}℃</div>
          <div class="condition">${currentWeatherData.weather[0].main}
        </div>`);

      return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`)
        .then(resp => resp.json())
        .then(weatherForecast => {
          weatherForecast;
        });
    });
});



