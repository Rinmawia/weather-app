<script setup>
import { ref, watch } from 'vue';
import { ChevronUp, ChevronDown, FlaskConical, Sun, Moon } from 'lucide-vue-next';

const props = defineProps({
  weather: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['simulate']);
const isOpen = ref(false);

const isDayMode = ref(true);
const windSpeed = ref(10);
const rainfall = ref(0);
const currentScenario = ref(null);

// Watch for weather changes to hydrate initial state
watch(() => props.weather, (newWeather) => {
  if (newWeather && !currentScenario.value) {
    isDayMode.value = newWeather.isDay;
    windSpeed.value = newWeather.windSpeed;
    rainfall.value = newWeather.precipitation;
  }
}, { immediate: true, deep: true });

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const scenarios = [
  { label: 'Clear', condition: 'Sun', nightCondition: 'Moon', defaultWind: 5, defaultRain: 0 },
  { label: 'Cloudy', condition: 'Cloud', defaultWind: 10, defaultRain: 0 },
  { label: 'Windy', condition: 'Cloud', defaultWind: 40, defaultRain: 0 },
  { label: 'Rain', condition: 'CloudRain', defaultWind: 15, defaultRain: 0 },
  { label: 'Thunder', condition: 'CloudLightning', defaultWind: 20, defaultRain: 20 },
];

// Extract icon determination logic to avoid duplication
const getIconForCondition = (scenario, isDay) => {
  if (!scenario) return props.weather?.condition || 'Cloud';
  
  let icon = scenario.condition;
  if (!isDay && scenario.nightCondition) {
    icon = scenario.nightCondition;
  } else if (!isDay && icon === 'Sun') {
    icon = 'Moon';
  }
  return icon;
};

const emitSimulation = (icon) => {
  emit('simulate', {
    condition: icon,
    isDay: isDayMode.value,
    windSpeed: windSpeed.value,
    precip: rainfall.value
  });
};

const toggleDayMode = () => {
  isDayMode.value = !isDayMode.value;
  
  if (currentScenario.value) {
    simulate(currentScenario.value);
  } else {
    const icon = getIconForCondition(null, isDayMode.value);
    emitSimulation(icon);
  }
};

const simulate = (scenario) => {
  if (scenario) {
    currentScenario.value = scenario;
    windSpeed.value = scenario.defaultWind;
    rainfall.value = scenario.defaultRain;
  }
  
  const icon = getIconForCondition(currentScenario.value, isDayMode.value);
  emitSimulation(icon);
};

const updateValues = () => {
  const icon = getIconForCondition(currentScenario.value, isDayMode.value);
  emitSimulation(icon);
};

const reset = () => {
  currentScenario.value = null;
  
  if (props.weather) {
    isDayMode.value = props.weather.isDay;
    windSpeed.value = props.weather.windSpeed;
    rainfall.value = props.weather.precipitation;
  }
  
  emit('simulate', null);
};
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
    <!-- Toggle Button -->
    <button 
      class="pointer-events-auto bg-gray-800 text-white px-4 py-2 rounded-t-xl shadow-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
      @click="toggle"
    >
      <FlaskConical class="w-4 h-4" />
      <span class="text-sm font-medium">Simulate weather</span>
      <component
        :is="isOpen ? ChevronDown : ChevronUp"
        class="w-4 h-4"
      />
    </button>

    <!-- Panel -->
    <div 
      class="pointer-events-auto bg-white dark:bg-gray-800 w-full md:w-auto md:min-w-[600px] md:rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden border-t border-gray-200 dark:border-gray-700"
      :class="[isOpen ? 'max-h-96 py-6' : 'max-h-0 py-0']"
    >
      <div class="px-6 flex flex-col gap-6 items-center">
        <!-- Top Row: Day/Night Toggle & Scenarios -->
        <div class="flex flex-col items-center gap-4 w-full">
          <!-- Day/Night Toggle -->
          <button 
            class="flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-300"
            :class="isDayMode ? 'bg-blue-100 text-blue-600' : 'bg-indigo-900 text-indigo-200'"
            @click="toggleDayMode"
          >
            <Sun
              v-if="isDayMode"
              class="w-4 h-4"
            />
            <Moon
              v-else
              class="w-4 h-4"
            />
            <span class="text-sm font-medium">{{ isDayMode ? 'Day Mode' : 'Night Mode' }}</span>
          </button>

          <!-- Scenarios -->
          <div class="flex flex-wrap justify-center gap-2">
            <button
              v-for="scenario in scenarios"
              :key="scenario.label"
              class="px-4 py-2 text-sm rounded-lg transition-all border"
              :class="[
                currentScenario === scenario 
                  ? 'bg-blue-500 text-white border-blue-600 shadow-md' 
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
              ]"
              @click="simulate(scenario)"
            >
              {{ scenario.label }}
            </button>
          </div>
        </div>

        <div class="w-full h-px bg-gray-200 dark:bg-gray-700" />

        <!-- Bottom Row: Sliders -->
        <div class="w-full grid grid-cols-2 gap-8">
          <div class="flex flex-col gap-2">
            <div class="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
              <span>Wind Speed</span>
              <span>{{ windSpeed }} km/h</span>
            </div>
            <input 
              v-model.number="windSpeed" 
              type="range" 
              min="0" 
              max="100" 
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
              @input="updateValues"
            >
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
              <span>Rainfall</span>
              <span>{{ rainfall }} mm</span>
            </div>
            <input 
              v-model.number="rainfall" 
              type="range" 
              min="0" 
              max="50" 
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
              @input="updateValues"
            >
          </div>
        </div>

        <!-- Reset Button -->
        <button
          class="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 underline decoration-dotted underline-offset-4"
          @click="reset"
        >
          Reset to Live Data
        </button>

        <!-- Footer -->
        <div class="text-[10px] text-gray-400 dark:text-gray-500 font-medium tracking-wide pb-2">
          Vibe coded using Google Antigravity by RIN.K
        </div>
      </div>
    </div>
  </div>
</template>
