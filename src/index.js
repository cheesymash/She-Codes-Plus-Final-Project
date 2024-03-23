function refreshWeather(responce) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = responce.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#date-time");
  let iconElement = document.querySelector("#icon");

  let date = new Date(responce.data.time * 1000);

  iconElement.innerHTML = `<img src="${responce.data.condition.icon_url}" class = "weather-icon"/>`;
  cityElement.innerHTML = responce.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = responce.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${responce.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(responce.data.wind.speed)}km/h`;

  getForcast(responce.data.city);
} //changes temperature and conditions innerhtml

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "5034aee8be80fd426tb5da773ac1o38a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
} //fetch api key

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = searchInput.value;

  searchCity(searchInput.value);
} 

function getForcast(city) {
  let apiKey = "5034aee8be80fd426tb5da773ac1o38a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(responce) {
  console.log(responce.data);

  let days = ["Mon", "Tue", "Wed", "Thur", "Fri"];
  let forcastHtml = "";

  days.forEach(function (day) {
    forcastHtml =
      forcastHtml +
      `
            <div class="weatherforcast-day">
              <div class="wether-forcast-date">${day}</div>
              <div class="weather-forcast-icon">☀️</div>
              <div class="weather-forcast-temperatures">
              <div class="weather-forcast-temperature">
              <strong>12°</strong>10°</div>
              </div>
              </div>
               
            </div>
           `;
  });

  let forecastElement = document.querySelector("#week-forcast");
  forecastElement.innerHTML = forcastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
//function searchform- addevent listener

searchCity("London");
