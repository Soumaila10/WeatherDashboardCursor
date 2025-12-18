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

- Pour brancher une vraie API météo, modifie simplement :
  - `src/services/weatherService.js`  
  Tu peux remplacer les données mockées par des appels HTTP réels (OpenWeather, Meteomatics, etc.) sans changer les composants UI.

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