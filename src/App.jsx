import { Loader2 } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastGrid } from './components/ForecastGrid';
import { useWeather } from './hooks/useWeather';

function App() {
  const { weather, forecast, loading, error, search } = useWeather('Paris');

  return (
    <div className="min-h-screen px-4 py-5 md:px-6 md:py-10 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-6xl flex flex-col gap-5 md:gap-7 lg:gap-8">
        <header className="flex flex-col gap-4 md:gap-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-300 mb-1">
                Weather Dashboard
              </p>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
                Vue globale de la météo dans le monde
              </h1>
            </div>
            <div className="hidden sm:flex text-xs flex-col items-end text-slate-300">
              <span>Glassmorphism • Thème sombre</span>
              <span className="text-[11px] opacity-80">
                Demo alimentée par des données fictives
              </span>
            </div>
          </div>

          <SearchBar onSearch={search} />
        </header>

        {loading && (
          <div className="glass-panel flex items-center justify-center py-10">
            <div className="flex items-center gap-3 text-slate-200 text-sm md:text-base">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Chargement des données météo…</span>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="glass-panel border-red-400/40 bg-red-500/10 text-red-100 px-4 py-3 text-sm md:text-base">
            {error}
          </div>
        )}

        {!loading && !error && (
          <main className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] gap-4 md:gap-6">
            <div className="flex flex-col gap-4 md:gap-5">
              <WeatherCard weather={weather} />
              <ForecastGrid forecast={forecast} />
            </div>

            <aside className="glass-panel p-5 md:p-6 lg:p-7 flex flex-col gap-4 md:gap-5">
              <h2 className="text-sm md:text-base font-medium flex items-center justify-between">
                Détails & contexte
                <span className="text-[11px] md:text-xs text-slate-300">
                  Mode démonstration
                </span>
              </h2>

              <p className="text-xs md:text-sm text-slate-200">
                Cette interface est conçue comme un tableau de bord météo moderne : thème
                sombre, effets de verre (glassmorphism) et mise en page responsive.
              </p>

              <ul className="space-y-2 text-xs md:text-sm text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>
                    <span className="font-medium">Recherche de ville :</span> tape un nom de
                    ville pour mettre à jour instantanément les données fictives.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  <span>
                    <span className="font-medium">Sans clé API :</span> toutes les données
                    sont mockées pour un rendu immédiat, parfait pour les tests UI.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span>
                    <span className="font-medium">Stack :</span> React + Vite + Tailwind CSS +
                    lucide-react.
                  </span>
                </li>
              </ul>

              <div className="mt-auto pt-2 border-t border-white/10 text-[11px] text-slate-400">
                Tu peux maintenant brancher une vraie API météo dans{' '}
                <code className="bg-slate-900/70 px-1.5 py-0.5 rounded-md border border-white/10">
                  src/services/weatherService.js
                </code>{' '}
                sans toucher au reste de l’UI.
              </div>
            </aside>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;


