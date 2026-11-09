import { GameState } from '../core/types.js';
import { elem } from './elements.js';

export type BoardProps = {
  state: Extract<GameState, { phase: 'playing' | 'finished' }>;
  onGuess: (guess: string) => void;
  onNewGame: () => void;
  inputValidator: (char: string) => boolean;
};

const isUniqueInput = (currentValue: string, newData: string): boolean => {
  const currentChars = [...currentValue.toLowerCase()];
  const newChars = [...newData.toLowerCase()];

  return newChars.every((char) => !currentChars.includes(char));
};

export function renderBoard(props: BoardProps): HTMLElement {
  const { state } = props;
  const input = elem('input', {
    type: 'text',
    className: 'guess-input',
    maxLength: state.config.length,
    placeholder: `Введите число из ${state.config.length} знаков`,
  });

  input.addEventListener('beforeinput', (e) => {
    const event = e as InputEvent;

    if (event.data) {
      const areCharsValid = [...event.data].every(props.inputValidator);

      const areCharsUnique = isUniqueInput(input.value, event.data);

      if (!areCharsValid || !areCharsUnique) {
        e.preventDefault();
      }
    }
  });

  const submit = elem('button', { type: 'button', className: 'submit-button' }, ['Проверить']);

  const submitGuess = (): void => {
    props.onGuess(input.value);
    input.value = '';
  };

  submit.addEventListener('click', submitGuess);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      submitGuess();
    }
  });

  const historyList = elem('ul', { className: 'history-list' });

  for (const attempt of state.history) {
    historyList.append(
      elem('li', {}, [
        elem('span', { className: 'guess-value' }, [attempt.guess]),
        elem('span', { className: 'bulls-count' }, [`🐂 ${attempt.bulls}`]),
        elem('span', { className: 'cows-count' }, [`🐄 ${attempt.cows}`]),
      ]),
    );
  }

  const finished = state.phase === 'finished';
  const status = finished
    ? elem('p', { className: 'status' }, [
        `Победа! Попыток: ${state.history.length}, время: ${Math.round(
          (state.finishedAt - state.startedAt) / 1000,
        )} с`,
      ])
    : elem('p', { className: 'status' }, ['Игра идет']);

  const newGame = elem('button', { type: 'button', className: 'new-game-button' }, ['Новая игра']);
  newGame.addEventListener('click', props.onNewGame);

  return elem('section', { className: 'board' }, [
    elem('h2', {}, [`Длина: ${state.config.length}, база: ${state.config.base}`]),
    status,
    ...(finished ? [] : [input, submit]),
    historyList,
    newGame,
  ]);
}
