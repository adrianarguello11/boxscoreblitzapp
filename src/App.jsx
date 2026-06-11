import { useCallback, useMemo, useState } from "react";
import HomeScreen from "./components/HomeScreen.jsx";
import GameScreen from "./components/GameScreen.jsx";
import EndScreen from "./components/EndScreen.jsx";
import { generateQuestion } from "./utils/questionGenerator.js";
import { getLeaderboard, saveLeaderboardEntry } from "./utils/leaderboard.js";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [displayName, setDisplayName] = useState("Hooper");
  const [question, setQuestion] = useState(() => generateQuestion());
  const [leaderboard, setLeaderboard] = useState(() => getLeaderboard());
  const [result, setResult] = useState(null);

  const cleanName = useMemo(() => displayName.trim() || "Hooper", [displayName]);

  const startGame = useCallback(() => {
    setResult(null);
    setScreen("game");
  }, []);

  const finishGame = useCallback(
    ({ found, score }) => {
      const completedResult = {
        name: cleanName,
        score,
        question: question.prompt,
        difficulty: question.difficulty,
        foundCount: found.length,
        total: question.total,
      };

      const nextLeaderboard = saveLeaderboardEntry(completedResult);
      setLeaderboard(nextLeaderboard);
      setResult({ ...completedResult, question, found });
      setScreen("end");
    },
    [cleanName, question],
  );

  const newQuestion = useCallback(() => {
    setQuestion(generateQuestion());
  }, []);

  const playAgain = useCallback(() => {
    setQuestion(generateQuestion());
    setResult(null);
    setScreen("home");
  }, []);

  return (
    <div className="app">
      <div className="court-lines" aria-hidden="true" />
      {screen === "home" && (
        <HomeScreen
          displayName={displayName}
          setDisplayName={setDisplayName}
          leaderboard={leaderboard}
          previewQuestion={question}
          onNewQuestion={newQuestion}
          onStart={startGame}
        />
      )}
      {screen === "game" && <GameScreen question={question} onFinish={finishGame} />}
      {screen === "end" && result && <EndScreen result={result} leaderboard={leaderboard} onPlayAgain={playAgain} />}
    </div>
  );
}
