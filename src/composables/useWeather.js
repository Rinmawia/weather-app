import { ref, watch } from 'vue';
import { getWeather } from '../services/weather';

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
      error.value = 'Failed to fetch weather data. Please try again.';
      console.error(e);
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

    // Create a mock weather object based on the real one but with overridden current conditions
    const baseData = realWeatherData.value || {
      hourly: [],
      daily: []
    };

    weatherData.value = {
      ...baseData,
      current: {
        ...baseData.current,
        temp: 20, // Default temp for simulation if needed, or could be dynamic
        condition: scenario.condition,
        isDay: scenario.isDay,
        precipitation: scenario.precip !== undefined ? scenario.precip : 0,
        windSpeed: scenario.windSpeed !== undefined ? scenario.windSpeed : 10,
        // Keep or add dummy values
        humidity: baseData.current?.humidity || 60,
        feelsLike: baseData.current?.feelsLike || 22,
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
