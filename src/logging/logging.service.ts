import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService extends Logger {
  constructor(context?: string) {
    super(context);
    this.log(`Custom Logging ON for ${context}`);
  }

  log(message: string, context?: string) {
    super.log(message);
  }
}
