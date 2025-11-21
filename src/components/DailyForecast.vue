<script setup>
import { 
  Cloud, Sun, Moon, CloudLightning, CloudRain 
} from 'lucide-vue-next';

defineProps({
  items: {
    type: Array,
    default: () => []
  }
});

const iconMap = {
  Cloud, Sun, Moon, CloudLightning: CloudLightning, CloudRain: CloudRain
};

const getIcon = (iconName) => {
  return iconMap[iconName] || Cloud;
};

const getDayName = (date) => {
  const today = new Date();
  if (date.toDateString() === today.toDateString()) return 'Today';
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-xl transition-colors duration-300 h-full">
    <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-6">
      7-Day Forecast
    </h3>
    <div class="space-y-4">
      <div 
        v-for="(day, index) in items" 
        :key="index"
        class="flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-xl transition-colors"
      >
        <div class="w-16 font-medium text-gray-600 dark:text-gray-300">
          {{ getDayName(day.date) }}
        </div>
        
        <div class="flex items-center gap-3 flex-1 justify-center">
          <component
            :is="getIcon(day.condition)"
            class="w-8 h-8 text-blue-500 dark:text-blue-400"
          />
          <span
            v-if="day.precip > 0"
            class="text-xs text-blue-400 font-medium"
          >
            {{ Math.round(day.precip) }}mm
          </span>
        </div>

        <div class="flex items-center gap-4 w-24 justify-end">
          <span class="font-bold text-gray-800 dark:text-white">{{ Math.round(day.max) }}°</span>
          <span class="text-gray-400 dark:text-gray-500">{{ Math.round(day.min) }}°</span>
        </div>
      </div>
    </div>
  </div>
</template>
