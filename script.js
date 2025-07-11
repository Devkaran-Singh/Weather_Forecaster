document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.querySelector("#input-field");
  const weatherButton = document.querySelector("#weather-button");
  const weatherDisplay = document.getElementById("weather-display");
  const cityName = document.querySelector("#city-name");
  const temperatureDetail = document.querySelector("#temperature");
  const humidityDetail = document.querySelector("#humidity");
  const weatherDetail = document.querySelector("#weather");
  const errorMessage = document.querySelector("#error-message");

  weatherButton.addEventListener("click", async () => {
    const city = inputField.value.trim();
    if (!city) {
      return;
    }
    try {
      const weatherData = await fetchData(city);
      displayData(weatherData);
    } catch (error) {
      showError();
    }
    inputField.value = "";
  });

  async function fetchData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  }

  function displayData(data) {
    console.log(data);
    let t = data.main.temp - 273.15;
    t = t.toFixed(2);
    let str = data.weather[0].description;
    str = str.charAt(0).toUpperCase() + str.slice(1);
    cityName.textContent = data.name;
    temperatureDetail.textContent = `Temperature: ${t}°C`;
    humidityDetail.textContent = `Huidity: ${data.main.humidity}%`;
    weatherDetail.textContent = `Weather: ${str}`;
    weatherDisplay.classList.remove("hidden");
    weatherDisplay.classList.add("flex");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherDisplay.classList.add("hidden");
    errorMessage.classList.add("flex");
    errorMessage.classList.remove("hidden");
  }
});
