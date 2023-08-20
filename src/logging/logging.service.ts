import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';

const LevelsConsoleLogger = {
  0: ['error'],
  1: ['error', 'warn'],
  2: ['error', 'warn', 'log'],
  3: ['error', 'warn', 'log', 'verbose', 'debug'],
};

export enum LoggingLevel {
  OnlyErrors = 0,
  ErrorsAndWarms = 1,
  ErrorsWarmsLogs = 2,
  All = 3,
}
@Injectable()
export class LoggingService extends ConsoleLogger {
  constructor(logLevel: LoggingLevel | undefined = undefined) {
    super();
    const defaultLevel = LoggingLevel.ErrorsWarmsLogs;
    const actualLevel = logLevel || defaultLevel;
    const levels = LevelsConsoleLogger[actualLevel];
    this.setLogLevels(levels as LogLevel[]);
  }

  log(message: string, context?: string) {
    super.log(message, context);
  }
}
