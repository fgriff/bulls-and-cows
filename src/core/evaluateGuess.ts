export type Evaluation = { bulls: number; cows: number };

export function evaluateGuess(secret: string, guess: string): Evaluation {
  const secretChars = [...secret.toLowerCase()];
  const guessChars = [...guess.toLowerCase()];

  const bulls = guessChars.filter((char, idx) => char === secretChars[idx]).length;

  const secretRest = secretChars.filter((char, idx) => char !== guessChars[idx]);
  const guessRest = guessChars.filter((char, idx) => char !== secretChars[idx]);

  const cows = guessRest.reduce<{ count: number; remaining: string[] }>(
    (acc, char) => {
      const idx = acc.remaining.indexOf(char);

      if (idx === -1) {
        return acc;
      }

      return {
        count: acc.count + 1,
        remaining: [...acc.remaining.slice(0, idx), ...acc.remaining.slice(idx + 1)],
      };
    },
    { count: 0, remaining: secretRest },
  ).count;

  return { bulls, cows };
}
