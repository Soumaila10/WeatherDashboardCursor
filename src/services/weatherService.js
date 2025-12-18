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


