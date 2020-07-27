// Challenge 1

let now = new Date();

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
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

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let liDow = document.querySelector("#day-date");
let liTime = document.querySelector("#time");

liDow.innerHTML = `${day}, ${date} ${month}`;
liTime.innerHTML = `${hours}:${minutes}`;

// City and Temp API

function showTemperature(response) {
  console.log(response.data);
  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let condition = document.querySelector("#conditions");
  condition.innerHTML = `${response.data.weather[0].description}`;
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#location-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `<strong>${input.value}<strong>`;
  let apiKey = "855dcf2816c3df70674db30fa73e361c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

// Bonus Point - Current Location
function showCurrentTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = currentTemp;
  let location = document.querySelector("h1");
  location.innerHTML = `<strong>${response.data.name}</strong>`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let condition = document.querySelector("#conditions");
  condition.innerHTML = `${response.data.weather[0].description}`;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "855dcf2816c3df70674db30fa73e361c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemp);
}
function showCurrentLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentButton = document.querySelector("#current-location-btn");
currentButton.addEventListener("click", showCurrentLoc);
