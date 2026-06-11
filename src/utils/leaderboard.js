const STORAGE_KEY = "box-score-blitz-leaderboard";

export function getLeaderboard() {
  try {
    const entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return entries
      .sort((a, b) => b.score - a.score || b.foundCount - a.foundCount || new Date(b.date) - new Date(a.date))
      .slice(0, 10);
  } catch {
    return [];
  }
}

export function saveLeaderboardEntry(entry) {
  const entries = getLeaderboard();
  const nextEntries = [...entries, { ...entry, date: new Date().toISOString() }]
    .sort((a, b) => b.score - a.score || b.foundCount - a.foundCount || new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEntries));
  return nextEntries;
}
