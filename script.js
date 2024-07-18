function getWeather() {
  const apiKey = "653f9fa5679fefaaf2df49a97dae42b2";
  const city = document.getElementById("city").value;

  if(!city) {
    alert("Please enter a city");
    return;
  };

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  // Display Weather
  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error("Error fetching current weather data", error);
      alert("Error fetching current weather data. Please try again.");
    });

  // Display Hourly Forecast
  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      displayHourlyForecast(data.list);
    })
    .catch(error => {
      console.error("Error fetching hourly forecast data", error);
      alert("Error fetching hourly forecast data. Please try again.");
    });
}

function displayWeather(data){
  const weatherInfoDiv = document.getElementById("weather-info");
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  // Clear previous content
  weatherInfoDiv.innerHTML = '';
  hourlyForecastDiv.innerHTML = '';

  if (data.cod === '404') {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round((data.main.temp - 273.15) * 9/5 + 32);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    const month = new Date().toLocaleString('default', { month: 'long' });
    const day = new Date().getDate();

    const weatherHTML = `
      <div class="weather-left">
        <img src=${iconUrl} alt=${description} id="weather-icon"/>
      </div>
      <div id="weather-right">
        <div id="weather-top">
          <p id="weather-city">${cityName}</p>
          <p id="weather-date">${month} ${day}</p>
        </div>
        <div id="weather-middle">
          <p id="weather-temperature">${temperature}°F</p>
        </div>
        <div id="weather-bottom">
          <p id="weather-description">${description}</p>
        </div>
      </div>
    `;

    weatherInfoDiv.innerHTML = weatherHTML;

    showDiv();
  };
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById('hourly-forecast');
  const next24Hours = hourlyData;

  next24Hours.forEach(item => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.toLocaleString('en-US', { hour: 'numeric', hour12: true });
    const temperature = Math.round((item.main.temp -273.15) * 9/5 + 32);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHTML = `
      <div class="hourly-item">
        <span>${hour}</span>
        <img src="${iconUrl}" alt="Hourly Weather Icon">
        <span>${temperature}°F</span>
      </div>
    `;
    hourlyForecastDiv.innerHTML += hourlyItemHTML
  });
}

const showDiv = () => document.getElementById('weather-info').style.display = "flex";