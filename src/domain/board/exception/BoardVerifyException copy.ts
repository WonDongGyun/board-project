import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundBoardException extends HttpException {
	constructor() {
		super('NOT_FOUND', HttpStatus.NOT_FOUND);
	}
}
