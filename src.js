const apiKey = "c5d1c414a808862303364dcd02d3d24f";
const currentDate = document.querySelector("#current-date");
const citySubmit = document.querySelector("#city-submit");
const currentCity = document.querySelector("#current-city");
const cityInput = document.querySelector("#city-input");
const form = document.querySelector("#city");
const currentCelsiusTemperatureElement = document.querySelector(
  "#current-celsius-temperature"
);
const currentFahrenheitTemperatureElement = document.querySelector(
  "#current-fahrenheit-temperature"
);

const currentCityName = document.querySelector("#current-city-name");
const iconElement = document.querySelector("#icon");
const weatherMainElement = document.querySelector("#weather-main");
const celsiusBlockElement = document.querySelector("#celsius-block");
const fahrenheitBlockElement = document.querySelector("#fahrenheit-block");

function makeDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let time = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${time}:${minutes}`;
}

function showForm() {
  citySubmit.hidden = false;
  currentCity.hidden = true;
}

currentCity.addEventListener("click", showForm);

function showCity(event) {
  event.preventDefault();
  let cityInputValue = cityInput.value;
  updateCity(cityInputValue);
}

function updateCity(cityName) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(handleResponse);
}

form.addEventListener("submit", showCity);

function handleResponse(response) {
  let weather = response.data.weather[0];

  currentCelsiusTemperatureElement.innerHTML = Math.round(
    response.data.main.temp
  );
  currentFahrenheitTemperatureElement.innerHTML = Math.round(
    (response.data.main.temp * 9) / 5 + 32
  );

  currentCity.hidden = false;
  citySubmit.hidden = true;
  currentCityName.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
  );
  iconElement.setAttribute("alt", weather.description);
  weatherMainElement.innerHTML =
    weather.description[0].toUpperCase() + weather.description.substring(1);
  currentDate.innerHTML = makeDate(response.data.dt * 1000);
  getForecast(response.data.coord);
}

function showFahrenheit(event) {
  event.preventDefault();

  fahrenheitBlockElement.hidden = false;
  celsiusBlockElement.hidden = true;
}

let toFahrenheitElement = document.querySelector("#to-fahrenheit");
toFahrenheitElement.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();

  fahrenheitBlockElement.hidden = true;
  celsiusBlockElement.hidden = false;
}

let toCelsiusElement = document.querySelector("#to-celsius");
toCelsiusElement.addEventListener("click", showCelsius);

updateCity("Lisbon");

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Wed", "Fri", "Sat"];
  let forecastHTML = "";
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
       <div class="col">
          <h5>${day}</h5>
          <img src="http://openweathermap.org/img/wn/10n.png" />
          <h6>10°C ... 17°C</h6>
        </div>
      `;
  });
  forecastElement.innerHTML = forecastHTML;
}
