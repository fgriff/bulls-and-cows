import { countPossibleSecrets } from '../core/countPossibleSecrets.js';
import { clear, elem } from './elements.js';
const BASES = [
    { value: 2, label: 'Двоичная (bin)' },
    { value: 8, label: 'Восьмеричная (oct)' },
    { value: 10, label: 'Десятичная (dec)' },
    { value: 16, label: 'Шестнадцатеричная (hex)' },
];
const LENGTHS = [2, 3, 4, 5, 6];
export function renderSettings(props) {
    const state = { base: 10, length: 4 };
    const lengthContainer = elem('div', { className: 'length-options' });
    const possibleInfo = elem('p', { className: 'possible-info' });
    const renderLengths = () => {
        clear(lengthContainer);
        for (const len of LENGTHS) {
            const disabled = len > state.base;
            const button = elem('button', {
                type: 'button',
                disabled,
                className: len === state.length ? 'selected' : '',
            }, [String(len)]);
            button.addEventListener('click', () => {
                if (disabled) {
                    return;
                }
                state.length = len;
                renderLengths();
            });
            lengthContainer.append(button);
        }
        possibleInfo.textContent = `Возможных секретов: ${countPossibleSecrets(state.length, state.base)}`;
    };
    const clampLength = () => {
        if (state.length > state.base) {
            state.length = 2;
        }
    };
    const baseSelect = elem('select', { className: 'base-select' });
    for (const { value, label } of BASES) {
        const opt = elem('option', { value: String(value) }, [label]);
        baseSelect.append(opt);
    }
    baseSelect.value = String(state.base);
    baseSelect.addEventListener('change', () => {
        state.base = Number(baseSelect.value);
        clampLength();
        renderLengths();
    });
    const startButton = elem('button', { type: 'button', className: 'start-button' }, [
        'Начать игру',
    ]);
    startButton.addEventListener('click', () => props.onStart({ ...state }));
    renderLengths();
    return elem('section', { className: 'settings' }, [
        elem('h1', {}, ['Bulls and Cows']),
        elem('label', {}, ['Система счисления']),
        baseSelect,
        elem('label', {}, ['Длина секретного числа']),
        lengthContainer,
        possibleInfo,
        startButton,
    ]);
}
