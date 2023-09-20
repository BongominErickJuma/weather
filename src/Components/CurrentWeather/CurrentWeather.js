import React from "react";
import './CurrentWeather.css'

const CurrentWeather = ({ data }) => {
  return (
    <div className="current-weather">
      <div className="weather-details">
        <h1 className="temp-figure">{Math.round(data.main.temp)}</h1>
        <p className="sup">°C</p>
        <img
          src={`Icons/${data.weather[0].icon}.png`}
          alt=""
          className="icon"
        />
      </div>
      <code className="desc">{data.weather[0].description}</code>
      <div className="other-info">
        <div className="info">
          <code>min/max</code>
          <code>
            {Math.round(data.main.temp_min)}/{Math.round(data.main.temp_max)}°C
          </code>
        </div>
        <div className="info">
          <code>Wind</code>
          <code>{data.wind.speed}m/s</code>
        </div>
        <div className="info">
          <code>humidity</code>
          <code>{Math.round(data.main.humidity)}%</code>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
