import { useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import SvgIcon from './components/SvgIcon';
import './App.css';
import './components/weather/WeatherComponents.css';
import WeatherPage from './components/weather/WeatherPage';
import SearchPage from './components/search/SearchPage';
import SettingsPage from './components/settings/SettingsPage';
import ListPage from './components/list/ListPage';
import { getCoordinates, getWeather, getCityNameFromCoordinates } from './services/weatherService';

const CITIES = [
  // North America
  'New York', 'Los Angeles', 'Chicago', 'Miami', 'Toronto', 'Vancouver', 'Mexico City',
  // South America
  'Rio de Janeiro', 'Buenos Aires', 'Santiago', 'Lima', 'Bogota',
  // Europe
  'London', 'Paris', 'Berlin', 'Rome', 'Madrid', 'Moscow', 'Istanbul', 'Stockholm', 'Athens', 'Reykjavik', 'Amsterdam',
  // Africa
  'Casablanca', 'Cape Town', 'Cairo', 'Lagos', 'Nairobi', 'Dakar',
  // Asia
  'Tokyo', 'Beijing', 'Mumbai', 'Bangkok', 'Singapore', 'Dubai', 'Seoul', 'Hong Kong', 'Jakarta', 'New Delhi',
  // Oceania
  'Sydney', 'Melbourne', 'Auckland', 'Fiji'
];

function App() {
  const [cities, setCities] = useState([]); // Array of { location, weatherData }
  const [currentPage, setCurrentPage] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    useCurrentLocation: false,
    tempUnit: 'C',
    speedUnit: 'km',
    currentLocationName: ''
  });

  // Swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchMove = (e) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchEnd = () => {
    if (!touchStart) return;

    const currentTouchEnd = touchEnd || touchStart;
    const distanceX = touchStart.x - currentTouchEnd.x;
    const distanceY = touchStart.y - currentTouchEnd.y;
    const isSwipe = Math.abs(distanceX) > minSwipeDistance;

    if (isSwipe) {
      const isLeftSwipe = distanceX > minSwipeDistance;
      const isRightSwipe = distanceX < -minSwipeDistance;

      if (isLeftSwipe && currentPage < cities.length - 1) {
        setCurrentPage(curr => curr + 1);
      }
      if (isRightSwipe && currentPage > 0) {
        setCurrentPage(curr => curr - 1);
      }
    } else {
      // Tap detection (minimal movement)
      if (Math.abs(distanceX) < 10 && Math.abs(distanceY) < 10) {
        const width = window.innerWidth;
        const tapZone = width * 0.3; // 30% from edge

        if (touchStart.x < tapZone && currentPage > 0) {
          setCurrentPage(curr => curr - 1);
        } else if (touchStart.x > (width - tapZone) && currentPage < cities.length - 1) {
          setCurrentPage(curr => curr + 1);
        }
      }
    }
  };

  // Helper to fetch weather for a location and return the city object
  const fetchCityData = async (location) => {
    try {
      const weather = await getWeather(location.latitude, location.longitude, location.timezone);
      if (!weather) return null;
      return { location, weatherData: weather };
    } catch (error) {
      console.error("Failed to fetch weather for", location.name, error);
      return null;
    }
  };

  // Initial load
  useEffect(() => {
    const init = async () => {
      try {
        const savedSettings = JSON.parse(localStorage.getItem('weatherAppSettings'));
        if (savedSettings) {
          setSettings(savedSettings);
        }

        const savedCities = JSON.parse(localStorage.getItem('savedCities') || '[]');
        let initialCities = [];
        
        // 1. Load Saved Cities
        if (savedCities.length > 0) {
          const promises = savedCities.map(location => fetchCityData(location));
          const results = await Promise.all(promises);
          initialCities = results.filter(city => city !== null);
        }

        // 2. Handle Current Location if enabled
        if (savedSettings?.useCurrentLocation) {
             try {
               const position = await Geolocation.getCurrentPosition();
               const { latitude, longitude } = position.coords;
               const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                
               const locationInfo = await getCityNameFromCoordinates(latitude, longitude);

               const location = {
                 latitude,
                 longitude,
                 name: locationInfo.name,
                 country: locationInfo.country,
                 timezone,
                 isCurrentLocation: true
               };
               const currentCityData = await fetchCityData(location);
               if (currentCityData) {
                 initialCities.unshift(currentCityData);
                 // Update name in settings
                 setSettings(prev => ({ ...prev, currentLocationName: locationInfo.name }));
               }
             } catch (geoError) {
               console.error("Geo error on init", geoError);
               // If initial load fails, we might want to disable it or just silently fail for now
               // But let's keep the setting true so it tries again next time or user can toggle it
             }
        }

        // 3. Fallback if empty
        if (initialCities.length === 0) {
           const coords = await getCoordinates('Casablanca');
           if (coords) {
             const cityData = await fetchCityData(coords);
             if (cityData) initialCities.push(cityData);
           }
        }
        
        setCities(initialCities);

      } catch (error) {
        console.error("Failed to load initial data", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Save cities to local storage whenever they change
  useEffect(() => {
    if (cities.length > 0) {
      const locationsToSave = cities
        .filter(city => !city.location.isCurrentLocation)
        .map(city => city.location);
      localStorage.setItem('savedCities', JSON.stringify(locationsToSave));
    }
  }, [cities]);

  const handleAddLocation = async (newLocation) => {
    // Check if already exists to avoid duplicates (fuzzy match on coords)
    const index = cities.findIndex(
      city => Math.abs(city.location.latitude - newLocation.latitude) < 0.01 && 
              Math.abs(city.location.longitude - newLocation.longitude) < 0.01
    );
    
    if (index === -1) {
      // Add temporary loading state if needed, or just fetch and update
      // Ideally we want to show it immediately, but let's fetch first for simplicity
      const cityData = await fetchCityData(newLocation);
      if (cityData) {
        const newCities = [...cities, cityData];
        setCities(newCities);
        setCurrentPage(newCities.length - 1);
      }
    } else {
      setCurrentPage(index);
    }
  };

  const handleUpdateSettings = async (newSettings) => {
    const prevUseCurrentLocation = settings.useCurrentLocation;
    setSettings(newSettings);
    localStorage.setItem('weatherAppSettings', JSON.stringify(newSettings));

    // Handle Current Location Toggle
    if (newSettings.useCurrentLocation && !prevUseCurrentLocation) {
      try {
        const position = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        const locationInfo = await getCityNameFromCoordinates(latitude, longitude);

        const location = {
          latitude,
          longitude,
          name: locationInfo.name,
          country: locationInfo.country,
          timezone,
          isCurrentLocation: true
        };

        const cityData = await fetchCityData(location);
        if (cityData) {
            setCities(prev => [cityData, ...prev]);
            setCurrentPage(0);
            // Update name in settings
            setSettings(prev => ({ ...prev, currentLocationName: locationInfo.name }));
            localStorage.setItem('weatherAppSettings', JSON.stringify({ ...newSettings, currentLocationName: locationInfo.name }));
        }
      } catch (error) {
        console.error("Geolocation error:", error);
        alert("Failed to get current location. Please ensure location services are enabled.");
        const revertedSettings = { ...newSettings, useCurrentLocation: false };
        setSettings(revertedSettings);
        localStorage.setItem('weatherAppSettings', JSON.stringify(revertedSettings));
      }
    } else if (!newSettings.useCurrentLocation && prevUseCurrentLocation) {
      setCities(prev => prev.filter(c => !c.location.isCurrentLocation));
      if (currentPage >= cities.length - 1) {
         setCurrentPage(Math.max(0, cities.length - 2));
      }
    }
  };

  const handleRandomCity = async () => {
    if (cities.length === 0) return;
    
    const randomCityName = CITIES[Math.floor(Math.random() * CITIES.length)];
    const coords = await getCoordinates(randomCityName);
    
    if (coords) {
      const cityData = await fetchCityData(coords);
      if (cityData) {
        const newCities = [...cities];
        newCities[currentPage] = cityData; // Replace current page
        setCities(newCities);
      }
    }
  };
  
  const handleSelectList = (index) => {
    setCurrentPage(index);
    setShowList(false);
  };

  const handleDeleteCity = (index) => {
    const cityToDelete = cities[index];
    const newCities = cities.filter((_, i) => i !== index);
    setCities(newCities);
    
    // Adjust currentPage
    if (currentPage === index) {
      // If deleted current, go to previous or 0
      setCurrentPage(Math.max(0, index - 1));
    } else if (currentPage > index) {
      // If deleted before current, shift left
      setCurrentPage(currentPage - 1);
    }
    // If deleted after current, no change needed
  };

  const handleReorderCities = (newCities) => {
    // Find where the current city moved to
    const currentCity = cities[currentPage];
    const newIndex = newCities.findIndex(c => c.location.name === currentCity.location.name && c.location.latitude === currentCity.location.latitude);
    
    setCities(newCities);
    if (newIndex !== -1) {
      setCurrentPage(newIndex);
    }
  };

  if (loading) return <div className="App"><main className="App-main">Loading...</main></div>;

  return (
    <div className="App">
      <header className="App-header">
        <div className="icon-examples" onClick={handleRandomCity}>
          {/* Logo / Header content */}
        </div>
      </header>
      
      <main 
        className="App-main"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {cities.length > 0 ? (
          <div className="weather-slider">
            <WeatherPage 
              location={cities[currentPage].location} 
              weatherData={cities[currentPage].weatherData}
              settings={settings}
            />
          </div>
        ) : (
          <div className="empty-state">No locations added</div>
        )}
      </main>

      {/* Footer Navigation */}
      <footer className="app-footer">
        {/* Left Button (Menu placeholder) */}
        <button className="footer-btn" aria-label="Menu" onClick={() => setShowSettings(true)}>
          <SvgIcon name="hum"  />
        </button>
        
        {/* Pagination Dots */}
        <div className="pagination-dots">
          {cities.map((_, index) => (
            <button 
              key={index} 
              className={`dot ${index === currentPage ? 'active' : ''}`}
              onClick={() => setCurrentPage(index)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0px', pointerEvents: 'auto' }}>
          <button 
            className="footer-btn" 
            onClick={() => setShowList(true)}
            aria-label="List View"
          >
            <SvgIcon name="hum2" />
          </button>
          <button 
            className="footer-btn" 
            onClick={() => setShowSearch(true)}
            aria-label="Add Location"
          >
            <SvgIcon name="add" />
          </button>
        </div>
      </footer>

      {/* Search Overlay */}
      {showSearch && (
        <SearchPage 
          onClose={() => setShowSearch(false)} 
          onAddLocation={handleAddLocation} 
        />
      )}

      {/* Settings Overlay */}
      {showSettings && (
        <SettingsPage 
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
      
      {showList && (
        <ListPage 
          cities={cities}
          settings={settings}
          onClose={() => setShowList(false)}
          onSelectCity={handleSelectList}
          onDeleteCity={handleDeleteCity}
          onReorderCities={handleReorderCities}
        />
      )}

    </div>
  );
}

export default App;
