const apiKey = `32fea0d9f2d9bfc792de0894cfdd9a51`;
navigator.geolocation.getCurrentPosition(function (pos) {
  getCurrentConditions(pos.coords.latitude, pos.coords.longitude);
  getForecastedConditions(pos.coords.latitude, pos.coords.longitude);
});

function getForecastedConditions(lat, long) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`)
    .then(resp => resp.json())
    .then(data => {
      updateForecastedConditionsHTML(data)
    });
}

function getCurrentConditions(lat, long) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`)
    .then(resp => resp.json())
    .then(data => {
      updateCurrentConditionsHTML(data.weather[0], data.main)
    });
}

function updateCurrentConditionsHTML(conditions, current) {
  const currentConditionsEle = document.querySelector('.current-conditions');
  const currentConditionsHTML = `
    <h2>Current Conditions</h2>
    <img src="http://openweathermap.org/img/wn/${conditions.icon}@2x.png" />
    <div class="current">
      <div class="temp">${Math.round(current.temp)}℃</div>
      <div class="condition">${conditions.description}</div>
    </div>
  `;

  currentConditionsEle.innerHTML = currentConditionsHTML;
}

function updateForecastedConditionsHTML(data) {
  const groupedForecasts = groupForecasts(data);
  const todaysDate = new Date();
  const forecastDiv = document.querySelector(".forecast");
  let forecastHTML = "";

  for (let x = 1; x <= 5; x++) {
    const forecastedDay = (todaysDate.getDay() + x) % 7;
    const maxTemp = getMaxTemp(groupedForecasts[forecastedDay]);
    const minTemp = getMinTemp(groupedForecasts[forecastedDay]);
    const dayName = getDayName(forecastedDay);
    const condition = groupedForecasts[forecastedDay][0].weather[0].description
    const icon = groupedForecasts[forecastedDay][0].weather[0].icon

    forecastHTML += `
      <div class="day">
        <h3>${dayName}</h3>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" />
        <div class="description">${condition}</div>
        <div class="temp">
          <span class="high">${Math.round(maxTemp)}℃</span>/<span class="low">${Math.round(minTemp)}℃</span>
        </div>
      </div>
    `
  }

  forecastDiv.innerHTML = forecastHTML;
}

function getDayName(dayNumber) {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayNumber];
}

function getMaxTemp(forecasts) {
  let maxTemp;

  forecasts.forEach(forecast => {
    if (maxTemp === undefined || maxTemp < forecast.main.temp_max) {
      maxTemp = forecast.main.temp_max;
    }
  });

  return maxTemp;
}

function getMinTemp(forecasts) {
  let minTemp;

  forecasts.forEach(forecast => {
    if (minTemp === undefined || minTemp > forecast.main.temp_min) {
      minTemp = forecast.main.temp_min;
    }
  });

  return minTemp;
}

function groupForecasts(data) {
  const dailyForecasts = {};

  data.list.forEach(forecast => {
    const forecastDate = new Date(forecast.dt_txt);

    if (dailyForecasts[forecastDate.getDay()] === undefined) {
      dailyForecasts[forecastDate.getDay()] = [];
    }

    dailyForecasts[forecastDate.getDay()].push(forecast);
  })

  return dailyForecasts;
}