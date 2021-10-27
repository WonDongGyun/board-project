import { CommonResponse } from './CommonResponse';
import { SuccessCode } from './SuccessCode';

export class ApiResponse extends CommonResponse {
	constructor(successCode: SuccessCode, response: any) {
		super();
		this.success = true;
		this.message = successCode.getMessage();
		this.status = successCode.getStatus();
		this.data = response;
	}

	public static response(successCode: SuccessCode, response: any) {
		return new ApiResponse(successCode, response);
	}
}
