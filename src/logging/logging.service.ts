import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import * as fs from 'fs';

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
const logPath = 'part3-logs';
const FILE_NAME = 'log';
const FILE_TYPE = 'log';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private activeStream: fs.WriteStream;
  private activeFileName = '';
  private activeFileSize = 0;
  private activeFileSizeMax = 0;
  loggingFileSizeKb = 64;
  constructor() {
    super();
    this.setLoggingLevel(LoggingLevel.ErrorsWarmsLogs);
    this.setLoggingFileSizeKb(this.loggingFileSizeKb);
    this.activeStream = this.startStream();
  }

  log(message: string, context?: string) {
    super.log(message, context);
    const level = 'log';
    if (this.isLevelEnabled(level)) {
      this.writeMessage(message, level, context);
    }
  }

  error(message: string, context?: string) {
    super.error(message, context);
    const level = 'error';
    if (this.isLevelEnabled(level)) {
      this.writeMessage(message, level, context);
    }
  }

  warn(message: string, context?: string) {
    super.warn(message, context);
    const level = 'warn';
    if (this.isLevelEnabled(level)) {
      this.writeMessage(message, level, context);
    }
  }

  debug(message: string, context?: string) {
    super.debug(message, context);
    const level = 'debug';
    if (this.isLevelEnabled(level)) {
      this.writeMessage(message, level, context);
    }
  }

  verbose(message: string, context?: string) {
    super.verbose(message, context);
    const level = 'verbose';
    if (this.isLevelEnabled(level)) {
      this.writeMessage(message, level, context);
    }
  }

  setLoggingLevel(logLevel: LoggingLevel): void {
    const levels = LevelsConsoleLogger[logLevel];
    this.setLogLevels(levels as LogLevel[]);
  }
  setLoggingFileSizeKb(size: number): void {
    this.activeFileSizeMax = (size < 1 ? 1 : size) * 1024;
  }

  private writeMessage(
    message: string,
    level: LogLevel,
    context?: string,
  ): void {
    const messageToFile = `${new Date().toISOString()} ${level.toUpperCase()} [${context}] ${message} \n`;
    const messageSize = Buffer.byteLength(messageToFile, 'utf-8');
    this.activeFileSize += messageSize;
    if (this.activeFileSize > this.activeFileSizeMax) {
      this.rotateStream();
      this.activeFileSize += messageSize;
    }
    this.activeStream.write(messageToFile);
  }

  private startStream() {
    const firstFileName = `${FILE_NAME}-0.${FILE_TYPE}`;
    let isLastFileExist = false;
    if (!fs.existsSync(logPath)) {
      fs.mkdirSync(logPath);
    } else {
      const files = fs.readdirSync(logPath);
      isLastFileExist = Boolean(files.at(-1));
      this.activeFileName = isLastFileExist ? files.at(-1) : firstFileName;
    }
    const path = `${logPath}/${this.activeFileName}`;

    this.activeFileSize = isLastFileExist ? fs.statSync(path).size : 0;

    return fs.createWriteStream(path, {
      flags: 'a',
    });
  }

  private rotateStream(): void {
    this.activeStream.end();
    const idx = +this.activeFileName.split('.')[0].split('-')[1] + 1;
    this.activeFileName = `${FILE_NAME}-${idx}.${FILE_TYPE}`;
    const path = `${logPath}/${this.activeFileName}`;
    this.activeStream = fs.createWriteStream(path, {
      flags: 'a',
    });
    this.activeFileSize = 0;
  }
}
