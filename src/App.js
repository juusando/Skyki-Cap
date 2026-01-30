import { useEffect, useState } from 'react';
import './App.css';
import './components/weather/WeatherComponents.css';
import SvgIcon from './components/SvgIcon';
import { getCoordinates, getWeather } from './services/weatherService';
import WeatherHeader from './components/weather/WeatherHeader';
import CurrentWeather from './components/weather/CurrentWeather';
import WeatherDetails from './components/weather/WeatherDetails';
import WeeklyForecast from './components/weather/WeeklyForecast';

const CITIES = [
  'Tokyo', 'New York', 'London', 'Paris', 'Sydney', 
  'Dubai', 'Singapore', 'Casablanca', 'Rio de Janeiro', 
  'Cape Town', 'Moscow', 'Beijing', 'Mumbai', 'Berlin',
  'Toronto', 'Los Angeles', 'Madrid', 'Rome', 'Bangkok'
];

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      // 1. Get coordinates
      const coords = await getCoordinates(cityName);
      if (!coords) {
        throw new Error('Location not found');
      }
      setLocation(coords);

      // 2. Get weather for those coordinates
      const weather = await getWeather(coords.latitude, coords.longitude, coords.timezone);
      if (!weather) {
        throw new Error('Failed to fetch weather data');
      }
      setWeatherData(weather);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('Casablanca');
  }, []);

  const handleRandomCity = () => {
    const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
    fetchWeather(randomCity);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="icon-examples" onClick={handleRandomCity}>
          {/* <SvgIcon name="cal" className={"logo"} /> */}
            {/* SKYKI */}
        </div>
        {/* SKYKI */}
      </header>
      <main className="App-main">
        {loading && <p>Loading weather data...</p>}
        {error && <p className="error">Error: {error}</p>}
        
        {location && weatherData && weatherData.current && (
          <div className="weather-container" onClick={handleRandomCity}>
            <WeatherHeader 
              location={location} 
              current={weatherData.current} 
            />
            
            <CurrentWeather 
              current={weatherData.current} 
              daily={weatherData.daily} 
              units={weatherData.current_units} 
            />
            
            <div className='footer-info'>
              <WeatherDetails 
                current={weatherData.current} 
                daily={weatherData.daily}
                units={weatherData.current_units} 
              />
              
              <WeeklyForecast 
                daily={weatherData.daily} 
              />
            </div>
            
            {/* <div className="coordinates-footer">
              <small>Lat: {location.latitude}, Lon: {location.longitude}</small>
            </div> */}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
