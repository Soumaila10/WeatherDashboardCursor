<<<<<<< HEAD
// Service météo utilisant des données fictives riches pour un rendu immédiat

const mockCurrentWeather = {
  city: 'Paris',
  country: 'France',
  coordinates: {
    lat: 48.8566,
    lon: 2.3522,
  },
  updatedAt: 'Dernière mise à jour : il y a 5 minutes',
  condition: 'Ciel partiellement nuageux',
  icon: 'cloud-sun',
  temperature: {
    value: 22,
    feelsLike: 23,
    unit: '°C',
  },
  details: {
    humidity: 62,
    windSpeed: 14,
    windDirection: 'SO',
    pressure: 1015,
    visibility: 10,
    uvIndex: 4,
  },
  highlights: [
    { label: 'Lever du soleil', value: '06:21' },
    { label: 'Coucher du soleil', value: '21:14' },
    { label: 'Probabilité de pluie', value: '20%' },
  ],
};

const mockDailyForecast = [
  {
    day: 'Aujourd’hui',
    date: 'Jeu 18 Déc',
    min: 18,
    max: 23,
    icon: 'cloud-sun',
    condition: 'Nuages épars',
    precipitation: '10%',
  },
  {
    day: 'Demain',
    date: 'Ven 19 Déc',
    min: 17,
    max: 24,
    icon: 'sun',
    condition: 'Ensoleillé',
    precipitation: '0%',
  },
  {
    day: 'Samedi',
    date: 'Sam 20 Déc',
    min: 16,
    max: 21,
    icon: 'cloud-rain',
    condition: 'Pluie légère',
    precipitation: '60%',
  },
  {
    day: 'Dimanche',
    date: 'Dim 21 Déc',
    min: 15,
    max: 20,
    icon: 'cloud',
    condition: 'Couvert',
    precipitation: '30%',
  },
  {
    day: 'Lundi',
    date: 'Lun 22 Déc',
    min: 14,
    max: 19,
    icon: 'cloud-sun',
    condition: 'Éclaircies',
    precipitation: '15%',
  },
];

// Simule un léger délai réseau pour une meilleure UX
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchWeatherByCity(city) {
  await wait(500);

  if (!city) {
    return {
      current: mockCurrentWeather,
      forecast: mockDailyForecast,
    };
  }

  // On clone les datas et on adapte légèrement pour simuler une autre ville
  const normalizedCity = city.trim();
  const cityLabel = normalizedCity.charAt(0).toUpperCase() + normalizedCity.slice(1);

  const current = {
    ...mockCurrentWeather,
    city: cityLabel,
    updatedAt: 'Données simulées en temps réel',
  };

  const forecast = mockDailyForecast.map((day, index) => ({
    ...day,
    max: day.max + (index === 0 ? 1 : 0),
    min: day.min + (index === 0 ? 1 : 0),
  }));

  return { current, forecast };
}

=======
// Service météo : API OpenWeatherMap (clé API, données temps réel)

