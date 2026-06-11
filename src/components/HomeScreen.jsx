import { RefreshCw, Trophy } from "lucide-react";
import Leaderboard from "./Leaderboard.jsx";

export default function HomeScreen({ displayName, setDisplayName, leaderboard, previewQuestion, onNewQuestion, onStart }) {
  return (
    <main className="screen home-screen">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">NBA stat trivia sprint</div>
          <h1>Box Score Blitz</h1>
          <p>Name the NBA players who match the stat line before time runs out.</p>
        </div>
        <div className="start-panel panel">
          <label htmlFor="displayName">Display name</label>
          <input
            id="displayName"
            value={displayName}
            maxLength={18}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Your name"
          />
          <div className="question-preview">
            <span>Next prompt</span>
            <p>{previewQuestion.prompt}</p>
            <small>
              {previewQuestion.total} possible · {previewQuestion.difficulty}
            </small>
          </div>
          <div className="home-actions">
            <button className="icon-button" type="button" onClick={onNewQuestion} aria-label="Generate new question" title="Generate new question">
              <RefreshCw size={18} />
            </button>
            <button className="primary-button" type="button" onClick={onStart}>
              <Trophy size={18} />
              Start Game
            </button>
          </div>
        </div>
      </section>
      <Leaderboard entries={leaderboard} />
    </main>
  );
}
