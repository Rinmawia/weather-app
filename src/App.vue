<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue';
import Header from './components/Header.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import HourlyForecast from './components/HourlyForecast.vue';
import DailyForecast from './components/DailyForecast.vue';
import DebugBar from './components/DebugBar.vue';
import { useLocation } from './composables/useLocation';
import { useWeather } from './composables/useWeather';

// Composables
const { 
  currentLocation, 
  loading: locationLoading, 
  error: locationError, 
  setLocation, 
  getUserLocation 
} = useLocation();

const { 
  weatherData, 
  loading: weatherLoading, 
  error: weatherError, 
  fetchWeather, 
  handleSimulation 
} = useWeather();

// Dynamic page title
watch([weatherData, currentLocation], ([weather, location]) => {
  if (weather?.current && location) {
    const temp = Math.round(weather.current.temp);
    const locationName = location.name;
    document.title = `${temp}° ${locationName} - Khawchin by RIN.K`;
  } else {
    document.title = 'Khawchin by RIN.K';
  }
}, { immediate: true });

// Handlers
const handleCitySelected = (city) => {
  setLocation(city);
  fetchWeather(city.latitude, city.longitude);
};

const handleKeydown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const headerInput = document.querySelector('input[type="text"]');
    if (headerInput) headerInput.focus();
  }
};

// Initial Load
onMounted(() => {
  getUserLocation(
    (lat, lon) => fetchWeather(lat, lon), // Success
    () => fetchWeather(currentLocation.value.lat, currentLocation.value.lon) // Error/Fallback
  );

  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 font-sans pb-12">
    <Header 
      @city-selected="handleCitySelected" 
    />

    <main class="container mx-auto px-4 pt-8 max-w-6xl">
      <div
        v-if="locationLoading || weatherLoading"
        class="flex justify-center items-center h-64"
      >
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>

      <div
        v-else-if="locationError || weatherError"
        class="text-center text-red-500 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg"
      >
        {{ locationError || weatherError }}
      </div>

      <div
        v-else
        class="space-y-6"
      >
        <!-- Top Section: Current Weather -->
        <CurrentWeather
          :weather="weatherData"
          :location="currentLocation"
        />

        <!-- Middle Section: Hourly & Daily -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Hourly Chart (Takes 2 columns on large screens) -->
          <div class="lg:col-span-2">
            <HourlyForecast :items="weatherData?.hourly" />
          </div>

          <!-- Daily Forecast (Takes 1 column) -->
          <div class="lg:col-span-1">
            <DailyForecast :items="weatherData?.daily" />
          </div>
        </div>
      </div>
    </main>

    <DebugBar 
      :weather="weatherData?.current"
      @simulate="handleSimulation" 
    />
  </div>
</template>
