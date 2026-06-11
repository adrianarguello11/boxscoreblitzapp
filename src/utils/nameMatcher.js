export function normalizeName(value) {
  return value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.'’-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function isPlayerMatch(guess, record) {
  const normalizedGuess = normalizeName(guess);
  if (!normalizedGuess) return false;

  const acceptedNames = [record.player, ...(record.aliases || [])].map(normalizeName);
  return acceptedNames.includes(normalizedGuess);
}
