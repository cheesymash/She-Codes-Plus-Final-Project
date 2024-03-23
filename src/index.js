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

  getForecast(responce.data.city);
}

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
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "5034aee8be80fd426tb5da773ac1o38a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(responce) {
  let forecastHtml = "";

  responce.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
            <div class="weather-forecast-day">
              <div class="wether-forecast-date">
                  <strong>   ${formatDay(day.time)} </strong>
                 </div>
                      <img src = "${
                        day.condition.icon_url
                      }" class="weather-forecast-icon"> 

                  <div class="weather-forecast-temperatures">
                      <div class="weather-forecast-temperature">
                      <strong>${Math.round(day.temperature.maximum)}°</strong>
                      </div>
                      <div class="weather-forecast-temperature">${Math.round(
                        day.temperature.minimum
                      )}°
                    </div>
                </div>
          </div>
          `;
    }
  });

  let forecastElement = document.querySelector("#week-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
