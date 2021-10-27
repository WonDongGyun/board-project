export class ErrorCode {
	private status: number;
	private message: string;

	constructor(status: number, message: string) {
		this.status = status;
		this.message = message;
	}

	getStatus(): number {
		return this.status;
	}

	getMessage(): string {
		return this.message;
	}

	public static boardVerify() {
		return new ErrorCode(403, 'Failed to verify the board');
	}

	public static userDuplicate() {
		return new ErrorCode(406, 'Duplicate Id');
	}

	public static unauthorized() {
		return new ErrorCode(406, 'Unauthorized');
	}

	public static notFoundBoard() {
		return new ErrorCode(404, 'Not Found Board');
	}

	public static badRequest() {
		return new ErrorCode(404, 'Bad Request');
	}
}
