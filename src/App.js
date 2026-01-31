import { useEffect, useState, useLayoutEffect, useRef } from 'react';
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
  
  // Track if this is a fresh install before effects run
  const isFreshInstallRef = useRef(!localStorage.getItem('weatherAppSettings') && !localStorage.getItem('savedCities'));

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('weatherAppSettings');
    const initialValue = saved ? JSON.parse(saved) : {};
    
    // Merge with defaults to ensure all keys exist
    return {
      useCurrentLocation: false,
      tempUnit: 'C',
      speedUnit: 'km',
      currentLocationName: '',
      themeColor: '#ff6b6b',
      darkMode: false,
      ...initialValue
    };
  });

  // Apply theme and dark mode immediately
  useLayoutEffect(() => {
    if (settings.themeColor) {
      document.documentElement.style.setProperty('--theme-color', settings.themeColor);
    }
    
    if (settings.darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [settings.themeColor, settings.darkMode]);

  // Save settings to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('weatherAppSettings', JSON.stringify(settings));
  }, [settings]);

  // Swipe state
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEndRef.current = null;
    touchStartRef.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    };
  };

  const onTouchMove = (e) => {
    touchEndRef.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    };
  };

  const onTouchEnd = () => {
    if (!touchStartRef.current) return;

    const currentTouchStart = touchStartRef.current;
    const currentTouchEnd = touchEndRef.current || currentTouchStart;
    
    const distanceX = currentTouchStart.x - currentTouchEnd.x;
    const distanceY = currentTouchStart.y - currentTouchEnd.y;
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

        if (currentTouchStart.x < tapZone && currentPage > 0) {
          setCurrentPage(curr => curr - 1);
        } else if (currentTouchStart.x > (width - tapZone) && currentPage < cities.length - 1) {
          setCurrentPage(curr => curr + 1);
        }
      }
    }
    
    // Reset refs
    touchStartRef.current = null;
    touchEndRef.current = null;
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
        // Try to load cached full data first for instant render
        const cachedCitiesData = JSON.parse(localStorage.getItem('cachedCitiesData') || '[]');
        if (cachedCitiesData.length > 0) {
          setCities(cachedCitiesData);
          setLoading(false);
        }

        const savedCities = JSON.parse(localStorage.getItem('savedCities') || '[]');
        
        let locationsToFetch = [];
        if (savedCities.length > 0) {
          locationsToFetch = savedCities;
        }

        // Determine if we should try auto-location (Fresh Install or explicitly enabled)
        const shouldTryLocation = settings.useCurrentLocation || isFreshInstallRef.current;

        // Handle Current Location
        if (shouldTryLocation) {
             try {
               // Add timeout to prevent hanging if permission prompt is ignored or location is unavailable
               const position = await Geolocation.getCurrentPosition({ timeout: 10000, enableHighAccuracy: false });
               const { latitude, longitude } = position.coords;
                
               const locationInfo = await getCityNameFromCoordinates(latitude, longitude);

               const currentLocation = {
                 latitude,
                 longitude,
                 name: locationInfo.name,
                 country: locationInfo.country,
                 timezone: locationInfo.timezone || 'UTC', // Ensure timezone exists
                 isCurrentLocation: true
               };
               
               // Add current location to fetch list (at the beginning)
               locationsToFetch = [currentLocation, ...locationsToFetch];
               
               // Update settings
               setSettings(prev => ({ 
                   ...prev, 
                   currentLocationName: locationInfo.name,
                   useCurrentLocation: true 
               }));
             } catch (geoError) {
               console.error("Geo error on init", geoError);
             }
        }

        // If we have locations to fetch, do it
        if (locationsToFetch.length > 0) {
            const promises = locationsToFetch.map(location => fetchCityData(location));
            const results = await Promise.all(promises);
            const validCities = results.filter(city => city !== null);
            
            setCities(validCities);
        }
        
      } catch (error) {
        console.error("Failed to load initial data", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []); // Only run once on mount

  // Save cities (including weather data) to local storage whenever they change
  useEffect(() => {
    if (cities.length > 0) {
      // Save locations list
      const locationsToSave = cities
        .filter(city => !city.location.isCurrentLocation)
        .map(city => city.location);
      localStorage.setItem('savedCities', JSON.stringify(locationsToSave));
      
      // Save full data cache
      localStorage.setItem('cachedCitiesData', JSON.stringify(cities));
    }
  }, [cities]);

  const handleAddLocation = async (newLocation) => {
    if (cities.length >= 9) {
      alert("You can only add up to 9 weather locations.");
      return;
    }

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
        setShowList(false); // Ensure we go to the weather view
        setShowSearch(false); // Close search if open
      }
    } else {
      setCurrentPage(index);
      setShowList(false); // Ensure we go to the weather view
      setShowSearch(false); // Close search if open
    }
  };

  const handleUpdateSettings = async (newSettings) => {
    const prevUseCurrentLocation = settings.useCurrentLocation;
    setSettings(newSettings);
    
    // Theme application is handled by useLayoutEffect now

    // Handle Current Location Toggle
    if (newSettings.useCurrentLocation && !prevUseCurrentLocation) {
      try {
        const position = await Geolocation.getCurrentPosition({ timeout: 10000, enableHighAccuracy: false });
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
            setShowList(false); // Ensure we go to the weather view
        }
      } catch (error) {
        console.error("Geolocation error:", error);
        alert("Failed to get current location. Please ensure location services are enabled.");
        const revertedSettings = { ...newSettings, useCurrentLocation: false };
        setSettings(revertedSettings);
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

    // Sync with settings if deleting current location
    if (cityToDelete.location.isCurrentLocation) {
        setSettings(prev => ({ ...prev, useCurrentLocation: false }));
    }

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

  if (cities.length === 0) {
      return (
          <div className="App">
              <main className="App-main empty-state-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '20px', textAlign: 'center'}}>
                  <p style={{marginBottom: '20px', fontSize: '18px', color: 'var(--text-primary)'}}>Turn on your location tracking or add a location +</p>
                  
                  <button 
                    className="add-location-btn" 
                    onClick={() => handleUpdateSettings({ ...settings, useCurrentLocation: true })}
                    style={{
                      marginBottom: '15px',
                      padding: '10px 20px',
                      fontSize: '16px',
                      borderRadius: '20px',
                      border: 'none',
                      background: 'var(--theme-color)',
                      color: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    Add my location
                  </button>

                  <button 
                    className="add-location-btn" 
                    onClick={() => setShowSearch(true)}
                    style={{
                      padding: '10px 20px',
                      fontSize: '16px',
                      borderRadius: '20px',
                      border: '2px solid var(--theme-color)',
                      background: 'transparent',
                      color: 'var(--theme-color)',
                      cursor: 'pointer'
                    }}
                  >
                    Add Location +
                  </button>
                  {showSearch && (
                      <div className="modal-overlay">
                          <SearchPage 
                              onClose={() => setShowSearch(false)} 
                              onAddLocation={(loc) => {
                                  handleAddLocation(loc);
                                  setShowSearch(false);
                              }} 
                          />
                      </div>
                  )}
              </main>
          </div>
      );
  }

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
        <div style={{ display: 'flex', gap: '0px', pointerEvents: 'auto' }}>
        <button className="footer-btn" aria-label="Menu" onClick={() => setShowSettings(true)}>
          <SvgIcon name="hum"  />
        </button>
                <button className="footer-btn" >
       
        </button>
          </div>
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
