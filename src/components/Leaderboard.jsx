export default function Leaderboard({ entries }) {
  if (!entries.length) {
    return (
      <section className="panel leaderboard-panel">
        <div className="section-heading">
          <span>Top 10</span>
          <strong>Leaderboard</strong>
        </div>
        <p className="empty-state">No scores yet. First bucket is yours.</p>
      </section>
    );
  }

  return (
    <section className="panel leaderboard-panel">
      <div className="section-heading">
        <span>Top 10</span>
        <strong>Leaderboard</strong>
      </div>
      <ol className="leaderboard-list">
        {entries.map((entry, index) => (
          <li key={`${entry.date}-${entry.name}-${index}`}>
            <span className="rank">{index + 1}</span>
            <span className="leader-name">{entry.name}</span>
            <span className="leader-meta">
              {entry.difficulty} · {entry.foundCount}/{entry.total}
            </span>
            <strong>{entry.score}</strong>
          </li>
        ))}
      </ol>
    </section>
  );
}
