# Restaurant Command Center

Operations dashboard prototype for **Spice Garden**, built for [Explorex](https://explorex.com).

Stack: React · Vite · Tailwind CSS. All restaurant data is hardcoded in `src/data.js` (no backend, API, or auth).

## Setup

```bash
npm install
npm run dev
```

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start Vite dev server    |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run oxlint               |

## Project structure

```
src/
  data.js      # Hardcoded restaurant / table / order / revenue data
  App.jsx      # Root component (UI TBD)
  main.jsx     # Entry point
  index.css    # Tailwind import
```
