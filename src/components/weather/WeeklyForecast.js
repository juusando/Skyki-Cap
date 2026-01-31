
import React from 'react';
import { getWeatherIconName } from './weatherUtils';
import SvgIcon from '../SvgIcon';
import '../weather/WeatherComponents.css';

const WeeklyForecast = React.memo(({ daily, tempUnit }) => {
  if (!daily) return null;

  const convertTemp = (t) => {
    if (tempUnit === 'F') return (t * 1.8) + 32;
    return t;
  };

  // Create an array of day objects
  const days = daily.time.map((time, index) => {
    return {
      time,
      weatherCode: daily.weather_code[index],
      maxTemp: daily.temperature_2m_max[index],
      minTemp: daily.temperature_2m_min[index],
    };
  }).slice(1); // Exclude today (index 0)

  return (
    <div className="weekly-forecast">
      {days.map((day, index) => {
        const date = new Date(day.time);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
        
        return (
          <div key={index} className="forecast-item">
            <span className="forecast-day">{dayName}</span>
            <span className="forecast-temp-high">{Math.round(convertTemp(day.maxTemp))}°</span>
            <span className="forecast-temp-low">{Math.round(convertTemp(day.minTemp))}°</span>
            <div className="forecast-icon">
              <SvgIcon name={getWeatherIconName(day.weatherCode, 1)} className="weather-icon small" style={{ width: 24, height: 24 }} />
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default WeeklyForecast;
