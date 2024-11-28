import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState("Mumbai");

  const API_KEY = "4d3e7c97342572987d375e737a238470";

  // Fetch current weather
  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Fetch 5-day forecast
  const fetchForecast = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
      );
      setForecastData(response.data.list.slice(0, 5)); 
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  // Fetch data when the city changes
  useEffect(() => {
    fetchWeather();
    fetchForecast();
  }, [city]);

  return (
    <div className="weather-app">
      {/* LeftCard */}
      <div className="left-card">
        <h2>Current Weather</h2>
        <p>{new Date().toLocaleDateString()}</p>
        {weatherData && (
          <>
            <h3>
              {weatherData.name} - {weatherData.sys.country}
            </h3>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className="weather-icon"
            />
            <h1>{Math.round(weatherData.main.temp - 273.15)}°C</h1>
            <p>{weatherData.weather[0].main}</p>
          </>
        )}
      </div>

      {/* RightCard */}
      <div className="right-card">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={() => {
          fetchWeather();
          fetchForecast();
        }}>Search</button>

        {forecastData.length > 0 && (
          <div className="forecast">
            <h3>5-Day Forecast</h3>
            <div className="forecast-list">
              {forecastData.map((item, index) => (
                <div key={index} className="forecast-item">
                  <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt={item.weather[0].description}
                  />
                  <p>{Math.round(item.main.temp - 273.15)}°C</p>
                  <p>{item.weather[0].main}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
