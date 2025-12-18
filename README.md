## Weather Dashboard – React + Vite + Tailwind

Application de **tableau de bord météo moderne** construite avec React, Vite et Tailwind CSS.  
L’interface adopte un style **glassmorphism** avec un **thème sombre dégradé** et est entièrement responsive (mobile & desktop).

Les données météo sont **mockées** (fictives) pour offrir une UI riche et réaliste **sans nécessiter de clé API** dès le premier lancement.

---

### 🧰 Stack & technologies

- **React 18** (SPA)
- **Vite** (dev server & bundler)
- **Tailwind CSS** (styling & design system)
- **lucide-react** (icônes modernes)

---

### 📁 Structure principale

- `src/`
  - `App.jsx` – Composition principale du dashboard
  - `index.css` – Setup Tailwind + styles globaux (glassmorphism)
  - `components/`
    - `SearchBar.jsx` – Barre de recherche de ville
    - `WeatherCard.jsx` – Carte météo principale (température, humidité, vent, etc.)
    - `ForecastGrid.jsx` – Grille de prévisions sur 5 jours
  - `services/`
    - `weatherService.js` – Service météo avec données fictives (mock)
  - `hooks/`
    - `useWeather.js` – Hook personnalisé pour gérer la logique métier (chargement, recherche, état)

---

### 🚀 Installation & lancement

Assure-toi d’avoir **Node.js ≥ 18** installé.

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ensuite, ouvre l’URL indiquée dans le terminal (par défaut `http://localhost:5173`).

---

### 🔧 Personnalisation & extension

<<<<<<< HEAD
- Pour brancher une vraie API météo, modifie simplement :
  - `src/services/weatherService.js`  
  Tu peux remplacer les données mockées par des appels HTTP réels (OpenWeather, Meteomatics, etc.) sans changer les composants UI.
=======
- L’app est branchée sur l’API **OpenWeatherMap** (données réelles) avec **fallback mock** :
  - Si une clé API valide est présente, les données viennent d’OpenWeather (temps actuel + prévisions 5 jours).
  - Si la clé manque ou si l’API échoue, l’app revient automatiquement sur les **données fictives** pour garder un rendu propre.

- Pour activer les données réelles :
  1. Crée un compte gratuit sur OpenWeatherMap.
  2. Récupère ta clé API (Current Weather + 5 day / 3 hour forecast).
  3. Crée un fichier `.env` à la racine du projet avec :

     ```bash
     VITE_OPENWEATHER_API_KEY=ta_cle_ici
     ```

  4. Redémarre le serveur de dev : `npm run dev`.

- Toute la logique d’intégration API se trouve dans :
  - `src/services/weatherService.js` (mapping des données OpenWeather → format UI)

- Tu peux aussi adapter le style (thème, tailles, breakpoints) dans :
  - `tailwind.config.js`
  - `src/index.css`
>>>>>>> 6164586 (feat: weather dashboard with OpenWeather API)

- Le thème (dégradé, couleurs, ombres) est configurable dans :
  - `tailwind.config.js`
  - `src/index.css`

---

### 📦 Scripts NPM

- `npm run dev` – Démarre Vite en mode développement
- `npm run build` – Build de production
- `npm run preview` – Prévisualisation du build localement

---

### ✅ Prêt pour le premier push

Le projet inclut :

- Un `.gitignore` complet pour un projet **Node.js / React**
- Une structure de code claire (`components`, `hooks`, `services`)
- Une UI météo moderne prête à l’emploi

Tu peux maintenant :

```bash
git add .
git commit -m "feat: initial weather dashboard app"
git push origin main
```

# WeatherDashboardCursor