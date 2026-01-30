import React, { useState, useEffect } from 'react';
import SvgIcon from '../SvgIcon';
import WeatherDetails from '../weather/WeatherDetails';
import { getWeatherIconName } from '../weather/weatherUtils';
import './ListPage.css';

const ListPage = ({ cities, settings, onClose, onSelectCity }) => {
  const { tempUnit, speedUnit } = settings;
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const convertTemp = (t) => {
    if (tempUnit === 'F') return (t * 1.8) + 32;
    return t;
  };

  return (
    <div className="list-page">
      {/* <div className="list-header">
            <SvgIcon name="back" onClick={onClose}/>
             <SvgIcon name="hum" />
      </div> */}

      <div className="list-content">
        {cities.map((city, index) => {
            const { location, weatherData } = city;
            // Handle case where weatherData might be incomplete
            if (!weatherData || !weatherData.current || !weatherData.daily) return null;

            const { current, daily, current_units } = weatherData;
            
            const temp = Math.round(convertTemp(current.temperature_2m));
            const max = Math.round(convertTemp(daily.temperature_2m_max[0]));
            const min = Math.round(convertTemp(daily.temperature_2m_min[0]));
            const iconName = getWeatherIconName(current.weather_code, current.is_day);
            
            // Timezone handling
            let timeString = '--:--';
            let dateString = '';
            try {
                const options = { timeZone: location.timezone };
                
                timeString = now.toLocaleTimeString('en-US', {
                    ...options,
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });
                
                dateString = now.toLocaleDateString('en-US', {
                    ...options,
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                });
            } catch (e) {
                // Fallback or silence
            }

            return (
                <div key={index} className="weather-card" onClick={() => onSelectCity && onSelectCity(index)}>
                    <div className="card-top">
                        <div className="card-info">
                            <h2 className="card-city-name">{location.name}</h2>
                            <p className="card-country-name">{location.country}</p>
                            <p className="card-local-time">
                                <span className="card-time">{timeString}</span> {dateString}
                            </p>
                        </div>
                        <div className="card-weather">
                             <div className="weather-main-small">
                                <SvgIcon name={iconName} className="list-weather-icon" />
                                <div className="temp-container-small">
                                    <div className="big-temp-small-wrapper">
                                        {temp < 0 && <span className="minus-small">-</span>}
                                        <span className="big-temp-small">{Math.abs(temp)}°</span>
                                    </div>
                                    <div className="min-max-small">
                                        <span className="high">{max}°</span>
                                        <span className="low">{min}°</span>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                    
                    <div className="card-details-container">
                        <WeatherDetails 
                            current={current} 
                            daily={daily} 
                            units={current_units} 
                            speedUnit={speedUnit}
                        />
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};

export default ListPage;
