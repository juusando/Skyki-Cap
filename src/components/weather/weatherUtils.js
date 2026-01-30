
export const getWeatherIconName = (code, isDay = 1) => {
  // WMO Weather interpretation codes (WW)
  // https://open-meteo.com/en/docs
  
  // Convert code to string to match filename
  const codeStr = code.toString();

  // List of available icons in assets/icons/ based on LS
  const availableIcons = [
    '0', '1', '2', '3', 
    '45', '48', 
    '51', '53', '55', '56', '57', 
    '61', '66', '67', 
    '71', '73', '75', '77', 
    '80', '81', '82', '84', '85', '86', 
    '95', '96', '99'
  ];

  // Exact match
  if (availableIcons.includes(codeStr)) {
    return codeStr;
  }

  // Mappings for missing codes
  switch (code) {
    case 63: return '61'; // Moderate rain -> Slight rain
    case 65: return '61'; // Heavy rain -> Slight rain
    // Add other mappings if necessary
    default: return '0'; // Default to clear sky
  }
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
