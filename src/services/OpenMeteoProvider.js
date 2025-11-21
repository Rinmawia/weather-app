import axios from 'axios';
import { WeatherProvider } from './WeatherProvider';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const TIMEOUT_MS = 10000;

export class OpenMeteoProvider extends WeatherProvider {
  async getWeather(lat, lon) {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          latitude: lat,
          longitude: lon,
          current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m',
          hourly: 'temperature_2m,weather_code,precipitation_probability',
          daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum',
          timezone: 'auto',
          forecast_days: 7,
        },
        timeout: TIMEOUT_MS
      });
      return this.normalize(response.data);
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please try again.');
      }
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  async searchCity(query) {
    try {
      const response = await axios.get(GEOCODING_URL, {
        params: {
          name: query,
          count: 5,
          language: 'en',
          format: 'json',
        },
        timeout: TIMEOUT_MS
      });
      return response.data.results || [];
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please try again.');
      }
      console.error('Error searching city:', error);
      throw error;
    }
  }

  normalize(data) {
    return {
      current: {
        temp: data.current.temperature_2m,
        condition: this.weatherCodeToIcon(data.current.weather_code, data.current.is_day),
        windSpeed: data.current.wind_speed_10m,
        humidity: data.current.relative_humidity_2m,
        precipitation: data.current.precipitation,
        feelsLike: data.current.apparent_temperature,
        isDay: !!data.current.is_day,
      },
      hourly: this.normalizeHourly(data.hourly),
      daily: this.normalizeDaily(data.daily),
    };
  }

  normalizeHourly(hourlyData) {
    const now = new Date();
    const items = [];

    // Find start index (current hour)
    const currentHourIndex = hourlyData.time.findIndex(t => new Date(t) >= now);
    const startIndex = currentHourIndex !== -1 ? currentHourIndex : 0;
    const endIndex = startIndex + 24;

    for (let i = startIndex; i < endIndex && i < hourlyData.time.length; i++) {
      items.push({
        time: new Date(hourlyData.time[i]),
        temp: hourlyData.temperature_2m[i],
      });
    }
    return items;
  }

  normalizeDaily(dailyData) {
    return dailyData.time.map((time, index) => ({
      date: new Date(time),
      max: dailyData.temperature_2m_max[index],
      min: dailyData.temperature_2m_min[index],
      condition: this.weatherCodeToIcon(dailyData.weather_code[index], 1),
      precip: dailyData.precipitation_sum[index],
    }));
  }

  weatherCodeToIcon(code, isDay = 1) {
    const icons = {
      0: isDay ? 'Sun' : 'Moon',
      1: isDay ? 'Sun' : 'Moon',
      2: 'Cloud',
      3: 'Cloud',
      45: 'Cloud',
      48: 'Cloud',
      51: 'CloudRain',
      53: 'CloudRain',
      55: 'CloudRain',
      56: 'CloudRain',
      57: 'CloudRain',
      61: 'CloudRain',
      63: 'CloudRain',
      65: 'CloudRain',
      66: 'CloudRain',
      67: 'CloudRain',
      71: 'CloudRain', // Snow mapped to rain for now or Cloud
      73: 'CloudRain',
      75: 'CloudRain',
      77: 'CloudRain',
      80: 'CloudRain',
      81: 'CloudRain',
      82: 'CloudRain',
      85: 'CloudRain',
      86: 'CloudRain',
      95: 'CloudLightning',
      96: 'CloudLightning',
      99: 'CloudLightning',
    };
    return icons[code] || 'Cloud';
  }
}
