import { nbaPlayerSeasons } from "../data/nbaPlayerSeasons.js";

export const statCategories = {
  pts: "points per game",
  reb: "rebounds per game",
  ast: "assists per game",
  stl: "steals per game",
  blk: "blocks per game",
};

const statRanges = {
  pts: [
    [15, 22],
    [18, 26],
    [20, 30],
    [24, 33],
  ],
  reb: [
    [4, 8],
    [6, 10],
    [8, 14],
    [10, 16],
  ],
  ast: [
    [3, 6],
    [5, 8],
    [7, 12],
  ],
  stl: [
    [0.9, 1.5],
    [1.3, 2.1],
    [1.8, 3.0],
  ],
  blk: [
    [0.5, 1.2],
    [1, 2],
    [2, 3.6],
  ],
};

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function getAnswersForQuestion(question) {
  return nbaPlayerSeasons
    .filter((record) => {
      return (
        record.season === question.season &&
        record[question.stat] >= question.min &&
        record[question.stat] <= question.max
      );
    })
    .sort((a, b) => b[question.stat] - a[question.stat] || a.player.localeCompare(b.player));
}

export function getDifficulty(answerCount) {
  if (answerCount >= 8) return "Common";
  if (answerCount >= 4) return "Tough";
  return "Sicko Mode";
}

export function generateQuestion() {
  const seasons = [...new Set(nbaPlayerSeasons.map((record) => record.season))];
  const stats = Object.keys(statCategories);
  const candidates = [];

  seasons.forEach((season) => {
    stats.forEach((stat) => {
      statRanges[stat].forEach(([min, max]) => {
        const question = {
          season,
          stat,
          min,
          max,
          label: statCategories[stat],
        };
        const answers = getAnswersForQuestion(question);

        if (answers.length >= 2 && answers.length <= 12) {
          candidates.push({
            ...question,
            answers,
            total: answers.length,
            difficulty: getDifficulty(answers.length),
            prompt: `Name NBA players from the ${season} season who averaged between ${min} and ${max} ${statCategories[stat]}.`,
          });
        }
      });
    });
  });

  const selected = shuffle(candidates)[0];
  return selected;
}
