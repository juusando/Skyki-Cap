
import React from 'react';
import { getWeatherIcon, getWeatherDescription } from './weatherUtils';
import '../weather/WeatherComponents.css';

const CurrentWeather = ({ current, daily, units }) => {
  if (!current || !daily) return null;

  const weatherCode = current.weather_code;
  const isDay = current.is_day;
  const description = getWeatherDescription(weatherCode);
  const roundedTemp = Math.round(current.temperature_2m);

  return (
    <div className="current-weather-section">
      <div className="main-icon">
        {React.cloneElement(getWeatherIcon(weatherCode, isDay), { size: 80, strokeWidth: 1.5 })}
         <h2 className="weather-condition">{description}</h2>
      </div>
     
      <div className="big-temperature">
        <div className="minus" style={{ display: roundedTemp < 0 ? 'flex' : 'none' }}>-</div>
        <span className="degree-symbol ghost" style={{ display: roundedTemp < 0 ? 'none' : undefined }}>°</span>
        {Math.abs(roundedTemp)}
        <span className="degree-symbol">°</span>
      </div>
      <div className="temp-range-simple">
        <span className="high">{Math.round(daily.temperature_2m_max[0])}°</span>
        <span className="low">{Math.round(daily.temperature_2m_min[0])}°</span>
      </div>
    </div>
  );
};

export default CurrentWeather;
