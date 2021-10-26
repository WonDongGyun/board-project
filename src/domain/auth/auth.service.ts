import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../entities/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Users)
		private readonly usersRepository: Repository<Users>,
		private readonly jwtService: JwtService
	) {}

	// 검증
	async validateUser(userId: string, password: string) {
		const user = await this.usersRepository.findOne({ userId: userId });

		if (!user || (user && !bcrypt.compare(password, user.password))) {
			return null;
		}

		return user;
	}

	// 토큰 생성
	makeToken(user: Users) {
		const payload = { userId: user.userId, userName: user.userName };
		return { access_token: 'bearer ' + this.jwtService.sign(payload) };
	}
}
