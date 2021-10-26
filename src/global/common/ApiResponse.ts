import { CommonResponse } from './CommonResponse';

export class ApiResponse extends CommonResponse {
	constructor(response: any) {
		super();
		this.success = true;
		this.message = 'test';
		this.status = 1;
		this.data = response;
	}

	public static boardsApiResponse(response: any) {
		return new ApiResponse(response);
	}
}
