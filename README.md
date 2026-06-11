# Box Score Blitz

Box Score Blitz is a competitive NBA trivia game. The app generates a stat-based challenge from a local historical player-season dataset, then gives players 60 seconds to name as many matching NBA players as possible.

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Deploy

### Vercel

1. Push this project to a GitHub repository.
2. Import the repository in Vercel.
3. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

### Netlify

1. Push this project to a GitHub repository.
2. Create a new Netlify site from the repository.
3. Use:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy.

### Replit

1. Create a new Replit project from this repository.
2. Run `npm install`.
3. Start with `npm run dev`.
4. Use Replit's web preview or deployment flow.

## Architecture

The MVP uses a local seeded NBA player-season dataset, a question generator that creates valid stat ranges, a name matcher with normalization and aliases, and localStorage for leaderboard persistence. The data layer is intentionally simple for demo reliability and can later be replaced with a larger CSV import, public sports dataset, or live sports API.

Key files:

- `src/data/nbaPlayerSeasons.js`: hardcoded player-season records for the MVP.
- `src/utils/questionGenerator.js`: creates valid prompts with 2 to 12 possible answers.
- `src/utils/nameMatcher.js`: normalizes guesses and checks player aliases.
- `src/utils/leaderboard.js`: saves and reads the top 10 local scores.
- `src/components`: home, game, end screen, and leaderboard UI.

## Demo Script

“Box Score Blitz turns historical NBA player stats into a fast competitive trivia game. Instead of static trivia questions, the app generates dynamic stat challenges from a local NBA player-season dataset. Users compete to name as many matching players as possible before time expires, then compare scores on a leaderboard.”
