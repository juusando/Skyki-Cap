
import React from 'react';
import { getWeatherIconName, getWeatherDescription } from './weatherUtils';
import SvgIcon from '../SvgIcon';
import '../weather/WeatherComponents.css';

const CurrentWeather = React.memo(({ current, daily, units, tempUnit }) => {
  if (!current || !daily) return null;

  const weatherCode = current.weather_code;
  const isDay = current.is_day;
  const description = getWeatherDescription(weatherCode);
  
  const convertTemp = (t) => {
    if (tempUnit === 'F') return (t * 1.8) + 32;
    return t;
  };

  const roundedTemp = Math.round(convertTemp(current.temperature_2m));
  const iconName = getWeatherIconName(weatherCode, isDay);

  return (
    <div className="current-weather-section">
      <div className="main-icon">
        <SvgIcon name={iconName} className="weather-icon main" style={{ width: 80, height: 80 }} />
         <h2 className="weather-condition">{description}</h2>
      </div>
     
      <div className="big-temperature">
        <div className="minus" style={{ display: roundedTemp < 0 ? 'flex' : 'none' }}>-</div>
        <span className="degree-symbol ghost" style={{ display: roundedTemp < 0 ? 'none' : undefined }}>°</span>
        {Math.abs(roundedTemp)}
        <span className="degree-symbol">°</span>
      </div>
      <div className="temp-range-simple">
        <span className="high">{Math.round(convertTemp(daily.temperature_2m_max[0]))}°</span>
        <span className="low">{Math.round(convertTemp(daily.temperature_2m_min[0]))}°</span>
      </div>
    </div>
  );
});

export default CurrentWeather;
