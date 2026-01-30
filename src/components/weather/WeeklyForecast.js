
import React from 'react';
import { getWeatherIcon } from './weatherUtils';
import '../weather/WeatherComponents.css';

const WeeklyForecast = ({ daily }) => {
  if (!daily) return null;

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
            <span className="forecast-temp-high">{Math.round(day.maxTemp)}°</span>
            <span className="forecast-temp-low">{Math.round(day.minTemp)}°</span>
            <div className="forecast-icon">
              {React.cloneElement(getWeatherIcon(day.weatherCode, 1), { size: 24 })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyForecast;
