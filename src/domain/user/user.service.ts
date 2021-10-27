import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/entities/user.entity';
import { SignUpDto } from './dto/user.signUpDto';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/user.authDto';
import { UserDuplicateException } from './exception/UserDuplicateException';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(Users)
		private readonly usersRepository: Repository<Users>
	) {}

	// 패스워드 해쉬화
	private async hashPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, 10);
	}

	async userCreate(signUpDto: SignUpDto) {
		const findUser = await this.usersRepository.findOne({
			userId: signUpDto.userId
		});

		if (findUser) {
			throw new UserDuplicateException();
		}

		const user = new Users();
		user.userId = signUpDto.userId;
		user.password = await this.hashPassword(signUpDto.password);
		user.userName = signUpDto.userName;

		return await this.usersRepository.save(user);
	}
}
