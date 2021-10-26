import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boards } from '../entities/entities/board.entity';
import { Users } from '../entities/entities/user.entity';
import { UpdateDto } from './dto/board.updateDto';
import { WriteDto } from './dto/board.writeDto';

@Injectable()
export class BoardService {
	constructor(
		@InjectRepository(Users)
		private readonly usersRepository: Repository<Users>,

		@InjectRepository(Boards)
		private readonly boardsRepository: Repository<Boards>
	) {}

	// 글 쓰기
	async write(loginUser, writeDto: WriteDto) {
		const board = new Boards();
		board.title = writeDto.title;
		board.contents = writeDto.contents;
		board.users = await this.usersRepository.findOne({
			userId: loginUser.userId
		});

		return await this.boardsRepository.insert(board);
	}

	// 글 수정
	async update(boardId: string, loginUser, updateDto: UpdateDto) {
		const board: Boards = await this.boardsRepository.findOne({
			boardId: boardId
		});
		const user: Users = await board.users;

		if (user.userId != loginUser.userId) {
			return null;
		}

		return await this.boardsRepository.update(
			{
				boardId
			},
			{
				title: updateDto.title,
				contents: updateDto.contents
			}
		);
	}

	// 글 삭제
	async delete(boardId: string, loginUser) {
		const board: Boards = await this.boardsRepository.findOne({
			boardId: boardId
		});
		const user: Users = await board.users;

		if (user.userId != loginUser.userId) {
			return null;
		}

		return await this.boardsRepository.delete(board);
	}

	// 글 확인
	async read(boardId: string) {
		return await this.boardsRepository.findOne({ boardId: boardId });
	}
}
