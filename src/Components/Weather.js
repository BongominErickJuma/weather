import React, { useState, useEffect } from "react";
import axios from "axios";
import { weatherApi, weatherUrl } from "../api";
import Search from "./Search";
import CurrentWeather from "./CurrentWeather/CurrentWeather";
import Forecast from "./Forecast/Forecast";
import "./Weather.css";
import { FaTimes } from "react-icons/fa";

const getStoredLat = () => {
  const storedItem = localStorage.getItem("lat");

  if (storedItem) {
    return JSON.parse(localStorage.getItem("lat"));
  } else {
    return 0.313611111;
  }
};
const getStoredLon = () => {
  const storedItem = localStorage.getItem("lon");

  if (storedItem) {
    return JSON.parse(localStorage.getItem("lon"));
  } else {
    return 32.581111111;
  }
};

const getStoredPlace = () => {
  const storedItem = localStorage.getItem("place");

  if (storedItem) {
    return JSON.parse(localStorage.getItem("place"));
  } else {
    return "Kampala";
  }
};

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setforecastData] = useState({});
  const [loading, setLoading] = useState(true);
  const [widget, setWidget] = useState(false);
  const [lat, setLat] = useState(getStoredLat());
  const [lon, setLon] = useState(getStoredLon());
  const [place, setPlace] = useState(getStoredPlace("place"));

  const handleSetDefault = () => {
    localStorage.setItem("lat", JSON.stringify(lat));
    localStorage.setItem("lon", JSON.stringify(lon));
    localStorage.setItem("place", JSON.stringify(place));
  };

  const handleSearchChange = (searchInput) => {
    setPlace(searchInput.label);
    const [newLat, newLon] = searchInput.value.split(" ");
    setLat(newLat);
    setLon(newLon);
  };

  const handleHideWidget = () => {
    setWidget(!widget);
    setPlace(getStoredPlace('place'))
    setLat(getStoredLat('lat'))
    setLon(getStoredLon('lon'))
  };


  useEffect(() => {
    const weatherFetch = axios.get(
      `${weatherUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApi}&units=metric`
    );
    const forecastFetch = axios.get(
      `${weatherUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApi}&units=metric`
    );
    Promise.all([weatherFetch, forecastFetch])
      .then((response) => {
        setWeatherData(response[0].data);
        setforecastData(response[1].data);
        setLoading(false);
        if(place !== getStoredPlace('place')){
          setWidget(true)
        }
        
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      });
  }, [lat, lon, place]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const date = new Date();
  const today = date.toDateString();
  return (
    <div className="weather-body">
      <Search onSearchChange={handleSearchChange} />
      <div className="place">
        <i className="material-icons">location_on</i>
        <h4 className="title">{place}</h4>
        <p className="today">{today}</p>
      </div>
      <CurrentWeather data={weatherData} />
      <Forecast data={forecastData} />
      {widget && (
        <div className="widget">
          <div className="top">
            <h4 className="title">{place}</h4>
            <button onClick={handleSetDefault}>
              set default
            </button>
            <FaTimes className="times" onClick={handleHideWidget} />
          </div>
          <CurrentWeather data={weatherData} />
        </div>
      )}
    </div>
  );
};

export default Weather;
