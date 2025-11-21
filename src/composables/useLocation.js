import { ref } from 'vue';

// Constants
const DEFAULT_LOCATION = {
  name: 'London',
  country: 'United Kingdom',
  lat: 51.5074,
  lon: -0.1278,
};

export function useLocation() {
  const currentLocation = ref({ ...DEFAULT_LOCATION });
  const loading = ref(false);
  const error = ref(null);

  const setLocation = (city) => {
    currentLocation.value = {
      name: city.name,
      country: city.country,
      lat: city.latitude,
      lon: city.longitude,
    };
  };

  const getUserLocation = async (onSuccess, onError) => {
    loading.value = true;
    error.value = null;

    try {
      if (!navigator.geolocation) {
        const coords = { lat: currentLocation.value.lat, lon: currentLocation.value.lon };
        if (onSuccess) onSuccess(coords.lat, coords.lon);
        return coords;
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      currentLocation.value = {
        ...currentLocation.value,
        name: 'Your Location',
        lat: latitude,
        lon: longitude,
      };

      if (onSuccess) onSuccess(latitude, longitude);
      return { lat: latitude, lon: longitude };
    } catch (err) {
      console.error('Geolocation error:', err);
      error.value = 'Failed to get location';
      const coords = { lat: currentLocation.value.lat, lon: currentLocation.value.lon };
      if (onError) onError(err);
      if (onSuccess) onSuccess(coords.lat, coords.lon);
      return coords;
    } finally {
      loading.value = false;
    }
  };

  return {
    currentLocation,
    loading,
    error,
    setLocation,
    getUserLocation
  };
}
