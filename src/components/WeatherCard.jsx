import { Droplets, Thermometer, Wind, Navigation, Gauge, Eye, SunMedium } from 'lucide-react';

export function WeatherCard({ weather }) {
  if (!weather) return null;

  const {
    city,
    country,
    updatedAt,
    condition,
    temperature,
    details,
    highlights = [],
  } = weather;

  return (
    <section className="glass-panel p-5 md:p-7 lg:p-8 flex flex-col gap-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300 mb-1">
            Tableau de bord météo
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            {city}, <span className="text-slate-300 text-lg md:text-2xl">{country}</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-2">{updatedAt}</p>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-none">
            {temperature.value}
            <span className="align-top text-lg md:text-xl text-slate-300 ml-1">
              {temperature.unit}
            </span>
          </span>
          <span className="text-xs md:text-sm text-slate-300">
            Ressenti {temperature.feelsLike}
            {temperature.unit}
          </span>
          <span className="inline-flex items-center gap-1 text-xs md:text-sm text-indigo-200 mt-1">
            <SunMedium className="w-4 h-4" />
            {condition}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <MetricCard
          icon={<Droplets className="w-4 h-4" />}
          label="Humidité"
          value={`${details.humidity}%`}
          hint="Niveau d’humidité ambiante"
        />
        <MetricCard
          icon={<Wind className="w-4 h-4" />}
          label="Vent"
          value={`${details.windSpeed} km/h`}
          hint={
            <span className="inline-flex items-center gap-1">
              <Navigation className="w-3 h-3" />
              {details.windDirection}
            </span>
          }
        />
        <MetricCard
          icon={<Gauge className="w-4 h-4" />}
          label="Pression"
          value={`${details.pressure} hPa`}
          hint="Pression atmosphérique"
        />
        <MetricCard
          icon={<Eye className="w-4 h-4" />}
          label="Visibilité"
          value={`${details.visibility} km`}
          hint="Distance de visibilité"
        />
      </div>

      {highlights.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="rounded-2xl border border-white/5 bg-white/5 px-3 py-2.5 md:px-4 md:py-3 flex flex-col gap-1"
            >
              <span className="text-[11px] uppercase tracking-[0.16em] text-slate-300">
                {h.label}
              </span>
              <span className="text-sm md:text-base font-medium">{h.value}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function MetricCard({ icon, label, value, hint }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 md:px-4 md:py-3 flex flex-col gap-1">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-300">
          {icon}
          {label}
        </span>
        <Thermometer className="w-3 h-3 text-slate-400 opacity-0" />
      </div>
      <span className="text-base md:text-lg font-semibold">{value}</span>
      {hint && <span className="text-[11px] md:text-xs text-slate-300">{hint}</span>}
    </div>
  );
}


