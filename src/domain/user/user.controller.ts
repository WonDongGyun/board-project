import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Post,
	Request,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import { ApiResponse } from 'src/global/common/ApiResponse';
import { SuccessCode } from 'src/global/common/SuccessCode';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/localAuthGuard.guard';
import { SignUpDto } from './dto/user.signUpDto';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService
	) {}

	// 사용자 생성
	@Post('')
	async signUp(@Body() signUpDto: SignUpDto): Promise<ApiResponse> {
		const apiResponse = ApiResponse.response(
			SuccessCode.createUser(),
			await this.userService.userCreate(signUpDto)
		);
		return apiResponse;
	}

	// 사용자 인증
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async userAuth(@Request() req): Promise<ApiResponse> {
		const apiResponse = ApiResponse.response(
			SuccessCode.login(),
			await this.authService.makeToken(req.user)
		);
		return apiResponse;
	}
}
