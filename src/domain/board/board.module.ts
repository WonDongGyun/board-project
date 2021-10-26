import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Boards } from '../entities/entities/board.entity';
import { Users } from '../entities/entities/user.entity';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
	imports: [TypeOrmModule.forFeature([Users, Boards]), AuthModule],
	controllers: [BoardController],
	providers: [BoardService]
})
export class BoardModule {}
