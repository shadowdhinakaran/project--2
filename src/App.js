import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const API_KEY = '8bcac17e0aa210ce0cca7e331e896a5c'; // Replace with your OpenWeatherMap API key

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      setError('City not found or something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-warning ">
      <div className="card p-4 shadow-sm w-100  text-white" style={{ maxWidth: '400px',backgroundColor:'lightblue' }}>
        <h3 className="text-center mb-4 text-primary">🌦️ Weather App</h3>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-primary" onClick={fetchWeather}>
            Search
          </button>
        </div>

        {loading && (
          <div className="text-center my-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && <p className="text-danger text-center">{error}</p>}

        {weather && !loading && (
          <div className="text-center mt-4">
            <h4 className="fw-bold">
              {weather.name}, {weather.sys.country}
            </h4>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <h2>{weather.main.temp}°C</h2>
            <p className="text-capitalize ">
              {weather.weather[0].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
