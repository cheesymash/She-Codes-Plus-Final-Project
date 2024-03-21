function refreshWeather(responce) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = responce.data.temperature.current;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = responce.data.city;

  temperatureElement.innerHTML = Math.round(temperature);
} //changes temperature innerhtml

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
} //changes city innerhtml using search

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
//function searchform- addevent listener

searchCity("London"); //automatically allows city to be london when refreshed
