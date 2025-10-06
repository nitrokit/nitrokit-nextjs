import * as confetti from 'canvas-confetti';

declare global {
    namespace confetti {
        type Options = confetti.Options;
    }
}

export type ConfettiOptions = confetti.Options;
