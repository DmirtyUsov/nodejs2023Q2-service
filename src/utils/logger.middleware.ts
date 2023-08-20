import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLenght = response.get('content-length');

      const body = JSON.stringify(request.body);
      const params = JSON.stringify(request.params);

      const paramMsg = params.length > 2 ? `\n      params:${params}` : '';
      const bodyMsg = body.length > 2 ? `\n      body:${body}` : '';

      const message = `${method} ${originalUrl} ${statusCode} ${contentLenght} - ${userAgent} ${ip} ${paramMsg} ${bodyMsg}`;
      this.logger.log(message, 'HTTP');
    });

    next();
  }
}
