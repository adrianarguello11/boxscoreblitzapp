import { useEffect, useMemo, useRef, useState } from "react";
import { Send } from "lucide-react";
import { isPlayerMatch } from "../utils/nameMatcher.js";

const ROUND_SECONDS = 60;

export default function GameScreen({ question, onFinish }) {
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [guess, setGuess] = useState("");
  const [found, setFound] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ type: "idle", message: "Tip-off. Start typing names." });
  const inputRef = useRef(null);

  const remainingAnswers = useMemo(
    () => question.answers.filter((answer) => !found.some((item) => item.player === answer.player)),
    [found, question.answers],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish({ found, score });
      return;
    }

    const timer = window.setTimeout(() => setTimeLeft((current) => current - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [found, onFinish, score, timeLeft]);

  function submitGuess(event) {
    event.preventDefault();
    const trimmedGuess = guess.trim();
    if (!trimmedGuess) return;

    const matchedAnswer = question.answers.find((record) => isPlayerMatch(trimmedGuess, record));
    setGuess("");

    if (!matchedAnswer) {
      setFeedback({ type: "bad", message: "Not on this board." });
      return;
    }

    if (found.some((record) => record.player === matchedAnswer.player)) {
      setFeedback({ type: "dupe", message: `${matchedAnswer.player} is already in.` });
      return;
    }

    const bonus = timeLeft <= 5 ? 1 : 0;
    setFound((current) => [...current, matchedAnswer]);
    setScore((current) => current + 1 + bonus);
    setFeedback({
      type: "good",
      message: bonus ? `${matchedAnswer.player}! Clutch bonus +2.` : `${matchedAnswer.player}! +1`,
    });
  }

  const timerPercent = (timeLeft / ROUND_SECONDS) * 100;

  return (
    <main className="screen game-screen">
      <section className="game-shell">
        <div className="game-header panel">
          <div>
            <span className="eyebrow">Current challenge</span>
            <h1>{question.prompt}</h1>
            <p>
              {question.total} possible answers · {question.difficulty}
            </p>
          </div>
          <div className="score-tile">
            <span>Score</span>
            <strong>{score}</strong>
          </div>
        </div>

        <div className="timer-row">
          <div className="timer-track" aria-label={`${timeLeft} seconds left`}>
            <div className="timer-fill" style={{ width: `${timerPercent}%` }} />
          </div>
          <strong>{timeLeft}s</strong>
        </div>

        <section className="play-area">
          <div className="panel guess-panel">
            <div className="statline">
              <span>Found</span>
              <strong>
                {found.length} of {question.total}
              </strong>
            </div>
            <form onSubmit={submitGuess} className="guess-form">
              <input
                ref={inputRef}
                value={guess}
                onChange={(event) => setGuess(event.target.value)}
                placeholder="Type a player name"
                autoComplete="off"
              />
              <button className="primary-button submit-button" type="submit" aria-label="Submit guess">
                <Send size={18} />
              </button>
            </form>
            <div className={`feedback ${feedback.type}`}>{feedback.message}</div>
            <div className="hint-strip">
              Final 5 seconds: correct answers are worth 2.
            </div>
          </div>

          <div className="panel found-panel">
            <div className="section-heading">
              <span>Live board</span>
              <strong>Found Players</strong>
            </div>
            {found.length ? (
              <ul className="player-grid">
                {found.map((record) => (
                  <li key={record.player} className="found-pop">
                    <strong>{record.player}</strong>
                    <span>
                      {record.team} · {record[question.stat]} {question.stat.toUpperCase()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">Make your first guess.</p>
            )}
            <p className="remaining-note">{remainingAnswers.length} still hidden</p>
          </div>
        </section>
      </section>
    </main>
  );
}
