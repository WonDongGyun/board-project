import { CommonResponse } from './CommonResponse';
import { ErrorCode } from './ErrorCode';

export class ErrorResponse extends CommonResponse {
	constructor(errorCode: ErrorCode) {
		super();
		this.success = false;
		this.message = errorCode.getMessage();
		this.status = errorCode.getStatus();
		this.data = {};
	}

	public static response(errorCode: ErrorCode) {
		return new ErrorResponse(errorCode);
	}
}
