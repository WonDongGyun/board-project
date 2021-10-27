import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boards } from '../entities/entities/board.entity';
import { Users } from '../entities/entities/user.entity';
import { UpdateDto } from './dto/board.updateDto';
import { WriteDto } from './dto/board.writeDto';
import { BoardVerifyException } from './exception/BoardVerifyException';
import { NotFoundBoardException } from './exception/BoardVerifyException copy';

@Injectable()
export class BoardService {
	constructor(
		@InjectRepository(Users)
		private readonly usersRepository: Repository<Users>,

		@InjectRepository(Boards)
		private readonly boardsRepository: Repository<Boards>
	) {}

	// 사용자가 작성한 게시판 확인
	private async boardVerify(boardId: string, loginUser) {
		const board: Boards = await this.boardsRepository.findOne({
			boardId: boardId
		});
		const user: Users = await board.users;

		if (!board) {
			throw new NotFoundBoardException();
		}

		if (user.userId != loginUser.userId) {
			throw new BoardVerifyException();
		}

		return board;
	}

	// 글 쓰기
	async write(loginUser, writeDto: WriteDto) {
		const board: Boards = new Boards();
		board.title = writeDto.title;
		board.contents = writeDto.contents;
		board.users = await this.usersRepository.findOne({
			userId: loginUser.userId
		});

		return await this.boardsRepository.save(board);
	}

	// 글 수정
	async update(boardId: string, loginUser, updateDto: UpdateDto) {
		const board = await this.boardVerify(boardId, loginUser);
		return await this.boardsRepository.update(
			{
				boardId: board.boardId
			},
			{
				title: updateDto.title,
				contents: updateDto.contents
			}
		);
	}

	// 글 삭제
	async delete(boardId: string, loginUser) {
		const board = await this.boardVerify(boardId, loginUser);
		return await this.boardsRepository.delete({ boardId: board.boardId });
	}

	// 글 목록 확인
	async getPage(page: number) {
		const take = 10;
		const skip = page * 10 || 0;
		const [result, total] = await this.boardsRepository.findAndCount({
			order: {
				boardId: 'DESC'
			},
			take: take,
			skip: skip
		});

		for (const board of await result) {
			const user: Users = await board.users;
		}

		return result;
	}

	// 글 확인
	async read(boardId: string) {
		const board: Boards = await this.boardsRepository.findOne({
			boardId: boardId
		});
		const user: Users = await board.users;
		return board;
	}
}
