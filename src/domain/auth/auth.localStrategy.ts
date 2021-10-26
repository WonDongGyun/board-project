import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({ usernameField: 'userId' });
	}

	// 아이디, 비밀번호 검증
	async validate(userId: string, password: string) {
		const user = await this.authService.validateUser(userId, password);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
