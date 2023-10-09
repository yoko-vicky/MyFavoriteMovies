import { LOG_LEVEL } from './environment';

export interface LogFunc {
  (message?: any, ...optionalParams: any[]): void;
}

export interface LoggerState {
  log: LogFunc;
  warn: LogFunc;
  error: LogFunc;
}

export type LogLevelType = 'log' | 'warn' | 'error';
const NO_OP: LogFunc = (message?: any, ...optionalParams: any[]) => {};

export class Logger implements LoggerState {
  readonly log: LogFunc;
  readonly warn: LogFunc;
  readonly error: LogFunc;

  constructor(options?: { level?: LogLevelType }) {
    const { level } = options || {};

    this.error = console.error.bind(console);

    if (level === 'error') {
      this.warn = NO_OP;
      this.log = NO_OP;

      return;
    }

    this.warn = console.warn.bind(console);

    if (level === 'warn') {
      this.log = NO_OP;

      return;
    }

    this.log = console.log.bind(console);
  }
}

export const logger = new Logger({ level: LOG_LEVEL });
