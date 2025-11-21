<script setup>
import { computed } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
});

const chartData = computed(() => {
  if (!props.items || props.items.length === 0) return { labels: [], datasets: [] };

  const labels = props.items.map(item => {
    return item.time.toLocaleTimeString('en-US', { hour: 'numeric' });
  });

  const data = props.items.map(item => item.temp);

  return {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
          return gradient;
        },
        borderColor: '#3b82f6',
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3b82f6',
        data,
        fill: true,
        tension: 0.4,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      padding: 10,
      displayColors: false,
      callbacks: {
        label: (context) => `${context.parsed.y}°C`,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: '#9ca3af', // gray-400
      },
    },
    y: {
      grid: {
        color: 'rgba(156, 163, 175, 0.1)', // gray-400 with opacity
        drawBorder: false,
      },
      ticks: {
        color: '#9ca3af',
        callback: (value) => `${value}°`,
      },
    },
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
};
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-xl transition-colors duration-300">
    <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-6">
      Hourly Forecast
    </h3>
    <div class="h-64 w-full">
      <Line
        v-if="items && items.length"
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>
