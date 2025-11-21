import { ref, watch } from 'vue';
import { getWeather } from '../services/weather';

// Constants
const DEFAULT_SIMULATION_TEMP = 20;
const DEFAULT_SIMULATION_HUMIDITY = 60;
const DEFAULT_SIMULATION_FEELS_LIKE = 22;
const DEFAULT_WIND_SPEED = 10;

export function useWeather() {
  const weatherData = ref(null);
  const realWeatherData = ref(null);
  const isSimulating = ref(false);
  const loading = ref(false);
  const error = ref(null);
  const isDark = ref(false);

  const fetchWeather = async (lat, lon) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await getWeather(lat, lon);
      realWeatherData.value = data;
      if (!isSimulating.value) {
        weatherData.value = data;
      }
    } catch (e) {
      const errorMessage = e.response?.status === 404
        ? 'Location not found. Please try again.'
        : e.code === 'ECONNABORTED'
          ? 'Request timeout. Please check your connection.'
          : 'Failed to fetch weather data. Please try again.';
      error.value = errorMessage;
      console.error('Weather fetch error:', e);
    } finally {
      loading.value = false;
    }
  };

  const handleSimulation = (scenario) => {
    if (!scenario) {
      // Reset
      isSimulating.value = false;
      if (realWeatherData.value) {
        weatherData.value = realWeatherData.value;
      }
      return;
    }

    isSimulating.value = true;

    const baseData = realWeatherData.value || {
      hourly: [],
      daily: []
    };

    weatherData.value = {
      ...baseData,
      current: {
        ...baseData.current,
        temp: DEFAULT_SIMULATION_TEMP,
        condition: scenario.condition,
        isDay: scenario.isDay,
        precipitation: scenario.precip !== undefined ? scenario.precip : 0,
        windSpeed: scenario.windSpeed !== undefined ? scenario.windSpeed : DEFAULT_WIND_SPEED,
        humidity: baseData.current?.humidity || DEFAULT_SIMULATION_HUMIDITY,
        feelsLike: baseData.current?.feelsLike || DEFAULT_SIMULATION_FEELS_LIKE,
      }
    };
  };

  // Watch for day/night changes to update theme
  watch(() => weatherData.value, (newData) => {
    if (newData?.current) {
      isDark.value = !newData.current.isDay;
      if (isDark.value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });

  return {
    weatherData,
    loading,
    error,
    isSimulating,
    fetchWeather,
    handleSimulation
  };
}
