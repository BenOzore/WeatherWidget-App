const apiKey = `32fea0d9f2d9bfc792de0894cfdd9a51`;
let lat, long;

navigator.geolocation.getCurrentPosition(position => {
  lat = position.coords.latitude;
  long = position.coords.longitude;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`)
    .then(resp => resp.json())
    .then(data => {
      data;
    });
});



