import React from 'react';
import WeatherHeader from './WeatherHeader';
import CurrentWeather from './CurrentWeather';
import WeatherDetails from './WeatherDetails';
import WeeklyForecast from './WeeklyForecast';
import '../weather/WeatherComponents.css';

const WeatherPage = ({ location, weatherData, settings }) => {
  if (!weatherData) return <div className="weather-container loading"><p>Loading weather...</p></div>;

  const tempUnit = settings?.tempUnit || 'C';
  const speedUnit = settings?.speedUnit || 'km';

  return (
    <div className="weather-container page-container">
      <WeatherHeader 
        location={location} 
        current={weatherData.current} 
      />
      
      <CurrentWeather 
        current={weatherData.current} 
        daily={weatherData.daily} 
        units={weatherData.current_units}
        tempUnit={tempUnit}
      />
      
      <div className='footer-info'>
        <WeatherDetails 
          current={weatherData.current} 
          daily={weatherData.daily}
          units={weatherData.current_units}
          speedUnit={speedUnit}
        />
        
        <WeeklyForecast 
          daily={weatherData.daily} 
          tempUnit={tempUnit}
        />
      </div>
    </div>
  );
};

export default WeatherPage;
