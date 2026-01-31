
import React from 'react';
import { getWindDirection } from './weatherUtils';
import SvgIcon from '../SvgIcon';
import '../weather/WeatherComponents.css';

const WeatherDetails = ({ current, daily, units, speedUnit }) => {
  if (!current || !daily) return null;

  const formatTime = (isoString) => {
    if (!isoString) return '--:--';
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getSpeed = (speed) => {
    if (speedUnit === 'mph') {
       return Math.round(speed / 1.60934);
    }
    return speed;
  };
  
  const speedUnitStr = speedUnit === 'mph' ? 'mph' : 'km/h';

  return (
    <div className="weather-details-row">
      <div className="detail-item">
        <div className="detail-icon"><SvgIcon name="sunrise" /></div>
        {formatTime(daily.sunrise[0])}
      </div>

      <div className="detail-item">
        <div className="detail-icon"><SvgIcon name="sunset"  /></div>
       {formatTime(daily.sunset[0])}
      </div>

      <div className="detail-item">
        <div className="detail-icon"><SvgIcon name="humidity"  /></div>
        <div className="detail-text">
          {current.relative_humidity_2m}
          <span className="detail-value">{units.relative_humidity_2m}</span>
        </div>
      </div>
            
      <div className="detail-item">
        <div className="detail-icon"><SvgIcon name="prec" /></div>
        <div className="detail-text">
          {current.precipitation_probability ?? 0} 
          <span className="detail-value">%</span>
        </div>
      </div>

      <div className="detail-item">
        <div className="detail-icon"><SvgIcon name="wind-speed" /></div>
        <div className="detail-text">
          {getSpeed(current.wind_speed_10m)} 
          <span className="detail-value">{speedUnitStr}</span>
        </div>
      </div>
      
      <div className="detail-item">
        <div className="detail-icon wind-box"><SvgIcon name="wind-direction" style={{ '--wind-rotation': `${current.wind_direction_10m - 45}deg` }} /></div>
        <div className="detail-text">
        {getWindDirection(current.wind_direction_10m)} 
          <span className="detail-value">{current.wind_direction_10m}°</span>
        </div>

      </div>


    </div>
  );
};

export default WeatherDetails;
