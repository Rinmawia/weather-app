<script setup>
defineProps({
  windSpeed: {
    type: Number,
    default: 0
  },
  humidity: {
    type: Number,
    default: 0
  },
  precipitation: {
    type: Number,
    default: 0
  },
  feelsLike: {
    type: Number,
    default: 0
  }
});
</script>

<template>
  <div class="grid grid-cols-2 gap-4 w-full md:w-auto">
    <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl">
      <div class="text-sm text-gray-500 dark:text-gray-400">
        Wind
      </div>
      <div class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {{ windSpeed }} <span class="text-sm font-normal">km/h</span>
      </div>
    </div>
    <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl">
      <div class="text-sm text-gray-500 dark:text-gray-400">
        Humidity
      </div>
      <div class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {{ humidity }}%
      </div>
    </div>
    <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl">
      <div class="text-sm text-gray-500 dark:text-gray-400">
        Precipitation
      </div>
      <div class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {{ precipitation }} <span class="text-sm font-normal">mm</span>
      </div>
    </div>
    <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl">
      <div class="text-sm text-gray-500 dark:text-gray-400">
        Feels Like
      </div>
      <div class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {{ Math.round(feelsLike) }}°
      </div>
    </div>
  </div>
</template>
