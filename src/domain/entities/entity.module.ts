import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boards } from './entities/board.entity';
import { Users } from './entities/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Users, Boards])]
})
export class EntityModule {}
