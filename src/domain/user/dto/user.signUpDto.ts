import { IsString } from 'class-validator';

export class SignUpDto {
	@IsString()
	readonly userId!: string;
	@IsString()
	readonly password!: string;
	@IsString()
	readonly userName!: string;
}
