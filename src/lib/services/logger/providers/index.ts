import { LoggerProvider } from '../types';
import { ConsoleProvider } from './console';

export function createLoggerProvider(provider: string): LoggerProvider {
    switch (provider.toLowerCase()) {
        case 'console':
        default:
            return new ConsoleProvider();
    }
}

export { ConsoleProvider };
