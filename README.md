# Khawchin ☀️🌧️

> A beautiful, real-time weather application with stunning animations and interactive weather simulations.

**Vibe coded using Google Antigravity by RIN.K**

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css&logoColor=white)

## ✨ Features

### 🌍 Real-Time Weather & Location
- **Automatic Location Detection**: Khawchin automatically detects your current location using the browser's geolocation API
- **Live Weather Data**: Fetches real-time weather information from the Open-Meteo API
- **Dynamic Updates**: Weather data refreshes based on your location, providing accurate and up-to-date information
- **Smart Fallback**: If location access is denied, defaults to London, UK

### 🔍 City Search
- **Global Search**: Search for any city worldwide with an intelligent autocomplete system
- **Instant Results**: Get weather information for any location in seconds
- **Keyboard Shortcut**: Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) to quickly access the search bar
- **Detailed Information**: View temperature, humidity, wind speed, precipitation, and more

### 🎭 Weather Simulation & Animations
- **Interactive Scenarios**: Simulate different weather conditions with the built-in weather simulator
- **5 Weather Modes**:
  - ☀️ **Clear** - Bright sunshine with gentle animations
  - ☁️ **Cloudy** - Drifting clouds across the sky
  - 💨 **Windy** - Dynamic wind effects with fast-moving clouds
  - 🌧️ **Rain** - Realistic rainfall with droplet animations
  - ⚡ **Thunder** - Dramatic lightning effects with rain
- **Day/Night Toggle**: Switch between day and night modes to see how weather looks at different times
- **Custom Controls**: Adjust wind speed (0-100 km/h) and rainfall (0-50 mm) with interactive sliders
- **Smooth Transitions**: Beautiful CSS animations bring weather conditions to life

### 🎨 Beautiful Design
- **Modern UI**: Clean, intuitive interface with glassmorphism effects
- **Dark/Light Mode**: Automatically switches based on day/night in the current location
- **Responsive Layout**: Perfectly optimized for desktop, tablet, and mobile devices
- **Lucide Icons**: Crisp, modern icons throughout the interface
- **Gradient Accents**: Vibrant color gradients for visual appeal

### 📊 Comprehensive Weather Data
- **Current Conditions**: Temperature, feels-like temperature, weather condition
- **Detailed Metrics**: Wind speed, humidity, precipitation
- **Hourly Forecast**: 24-hour temperature and precipitation probability chart
- **7-Day Forecast**: Daily high/low temperatures and weather conditions
- **Visual Charts**: Interactive Chart.js visualizations for hourly data

### ⚡ Performance & Code Quality
- **Memory Leak Free**: Proper cleanup of event listeners and timeouts
- **Optimized Rendering**: Cached platform detection and efficient re-renders
- **Error Handling**: Specific error messages for different failure scenarios
- **Request Timeout**: 10-second timeout on all API calls to prevent hanging
- **ESLint**: Configured with Vue 3 recommended rules and 2-space indentation
- **Best Practices**: Follows Vue 3 Composition API and modern JavaScript patterns

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd antigravity
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

1. **Create a production build**
   ```bash
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   ```

The optimized files will be generated in the `dist/` directory, ready for deployment.

### Linting

Run ESLint to check and fix code quality issues:
```bash
npm run lint
```

## 🛠️ Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- **Build Tool**: [Vite](https://vitejs.dev/) - Next-generation frontend tooling
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- **Charts**: [Chart.js](https://www.chartjs.org/) + [vue-chartjs](https://vue-chartjs.org/) - Beautiful data visualizations
- **Icons**: [Lucide Vue](https://lucide.dev/) - Clean and consistent icon set
- **HTTP Client**: [Axios](https://axios-http.com/) - Promise-based HTTP client
- **Date Utilities**: [date-fns](https://date-fns.org/) - Modern JavaScript date utility library
- **Weather API**: [Open-Meteo](https://open-meteo.com/) - Free weather API with no API key required

## 📁 Project Structure

```
antigravity/
├── src/
│   ├── components/          # Vue components
│   │   ├── CurrentWeather.vue
│   │   ├── DailyForecast.vue
│   │   ├── DebugBar.vue
│   │   ├── Header.vue
│   │   ├── HourlyForecast.vue
│   │   ├── WeatherAnimation.vue
│   │   └── WeatherDetails.vue
│   ├── composables/         # Reusable composition functions
│   │   ├── useLocation.js
│   │   └── useWeather.js
│   ├── services/            # API and business logic
│   │   ├── OpenMeteoProvider.js
│   │   ├── WeatherProvider.js
│   │   └── weather.js
│   ├── App.vue              # Root component
│   ├── main.js              # Application entry point
│   └── style.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── eslint.config.js         # ESLint configuration
```

## 🎯 Key Features Explained

### Weather Simulation
The Debug Bar (accessible at the bottom of the screen) allows you to simulate different weather conditions without changing your location. This is perfect for:
- Testing the app's visual effects
- Seeing how different weather conditions are displayed
- Experimenting with custom wind and rain values
- Switching between day and night modes

### Dynamic Page Title
The browser tab title updates dynamically to show the current temperature and location, making it easy to monitor weather at a glance.

### Keyboard Shortcuts
- `Cmd+K` or `Ctrl+K`: Focus the search bar instantly

### Responsive Design
The app automatically adapts to your screen size:
- **Desktop**: Full layout with side-by-side hourly and daily forecasts
- **Tablet**: Optimized grid layout
- **Mobile**: Stacked layout with touch-friendly controls (search shortcut hint hidden on mobile)

## 🌟 Credits

**Vibe coded using Google Antigravity by RIN.K**

This project was built with the assistance of Google's Antigravity AI coding assistant, showcasing the power of AI-assisted development in creating beautiful, functional applications.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

**Made with ❤️ using Google Antigravity under the supervision of RIN.K**
