import { HttpException, HttpStatus } from '@nestjs/common';

export class BoardVerifyException extends HttpException {
	constructor() {
		super('Forbidden', HttpStatus.FORBIDDEN);
	}
}
