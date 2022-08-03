const apiKey = "c5d1c414a808862303364dcd02d3d24f";
const currentDate = document.querySelector("#current-date");
const citySubmit = document.querySelector("#city-submit");
const currentCity = document.querySelector("#current-city");
const cityInput = document.querySelector("#city-input");
const form = document.querySelector("#city");
const currentTemperature = document.querySelector("#current-temperature");
const currentCityName = document.querySelector("#current-city-name");
const iconElement = document.querySelector("#icon");

let now = new Date();
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
let currentTime = `${day} ${time}:${minutes}`;

currentDate.innerHTML = currentTime;

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
  currentTemperature.innerHTML = Math.round(response.data.main.temp);

  currentCity.hidden = false;
  citySubmit.hidden = true;
  currentCityName.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  console.log(response.data);
}
updateCity("Lisbon");
