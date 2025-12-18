import { useEffect, useState } from 'react';
import { fetchWeatherByCity } from '../services/weatherService';

export function useWeather(initialCity = 'Paris') {
  const [city, setCity] = useState(initialCity);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeather = async (targetCity) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherByCity(targetCity);
      setWeather(data.current);
      setForecast(data.forecast);
    } catch (e) {
      setError("Impossible de récupérer les données météo.");
      setError(e.message || 'Impossible de récupérer les données météo.'); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search = (newCity) => {
    setCity(newCity);
    loadWeather(newCity);
  };

  return {
    city,
    weather,
    forecast,
    loading,
    error,
    search,
  };
}


