import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus,} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() 
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const req = host.switchToHttp();
    const response = req.getResponse<Response>();
    const request = req.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let body: any = {
      message: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      body =
        typeof res === 'string'   ? { message: res } : res;
    }
    response.status(status).json({
      ...body,
    });
  }
}
