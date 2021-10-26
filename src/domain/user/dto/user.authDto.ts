import { IsString } from 'class-validator';

export class AuthDto {
	@IsString()
	readonly userId!: string;
	@IsString()
	readonly password!: string;
}
