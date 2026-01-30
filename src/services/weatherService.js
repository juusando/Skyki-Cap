
const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_API_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Fetches coordinates for a given city name.
 * @param {string} city - The name of the city.
 * @returns {Promise<object|null>} - The coordinates object { latitude, longitude, name, country } or null if not found.
 */
export const getCoordinates = async (city) => {
  try {
    const response = await fetch(`${GEOCODING_API_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    if (!response.ok) {
      throw new Error('Failed to fetch coordinates');
    }
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const { latitude, longitude, name, country, timezone, country_code } = data.results[0];
      return { latitude, longitude, name, country, timezone, country_code };
    }
    return null;
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
};

export const getCityNameFromCoordinates = async (lat, lon) => {
  try {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    if (!response.ok) {
      throw new Error('Failed to fetch city name');
    }
    const data = await response.json();
    const city = data.city || data.locality || data.principalSubdivision;
    const country = data.countryName;
    
    return {
      name: city || "Unknown Location",
      country: country || ""
    };
  } catch (error) {
    console.error('Error fetching city name:', error);
    return { name: "Current Location", country: "" };
  }
};

/**
 * Searches for cities matching the query.
 * @param {string} query - The search query.
 * @returns {Promise<Array>} - Array of city objects.
 */
export const searchCities = async (query) => {
  try {
    const response = await fetch(`${GEOCODING_API_URL}?name=${encodeURIComponent(query)}&count=50&language=en&format=json`);
    if (!response.ok) {
      throw new Error('Failed to search cities');
    }
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results.map(result => ({
        latitude: result.latitude,
        longitude: result.longitude,
        name: result.name,
        country: result.country,
        timezone: result.timezone,
        country_code: result.country_code,
        admin1: result.admin1 // Region/State
      }));
    }
    return [];
  } catch (error) {
    console.error('Error searching cities:', error);
    return [];
  }
};

/**
 * Fetches weather forecast for given coordinates.
 * @param {number} lat - Latitude.
 * @param {number} lon - Longitude.
 * @param {string} timezone - Timezone string (e.g. "Asia/Tokyo").
 * @returns {Promise<object|null>} - The weather data or null if failed.
 */
export const getWeather = async (lat, lon, timezone = 'auto') => {
  try {
    // Fetching comprehensive current weather data
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      timezone: timezone,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'is_day',
        'precipitation',
        'rain',
        'showers',
        'snowfall',
        'weather_code',
        'cloud_cover',
        'pressure_msl',
        'surface_pressure',
        'wind_speed_10m',
        'wind_direction_10m',
        'wind_gusts_10m'
      ].join(','),
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'sunrise',
        'sunset'
      ].join(','),
      hourly: [
        'precipitation_probability'
      ].join(',')
    });

    const response = await fetch(`${FORECAST_API_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    
    // Process data to add current precipitation probability
    if (data.current && data.hourly) {
      const currentHour = new Date(data.current.time);
      currentHour.setMinutes(0, 0, 0); // Round down to nearest hour
      const hourIndex = data.hourly.time.findIndex(t => new Date(t).getTime() === currentHour.getTime());
      
      if (hourIndex !== -1) {
        data.current.precipitation_probability = data.hourly.precipitation_probability[hourIndex];
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};
