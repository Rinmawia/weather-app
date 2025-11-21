<script setup>
import { computed } from 'vue';

const props = defineProps({
  condition: {
    type: String,
    default: 'Cloud'
  }, // 'Sun', 'Moon', 'Cloud', 'CloudRain', 'CloudLightning'
  isDay: Boolean,
  windSpeed: {
    type: Number,
    default: 10
  },
  precipitation: {
    type: Number,
    default: 0
  }
});

const animationType = computed(() => {
  let type = props.condition || 'Cloud';
  
  // Normalize icon names to internal types
  if (type === 'Sun' || type === 'Moon') return 'clear';
  if (type === 'CloudLightning') return 'thunder';
  if (type === 'CloudRain') return 'rain';
  
  // Default to cloudy for Cloud or others
  return 'cloudy';
});

const isWindy = computed(() => {
  return props.windSpeed > 20; // Threshold for windy animation
});

// Calculate animation durations based on wind speed
const windDuration = computed(() => {
  const speed = props.windSpeed || 5;
  const duration = Math.max(1, 100 / Math.max(1, speed));
  return `${duration}s`;
});

const rainCount = computed(() => {
  const precip = props.precipitation || 0;
  return Math.min(100, 20 + precip * 5);
});
</script>

<template>
  <div
    class="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none transition-colors duration-700"
    :class="[
      props.isDay ? 'bg-blue-400/10' : 'bg-slate-900/40'
    ]"
  >
    <!-- CLEAR -->
    <div v-if="animationType === 'clear'">
      <div
        v-if="props.isDay"
        class="absolute inset-0 bg-linear-to-br from-blue-400 to-blue-200 opacity-20"
      >
        <div class="sun absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-400 rounded-full blur-2xl opacity-60 animate-pulse-glow" />
        <div class="sun-core absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-yellow-300 rounded-full shadow-[0_0_60px_rgba(253,224,71,0.8)]" />
      </div>
      <div
        v-else
        class="absolute inset-0 bg-linear-to-br from-indigo-900 to-purple-900 opacity-40"
      >
        <div class="moon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gray-100 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.5)] animate-pulse-glow" />
        <div class="star absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle" />
        <div class="star absolute top-1/3 left-2/3 w-1.5 h-1.5 bg-white rounded-full animate-twinkle delay-75" />
        <div class="star absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full animate-twinkle delay-150" />
      </div>
    </div>

    <!-- CLOUDY -->
    <div v-if="animationType === 'cloudy'">
      <!-- Background Sun/Moon (Dimmed) -->
      <div
        v-if="props.isDay"
        class="absolute inset-0 bg-linear-to-br from-gray-300 to-blue-100 opacity-30"
      >
        <div class="sun absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-yellow-400/50 rounded-full blur-xl" />
      </div>
      <div
        v-else
        class="absolute inset-0 bg-linear-to-br from-gray-800 to-slate-900 opacity-50"
      >
        <div class="moon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-100/30 rounded-full blur-md" />
      </div>

      <!-- Oscillating Cloud Overlay -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div
          class="cloud w-48 h-20 rounded-full blur-md animate-oscillate-opacity"
          :class="props.isDay ? 'bg-white/80' : 'bg-gray-500/60'"
        />
      </div>
    </div>

    <!-- WINDY OVERLAY (Applies to Clear/Cloudy/Rain) -->
    <div
      v-if="isWindy"
      class="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <div
        class="cloud absolute top-1/3 left-[-200px] w-64 h-24 rounded-full blur-md animate-wind-cloud"
        :class="props.isDay ? 'bg-white/70' : 'bg-gray-500/30'"
        :style="{ animationDuration: windDuration }"
      />
      <div
        class="cloud absolute top-1/2 left-[-200px] w-48 h-20 rounded-full blur-md animate-wind-cloud"
        :class="props.isDay ? 'bg-white/60' : 'bg-gray-500/20'"
        :style="{ animationDuration: windDuration, animationDelay: '2s' }"
      />
    </div>

    <!-- RAIN -->
    <div v-if="animationType === 'rain'">
      <div
        class="absolute inset-0"
        :class="props.isDay ? 'bg-gray-400/30' : 'bg-slate-900/50'"
      >
        <div class="cloud absolute top-[-20px] left-0 right-0 h-32 bg-gray-400/50 blur-xl" />
        
        <div class="rain-container absolute inset-0 overflow-hidden">
          <div
            v-for="n in rainCount"
            :key="n"
            class="raindrop" 
            :style="{ 
              left: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random()}s`, 
              animationDuration: `${0.5 + Math.random() * 0.3}s` 
            }"
          />
        </div>
      </div>
    </div>

    <!-- THUNDER -->
    <div v-if="animationType === 'thunder'">
      <div
        class="absolute inset-0 overflow-hidden"
        :class="props.isDay ? 'bg-gray-600/40' : 'bg-slate-900/60'"
      >
        <div class="lightning absolute inset-0 bg-white/0 animate-lightning" />
        <div class="rain-container absolute inset-0">
          <div
            v-for="n in rainCount"
            :key="n"
            class="raindrop" 
            :style="{ 
              left: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random()}s`, 
              animationDuration: `${0.4 + Math.random() * 0.2}s` 
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Pulse Glow */
@keyframes pulse-glow {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}
.animate-pulse-glow { animation: pulse-glow 4s infinite ease-in-out; }

/* Oscillate Opacity */
@keyframes oscillate-opacity {
  0%, 100% { opacity: 0.4; transform: scale(0.95); }
  50% { opacity: 0.9; transform: scale(1.05); }
}
.animate-oscillate-opacity { animation: oscillate-opacity 5s infinite ease-in-out; }

/* Existing animations */
@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}
.animate-twinkle { animation: twinkle 3s infinite ease-in-out; }

@keyframes lightning {
  0%, 90%, 100% { background-color: rgba(255, 255, 255, 0); }
  92%, 94% { background-color: rgba(255, 255, 255, 0.3); }
  93% { background-color: rgba(255, 255, 255, 0.6); }
}
.animate-lightning { animation: lightning 4s infinite; }

/* Rain */
.raindrop {
  position: absolute;
  top: -20px;
  width: 2px;
  height: 20px;
  background: rgba(255, 255, 255, 0.6);
  animation: rain linear infinite;
}
@keyframes rain {
  to { transform: translateY(500px); }
}

/* Wind Cloud Movement */
@keyframes wind-cloud {
  0% { transform: translateX(-150px); }
  100% { transform: translateX(100vw); }
}
.animate-wind-cloud { animation: wind-cloud linear infinite; }
</style>
