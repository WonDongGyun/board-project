import { HttpException, HttpStatus } from '@nestjs/common';

export class UserDuplicateException extends HttpException {
	constructor() {
		super('NOT_ACCEPTABLE', HttpStatus.NOT_ACCEPTABLE);
	}
}
