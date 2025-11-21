import { OpenMeteoProvider } from './OpenMeteoProvider';

// Singleton instance
const provider = new OpenMeteoProvider();

export const getWeather = (lat, lon) => provider.getWeather(lat, lon);
export const searchCity = (query) => provider.searchCity(query);
export const weatherCodeToIcon = (code, isDay) => provider.weatherCodeToIcon(code, isDay);
