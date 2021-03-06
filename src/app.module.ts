import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './domain/user/user.module';
import { EntityModule } from './domain/entities/entity.module';
import { Users } from './domain/entities/entities/user.entity';
import { Boards } from './domain/entities/entities/board.entity';
import { AuthModule } from './domain/auth/auth.module';
import { BoardModule } from './domain/board/board.module';
import * as path from 'path';

@Module({
	imports: [
		UserModule,
		EntityModule,
		AuthModule,
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: ':memory:',
			entities: [Users, Boards],
			synchronize: true
		}),
		BoardModule
	]
})
export class AppModule {}
