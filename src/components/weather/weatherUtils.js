
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudFog, 
  CloudDrizzle, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  Moon,
  CloudMoon
} from 'lucide-react';

export const getWeatherIcon = (code, isDay = 1) => {
  // WMO Weather interpretation codes (WW)
  // https://open-meteo.com/en/docs
  
  const iconProps = {
    size: 24,
    strokeWidth: 2,
    className: 'weather-icon'
  };

  // Clear sky
  if (code === 0) {
    return isDay ? <Sun {...iconProps} /> : <Moon {...iconProps} />;
  }
  
  // Mainly clear, partly cloudy, and overcast
  if (code === 1 || code === 2 || code === 3) {
    return isDay ? <CloudSun {...iconProps} /> : <CloudMoon {...iconProps} />;
  }
  
  // Fog
  if (code === 45 || code === 48) {
    return <CloudFog {...iconProps} />;
  }
  
  // Drizzle
  if (code >= 51 && code <= 57) {
    return <CloudDrizzle {...iconProps} />;
  }
  
  // Rain
  if (code >= 61 && code <= 67) {
    return <CloudRain {...iconProps} />;
  }
  
  // Snow
  if (code >= 71 && code <= 77) {
    return <CloudSnow {...iconProps} />;
  }
  
  // Rain showers
  if (code >= 80 && code <= 82) {
    return <CloudRain {...iconProps} />;
  }
  
  // Snow showers
  if (code >= 85 && code <= 86) {
    return <CloudSnow {...iconProps} />;
  }
  
  // Thunderstorm
  if (code >= 95 && code <= 99) {
    return <CloudLightning {...iconProps} />;
  }

  return <Cloud {...iconProps} />;
};

export const getWeatherDescription = (code) => {
  const codes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  return codes[code] || 'Unknown';
};

export const getWindDirection = (degrees) => {
  const directions = ['N', 'N.E', 'E', 'S.E', 'S', 'S.W', 'W', 'N.W'];
  const index = Math.round(((degrees %= 360) < 0 ? degrees + 360 : degrees) / 45) % 8;
  return directions[index];
};
