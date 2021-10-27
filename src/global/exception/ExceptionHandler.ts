import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	UnauthorizedException
} from '@nestjs/common';
import { Response } from 'express';
import { BoardVerifyException } from 'src/domain/board/exception/BoardVerifyException';
import { UserDuplicateException } from 'src/domain/user/exception/UserDuplicateException';
import { ErrorCode } from '../common/ErrorCode';
import { ErrorResponse } from '../common/ErrorResponse';

@Catch()
export class ExceptionHandler implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		if (exception instanceof BoardVerifyException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.boardVerify()));
		} else if (exception instanceof UserDuplicateException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.userDuplicate()));
		} else if (exception instanceof UnauthorizedException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.unauthorized()));
		}
	}
}
