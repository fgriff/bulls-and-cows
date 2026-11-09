import { evaluateGuess } from './evaluateGuess.js';
import { generateSecret } from './generateSecret.js';
import { appendAttempt, findAttempt, isWin } from './history.js';
import { isValidGuess } from './isValidGuess.js';
export function startGame(config, random, clock) {
    const secret = generateSecret(config.length, config.base, random);
    return {
        phase: 'playing',
        config,
        secret,
        history: [],
        startedAt: clock(),
    };
}
export function submitGuess(state, guess, clock) {
    if (state.phase !== 'playing') {
        return { kind: 'invalid' };
    }
    if (!isValidGuess(guess, state.config.length, state.config.base)) {
        return { kind: 'invalid' };
    }
    const existing = findAttempt(state.history, guess);
    if (existing) {
        return {
            kind: 'duplicate',
            state,
        };
    }
    const evaluation = evaluateGuess(state.secret, guess);
    const history = appendAttempt(state.history, {
        guess: guess.toLowerCase(),
        bulls: evaluation.bulls,
        cows: evaluation.cows,
    });
    if (isWin(evaluation, state.config.length)) {
        return {
            kind: 'attempt',
            state: {
                ...state,
                phase: 'finished',
                history,
                finishedAt: clock(),
                won: true,
            },
        };
    }
    return {
        kind: 'attempt',
        state: { ...state, history },
    };
}
export function resetGame() {
    return { phase: 'settings' };
}
