<script setup>
import { computed } from 'vue';
import { 
  Cloud, Sun, Moon, CloudLightning, CloudRain 
} from 'lucide-vue-next';
import WeatherAnimation from './WeatherAnimation.vue';
import WeatherDetails from './WeatherDetails.vue';

const props = defineProps({
  weather: {
    type: Object,
    default: () => ({})
  }, // NormalizedWeather object
  location: {
    type: Object,
    default: () => ({})
  },
});

const current = computed(() => props.weather?.current);

// Simple icon mapping for display
const icons = {
  Cloud, Sun, Moon, CloudLightning: CloudLightning, CloudRain: CloudRain
};

const CurrentIcon = computed(() => {
  if (!current.value) return Cloud;
  return icons[current.value.condition] || Cloud;
});

const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
};
</script>

<template>
  <div
    v-if="current"
    class="relative bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-xl transition-colors duration-300 overflow-hidden"
  >
    <WeatherAnimation 
      :condition="current.condition" 
      :is-day="current.isDay"
      :wind-speed="current.windSpeed"
      :precipitation="current.precipitation"
    />
    
    <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
      <div class="text-center md:text-left">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {{ location?.name || 'Unknown Location' }}
        </h2>
        <p class="text-gray-500 dark:text-gray-400 text-lg">
          {{ formatDate(new Date().toISOString()) }}
        </p>
        
        <div class="mt-8 flex flex-col items-center md:items-start">
          <div class="text-7xl md:text-9xl font-bold text-gray-900 dark:text-white tracking-tighter">
            {{ Math.round(current.temp) }}°
          </div>
          <div class="text-xl text-gray-600 dark:text-gray-300 font-medium mt-2">
            {{ current.isDay ? 'Day' : 'Night' }}
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center">
        <component
          :is="CurrentIcon"
          class="w-32 h-32 md:w-48 md:h-48 text-blue-500 dark:text-blue-400 drop-shadow-lg"
        />
      </div>

      <WeatherDetails 
        :wind-speed="current.windSpeed"
        :humidity="current.humidity"
        :precipitation="current.precipitation"
        :feels-like="current.feelsLike"
      />
    </div>
  </div>
</template>
