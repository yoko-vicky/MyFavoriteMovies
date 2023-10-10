import { LogLevelType } from './logger';

export type Environment = 'development' | 'production';

export const APP_ENV: Environment =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

export const LOG_LEVEL: LogLevelType =
  // APP_ENV === 'production' ? 'warn' : 'log';
  APP_ENV === 'production' ? 'error' : 'log';
