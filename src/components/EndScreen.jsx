import { Copy, RotateCcw } from "lucide-react";
import Leaderboard from "./Leaderboard.jsx";

export default function EndScreen({ result, leaderboard, onPlayAgain }) {
  const missed = result.question.answers.filter(
    (answer) => !result.found.some((record) => record.player === answer.player),
  );
  const shareText = `Box Score Blitz: ${result.name} scored ${result.score} on ${result.difficulty} (${result.found.length}/${result.question.total}).`;

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(shareText);
    } catch {
      return;
    }
  }

  return (
    <main className="screen end-screen">
      <section className="panel results-panel">
        <div className="result-score">
          <span>Final score</span>
          <strong>{result.score}</strong>
          <em>{result.difficulty}</em>
        </div>
        <div className="result-copy">
          <h1>Round complete</h1>
          <p>{result.question.prompt}</p>
          <span>
            Found {result.found.length} of {result.question.total}
          </span>
        </div>
        <div className="result-actions">
          <button className="secondary-button" type="button" onClick={copyResult}>
            <Copy size={18} />
            Copy Result
          </button>
          <button className="primary-button" type="button" onClick={onPlayAgain}>
            <RotateCcw size={18} />
            Play Again
          </button>
        </div>
      </section>

      <section className="answer-columns">
        <div className="panel">
          <div className="section-heading">
            <span>Your makes</span>
            <strong>Found Answers</strong>
          </div>
          {result.found.length ? (
            <ul className="answer-list">
              {result.found.map((record) => (
                <li key={record.player}>
                  <span>{record.player}</span>
                  <strong>
                    {record.team} · {record[result.question.stat]}
                  </strong>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">No correct answers this time.</p>
          )}
        </div>

        <div className="panel">
          <div className="section-heading">
            <span>Reveal answers</span>
            <strong>Missed Answers</strong>
          </div>
          <ul className="answer-list missed-list">
            {missed.map((record) => (
              <li key={record.player}>
                <span>{record.player}</span>
                <strong>
                  {record.team} · {record[result.question.stat]}
                </strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Leaderboard entries={leaderboard} />
    </main>
  );
}
