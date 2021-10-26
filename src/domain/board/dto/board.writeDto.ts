import { IsString } from 'class-validator';

export class WriteDto {
	@IsString()
	readonly title!: string;

	@IsString()
	readonly contents!: string;
}
