
import React from 'react';
import { Wind, Droplets, Umbrella, Navigation, Sunrise, Sunset } from 'lucide-react';
import { getWindDirection } from './weatherUtils';
import '../weather/WeatherComponents.css';

const WeatherDetails = ({ current, daily, units }) => {
  if (!current || !daily) return null;

  const formatTime = (isoString) => {
    if (!isoString) return '--:--';
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="weather-details-row">
      <div className="detail-item">
        <div className="detail-icon"><Sunrise size={20} /></div>
        <span className="detail-value">{formatTime(daily.sunrise[0])}</span>
      </div>

      <div className="detail-item">
        <div className="detail-icon"><Sunset size={20} /></div>
        <span className="detail-value">{formatTime(daily.sunset[0])}</span>
      </div>

      <div className="detail-item">
        <div className="detail-icon"><Wind size={20} /></div>
        <span className="detail-value">{current.wind_speed_10m}{units.wind_speed_10m}</span>
      </div>
      
      <div className="detail-item">
        <div className="detail-icon"><Navigation size={20} style={{ transform: `rotate(${current.wind_direction_10m - 45}deg)` }} /></div>
        <span className="detail-value">{getWindDirection(current.wind_direction_10m)}</span>
      </div>
      
      <div className="detail-item">
        <div className="detail-icon"><Umbrella size={20} /></div>
        <span className="detail-value">{current.precipitation_probability ?? 0}%</span>
      </div>
      
      <div className="detail-item">
        <div className="detail-icon"><Droplets size={20} /></div>
        <span className="detail-value">{current.relative_humidity_2m}{units.relative_humidity_2m}</span>
      </div>
    </div>
  );
};

export default WeatherDetails;
