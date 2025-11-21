/**
 * Abstract base class for Weather Providers.
 * Defines the interface that all weather services must implement.
 */
export class WeatherProvider {
  /**
         * Fetch weather data for a specific location.
         * @returns {Promise<NormalizedWeather>}
         */
  async getWeather() {
    throw new Error('Method not implemented');
  }

  /**
         * Search for a city by name
         * @returns {Promise<Array<{name: string, country: string, latitude: number, longitude: number}>>}
         */
  async searchCity() {
    throw new Error('Method not implemented');
  }
}

/**
 * @typedef {Object} NormalizedWeather
 * @property {Object} current
 * @property {number} current.temp
 * @property {string} current.condition - Icon name (e.g., 'CloudIcon')
 * @property {number} current.windSpeed
 * @property {number} current.humidity
 * @property {number} current.precipitation
 * @property {number} current.feelsLike
 * @property {boolean} current.isDay
 * @property {Array<{time: Date, temp: number}>} hourly
 * @property {Array<{date: Date, max: number, min: number, condition: string, precip: number}>} daily
 */

/**
 * @typedef {Object} NormalizedLocation
 * @property {number} id
 * @property {string} name
 * @property {string} country
 * @property {string} [admin1] - State/Region
 * @property {number} latitude
 * @property {number} longitude
 */
