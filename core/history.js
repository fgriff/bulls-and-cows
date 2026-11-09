export function appendAttempt(history, attempt) {
    const normalized = attempt.guess.toLowerCase();
    const isExists = history.some((a) => a.guess.toLowerCase() === normalized);
    if (isExists) {
        return history;
    }
    return [...history, attempt];
}
export function findAttempt(history, guess) {
    const normalized = guess.toLowerCase();
    return history.find((a) => a.guess.toLowerCase() === normalized);
}
export function isWin(evaluation, length) {
    return evaluation.bulls === length;
}
