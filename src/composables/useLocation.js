import { ref } from 'vue';

export function useLocation() {
  const currentLocation = ref({
    name: 'London',
    country: 'United Kingdom',
    lat: 51.5074,
    lon: -0.1278,
  });
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

  const getUserLocation = (onSuccess, onError) => {
    loading.value = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          currentLocation.value = {
            ...currentLocation.value,
            name: 'Your Location',
            lat: latitude,
            lon: longitude,
          };
          loading.value = false;
          if (onSuccess) onSuccess(latitude, longitude);
        },
        (err) => {
          console.error('Error getting location:', err);
          error.value = 'Failed to get location';
          loading.value = false;
          if (onError) onError(err);
          // Fallback to default is already set
          if (onSuccess) onSuccess(currentLocation.value.lat, currentLocation.value.lon);
        }
      );
    } else {
      loading.value = false;
      if (onSuccess) onSuccess(currentLocation.value.lat, currentLocation.value.lon);
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
