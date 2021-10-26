import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/localAuthGuard.guard';
import { SignUpDto } from './dto/user.signUpDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService
	) {}

	// 사용자 생성
	@Post('')
	signUp(@Body() signUpDto: SignUpDto) {
		return this.userService.userCreate(signUpDto);
	}

	// 사용자 인증
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async userAuth(@Request() req) {
		return this.authService.makeToken(req.user);
	}
}
