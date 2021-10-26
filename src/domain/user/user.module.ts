import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Users } from '../entities/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	imports: [TypeOrmModule.forFeature([Users]), AuthModule],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}
