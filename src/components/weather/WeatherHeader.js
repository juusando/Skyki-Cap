
import React from 'react';
import '../weather/WeatherComponents.css';

const WeatherHeader = ({ location, current }) => {
  if (!location || !current) return null;

  return (
    <div className="weather-header">
      <div className="location-info">
        <h1 className="city-name">{location.name}</h1>
        <span className="country-name">{location.country}</span>
      </div>
      <div className="date-time">
        <span className="date-text">
          {new Date(current.time).toLocaleString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
          })}
        </span>
        <span className="time-text">
          {new Date(current.time).toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })}
        </span>
      </div>
    </div>
  );
};

export default WeatherHeader;
