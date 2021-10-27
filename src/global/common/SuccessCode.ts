export class SuccessCode {
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

	public static createUser() {
		return new SuccessCode(201, 'Create User successfully');
	}

	public static login() {
		return new SuccessCode(200, 'login successfully');
	}

	public static writePost() {
		return new SuccessCode(201, 'Write Post successfully');
	}

	public static updatePost() {
		return new SuccessCode(201, 'Update Post successfully');
	}

	public static deletePost() {
		return new SuccessCode(200, 'Delete Post successfully');
	}

	public static pagePost() {
		return new SuccessCode(200, 'Pagination successfully');
	}

	public static readPost() {
		return new SuccessCode(200, 'Read Post successfully');
	}
}
