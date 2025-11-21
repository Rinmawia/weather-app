<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';
import { searchCity } from '../services/weather';

const emit = defineEmits(['city-selected']);

defineProps({
  location: {
    type: Object,
    default: () => ({})
  },
});

const searchQuery = ref('');
const searchResults = ref([]);
const showResults = ref(false);
const searchTimeout = ref(null);

// Platform detection - cached at module level for performance
const IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const IS_MAC = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

const shortcutKey = computed(() => {
  if (IS_MOBILE) return null;
  return IS_MAC ? '⌘' : 'Ctrl';
});

const isMac = computed(() => IS_MAC);

const handleSearch = () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value);
  
  if (searchQuery.value.length < 3) {
    searchResults.value = [];
    showResults.value = false;
    return;
  }

  searchTimeout.value = setTimeout(async () => {
    try {
      const results = await searchCity(searchQuery.value);
      searchResults.value = results;
      showResults.value = true;
    } catch (error) {
      console.error(error);
    }
  }, 300);
};

const selectCity = (city) => {
  emit('city-selected', city);
  searchQuery.value = `${city.name}, ${city.country}`;
  showResults.value = false;
};

const searchInput = ref(null);

const focusSearch = () => {
  searchInput.value?.focus();
};

onBeforeUnmount(() => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
});

defineExpose({ focusSearch });
</script>

<template>
  <header class="flex items-center justify-between p-4 md:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-colors duration-300">
    <div class="flex items-center gap-2">
      <h1 class="text-xl md:text-2xl font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Khawchin
      </h1>
    </div>

    <div class="relative flex-1 max-w-md mx-4">
      <div class="relative">
        <input
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          placeholder="Search city..."
          class="w-full px-4 py-2 pl-10 pr-12 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          @input="handleSearch"
        >
        <div
          v-if="shortcutKey"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none"
        >
          <span class="text-xs text-gray-400 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5">
            <span
              v-if="isMac"
              class="text-[10px]"
            >{{ shortcutKey }}</span>
            <span v-else>{{ shortcutKey }}+</span>K
          </span>
        </div>
      </div>

      <div
        v-if="showResults && searchResults.length > 0"
        class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
      >
        <ul>
          <li
            v-for="city in searchResults"
            :key="city.id"
            class="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-50 dark:border-gray-700 last:border-none"
            @click="selectCity(city)"
          >
            <div class="font-medium text-gray-800 dark:text-gray-200">
              {{ city.name }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ city.admin1 ? `${city.admin1}, ` : '' }}{{ city.country }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
