import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Request,
	UseGuards
} from '@nestjs/common';
import { ApiResponse } from 'src/global/common/ApiResponse';
import { JwtGuard } from '../auth/guards/jwtGuard.guard';
import { BoardService } from './board.service';
import { UpdateDto } from './dto/board.updateDto';
import { WriteDto } from './dto/board.writeDto';

@Controller('board')
export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	// 글 작성
	@UseGuards(JwtGuard)
	@Post()
	writePost(@Request() req, @Body() writeDto: WriteDto) {
		const apiResponse = ApiResponse.boardsApiResponse(
			this.boardService.write(req.user, writeDto)
		);
		// return this.boardService.write(req.user, writeDto);
		return apiResponse;
	}

	// 글 목록 확인

	// 글 수정
	@UseGuards(JwtGuard)
	@Put(':boardId')
	updatePost(
		@Param('boardId') boardId: string,
		@Request() req,
		@Body() updateDto: UpdateDto
	) {
		return this.boardService.update(boardId, req.user, updateDto);
	}

	// 글 삭제
	@UseGuards(JwtGuard)
	@Delete(':boardId')
	deletePost(@Param('boardId') boardId: string, @Request() req) {
		return this.boardService.delete(boardId, req.user);
	}

	// 글 확인
	@Get(':boardId')
	readPost(@Param('boardId') boardId: string) {
		return this.boardService.read(boardId);
	}
}
