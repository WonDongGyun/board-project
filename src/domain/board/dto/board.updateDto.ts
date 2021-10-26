import { IsString } from 'class-validator';

export class UpdateDto {
	@IsString()
	readonly title!: string;

	@IsString()
	readonly contents!: string;
}
