import { Cloud, CloudDrizzle, CloudSun, Sun } from 'lucide-react';

function iconFor(code) {
  switch (code) {
    case 'sun':
      return <Sun className="w-5 h-5 text-amber-300" />;
    case 'cloud-rain':
      return <CloudDrizzle className="w-5 h-5 text-sky-300" />;
    case 'cloud-sun':
      return <CloudSun className="w-5 h-5 text-indigo-200" />;
    case 'cloud':
    default:
      return <Cloud className="w-5 h-5 text-slate-200" />;
  }
}

export function ForecastGrid({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <section className="glass-panel p-5 md:p-7 lg:p-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300 mb-1">
            Prévisions
          </p>
          <h2 className="text-lg md:text-xl font-semibold">Prochains 5 jours</h2>
        </div>
        <span className="text-xs md:text-sm text-slate-300">
          Données fictives pour démonstration
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        {forecast.map((day) => (
          <article
            key={day.day}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 md:px-4 md:py-4 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-medium text-slate-200">{day.day}</p>
                <p className="text-[11px] text-slate-300">{day.date}</p>
              </div>
              <div className="flex items-center justify-center rounded-full bg-slate-900/40 p-2">
                {iconFor(day.icon)}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm md:text-base">
              <span className="font-semibold">
                {day.max}°
                <span className="text-xs text-slate-300 ml-1">max</span>
              </span>
              <span className="text-slate-300">
                {day.min}°
                <span className="text-xs text-slate-400 ml-1">min</span>
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] md:text-xs text-slate-300">
              <span className="line-clamp-1">{day.condition}</span>
              <span className="text-indigo-200">{day.precipitation}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


