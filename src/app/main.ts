import { browserClock, browserRandom } from '../adapters/browser.js';
import { createLocalStorageAdapter } from '../adapters/localStorageAdapter.js';
import { createDigitValidator } from '../core/createDigitValidator.js';
import { addRecord } from '../core/records.js';
import { resetGame, startGame, submitGuess } from '../core/state.js';
import { Clock, GameState, Random, RecordEntry } from '../core/types.js';
import { KeyValueStorage } from '../ports/storage.js';
import { renderBoard } from '../ui/board.js';
import { clear } from '../ui/elements.js';
import { renderRecords } from '../ui/records.js';
import { renderSettings } from '../ui/settings.js';
import { RECORDS_LIMIT, STORAGE_KEY } from '../utils/constants.js';

type Deps = {
  random: Random;
  clock: Clock;
  storage: KeyValueStorage;
};

export function createApp(root: HTMLElement, deps: Deps): void {
  let state: GameState = { phase: 'settings' };

  const loadRecords = (): readonly RecordEntry[] => {
    const raw = deps.storage.get(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw) as RecordEntry[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const saveRecords = (records: readonly RecordEntry[]): void => {
    deps.storage.set(STORAGE_KEY, JSON.stringify(records));
  };

  const render = (): void => {
    clear(root);

    if (state.phase === 'settings') {
      root.append(
        renderSettings({
          onStart: (config) => {
            state = startGame(config, deps.random, deps.clock);
            render();
          },
        }),
      );

      return;
    }

    if (state.phase === 'playing' || state.phase === 'finished') {
      const boardState = state;
      const inputValidator = createDigitValidator(boardState.config.base);

      root.append(
        renderBoard({
          state: boardState,
          inputValidator,
          onGuess: (guess) => {
            const result = submitGuess(state, guess, deps.clock);

            if (result.kind === 'attempt' || result.kind === 'duplicate') {
              state = result.state;

              if (state.phase === 'finished' && state.won) {
                const records = addRecord(
                  loadRecords(),
                  {
                    id: `${Date.now()}-${Math.random()}`,
                    config: state.config,
                    attempts: state.history.length,
                    durationMs: state.finishedAt - state.startedAt,
                    at: Date.now(),
                  },
                  RECORDS_LIMIT,
                );
                saveRecords(records);
              }

              render();
            }
          },

          onNewGame: () => {
            state = resetGame();
            render();
          },
        }),
      );

      root.append(renderRecords(loadRecords()));
    }
  };

  render();
}

const root = document.createElement('div');

root.id = 'root';
document.body.append(root);

createApp(root, {
  random: browserRandom,
  clock: browserClock,
  storage: createLocalStorageAdapter(),
});
