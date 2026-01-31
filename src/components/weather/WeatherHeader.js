
import React, { useState, useEffect } from 'react';
import '../weather/WeatherComponents.css';

const WeatherHeader = React.memo(({ location }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Update time immediately
    setDate(new Date());
    
    // Set interval to update time
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!location) return null;

  const timeZone = location.timezone;

  return (
    <div className="weather-header">
      <div className="location-info">
        <h1 className="city-name">{location.name}</h1>
        <span className="country-name">{location.country}</span>
      </div>
      <div className="date-time">
        <span className="date-text">
          {date.toLocaleString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            timeZone
          })}
        </span>
        <span className="time-text">
          {date.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone
          })}
        </span>
      </div>
    </div>
  );
});

export default WeatherHeader;