// Clé API OpenWeather lue depuis les variables d'environnement Vite
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function mapOpenWeatherToCurrent(data, extras = {}) {
  const sunrise = data.sys?.sunrise ? new Date(data.sys.sunrise * 1000) : null;
  const sunset = data.sys?.sunset ? new Date(data.sys.sunset * 1000) : null;
  const precipitationChance =
    typeof extras.precipitationChance === 'number'
      ? `${Math.round(extras.precipitationChance * 100)}%`
      : '—';

  return {
    city: data.name,
    country: data.sys?.country ?? '',
    coordinates: {
      lat: data.coord?.lat,
      lon: data.coord?.lon,
    },
    updatedAt: `Dernière mise à jour : ${new Date(data.dt * 1000).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    })}`,
    condition: data.weather?.[0]?.description ?? 'Conditions actuelles',
    icon: 'cloud-sun',
    temperature: {
      value: Math.round(data.main?.temp ?? 0),
      feelsLike: Math.round(data.main?.feels_like ?? data.main?.temp ?? 0),
      unit: '°C',
    },
    details: {
      humidity: data.main?.humidity ?? null,
      windSpeed: Math.round((data.wind?.speed ?? 0) * 3.6),
      windDirection:
        data.wind?.deg != null ? `${Math.round(data.wind.deg)}°` : null,
      pressure: data.main?.pressure ?? null,
      visibility: data.visibility != null ? data.visibility / 1000 : null,
      uvIndex: null,
    },
    highlights: [
      sunrise && {
        label: 'Lever du soleil',
        value: sunrise.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
      sunset && {
        label: 'Coucher du soleil',
        value: sunset.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
      {
        label: 'Probabilité de pluie',
        value: precipitationChance,
      },
    ].filter(Boolean),
  };
}

function mapOpenWeatherToForecast(data) {
  if (!data.list) return [];

  const byDay = {};

  for (const entry of data.list) {
    const date = new Date(entry.dt * 1000);
    const key = date.toISOString().slice(0, 10);
    if (!byDay[key]) {
      byDay[key] = {
        temps: [],
        weather: entry.weather?.[0],
        date,
        rain: entry.rain?.['3h'] ?? 0,
      };
    }
    byDay[key].temps.push(entry.main?.temp);
    byDay[key].rain += entry.rain?.['3h'] ?? 0;
  }

  const days = Object.values(byDay)
    .slice(0, 5)
    .map((d, index) => {
      const min = Math.round(Math.min(...d.temps));
      const max = Math.round(Math.max(...d.temps));
      const totalRain = d.rain;
      const iconCode = d.weather?.main?.toLowerCase() ?? '';

      let icon = 'cloud';
      if (iconCode.includes('rain')) icon = 'cloud-rain';
      else if (iconCode.includes('clear')) icon = 'sun';
      else if (iconCode.includes('cloud')) icon = 'cloud-sun';

      const dayLabel =
        index === 0
          ? "Aujourd’hui"
          : d.date.toLocaleDateString('fr-FR', { weekday: 'long' });

      return {
        day: dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1),
        date: d.date.toLocaleDateString('fr-FR', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
        }),
        min,
        max,
        icon,
        condition: d.weather?.description ?? 'Prévisions',
        precipitation: `${Math.round(Math.min(totalRain * 10, 100))}%`,
      };
    });

  return days;
}

export async function fetchWeatherByCity(city) {
  const targetCity = city?.trim() || 'Paris';

  try {
    if (!API_KEY) {
      throw new Error(
        "Clé API OpenWeather manquante. Ajoute VITE_OPENWEATHER_API_KEY dans ton fichier .env."
      );
    }

    // 1) Géocodage précis de la ville
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        targetCity
      )}&limit=1&appid=${API_KEY}`
    );
    if (!geoRes.ok) {
      throw new Error("Erreur lors de la recherche de la ville.");
    }
    const geoJson = await geoRes.json();
    const place = Array.isArray(geoJson) ? geoJson[0] : null;
    if (!place) {
      throw new Error("Ville introuvable. Vérifie l’orthographe et réessaie.");
    }

    const { lat, lon, name, country } = place;

    // 2) Requêtes météo basées sur lat/lon garantis
    const [currentRes, forecastRes] = await Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
      ),
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
      ),
    ]);

    const currentJson = await currentRes.json();
    const forecastJson = await forecastRes.json();

    // Gestion explicite des erreurs d'API pour remonter des messages plus clairs
    if (!currentRes.ok) {
      if (currentJson?.cod === '404') {
        throw new Error("Ville introuvable. Vérifie l’orthographe et réessaie.");
      }
      if (currentJson?.message) {
        throw new Error(`Erreur OpenWeather : ${currentJson.message}`);
      }
      throw new Error("Erreur lors de la récupération de la météo actuelle.");
    }

    if (!forecastRes.ok) {
      if (forecastJson?.message) {
        throw new Error(`Erreur OpenWeather (prévisions) : ${forecastJson.message}`);
      }
      throw new Error('Erreur lors de la récupération des prévisions.');
    }

    const firstForecastEntry = Array.isArray(forecastJson.list)
      ? forecastJson.list[0]
      : null;
    const current = mapOpenWeatherToCurrent(
      {
        ...currentJson,
        name: name || currentJson.name,
        sys: { ...(currentJson.sys || {}), country: country || currentJson.sys?.country },
      },
      {
        precipitationChance: firstForecastEntry?.pop,
      }
    );
    const forecast = mapOpenWeatherToForecast(forecastJson);

    return { current, forecast };
  } catch (e) {
    console.error('Erreur API OpenWeather :', e);
    // On relance l’erreur pour que le hook puisse afficher un message utilisateur clair
    throw new Error(
      e.message || 'Impossible de récupérer les données météo en temps réel.'
    );
  }
}
>>>>>>> 6164586 (feat: weather dashboard with OpenWeather API)

