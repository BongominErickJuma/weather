import React from "react";
import "./Forecast.css";

const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastWeek = weekDays
    .slice(dayInAWeek, weekDays.length)
    .concat(weekDays.slice(0, dayInAWeek));
  return (
    <div>
      <h4 className="title-forecast">Forecast</h4>
      <div className="forecast">
      {data.list.slice(0, 7).map((item, idx) => (
        <div className="forecast-day" key={idx}>
          <code className="day">{forecastWeek[idx]}</code>
          <div>
            <img
              src={`Icons/${item.weather[0].icon}.png`}
              alt="night"
              className="forecast-icon"
            />
          </div>
          <code>
            {Math.round(item.main.temp_min)}/{Math.round(item.main.temp_max)}
            °C
          </code>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Forecast;
