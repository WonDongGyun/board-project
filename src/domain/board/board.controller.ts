import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	Request,
	UseFilters,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import { ApiResponse } from 'src/global/common/ApiResponse';
import { SuccessCode } from 'src/global/common/SuccessCode';
import { ExceptionHandler } from 'src/global/exception/ExceptionHandler';
import { JwtGuard } from '../auth/guards/jwtGuard.guard';
import { BoardService } from './board.service';
import { UpdateDto } from './dto/board.updateDto';
import { WriteDto } from './dto/board.writeDto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('board')
export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	// 글 작성
	@UseGuards(JwtGuard)
	@Post()
	async writePost(
		@Request() req,
		@Body() writeDto: WriteDto
	): Promise<ApiResponse> {
		const apiResponse = ApiResponse.response(
			SuccessCode.writePost(),
			await this.boardService.write(req.user, writeDto)
		);
		return apiResponse;
	}

	// 글 목록 확인
	@Get()
	async getPage(@Query('page') page: number): Promise<ApiResponse> {
		const apiResponse = ApiResponse.response(
			SuccessCode.pagePost(),
			await this.boardService.getPage(page)
		);
		return apiResponse;
	}

	// 글 수정
	@UseGuards(JwtGuard)
	@Put(':boardId')
	async updatePost(
		@Param('boardId') boardId: string,
		@Request() req,
		@Body() updateDto: UpdateDto
	): Promise<ApiResponse> {
		const apiResponse = ApiResponse.response(
			SuccessCode.updatePost(),
			await this.boardService.update(boardId, req.user, updateDto)
		);
		return apiResponse;
	}

	// 글 삭제
	@UseGuards(JwtGuard)
	@Delete(':boardId')
	async deletePost(
		@Param('boardId') boardId: string,
		@Request() req
	): Promise<ApiResponse> {
		const apiResponse = ApiResponse.response(
			SuccessCode.deletePost(),
			await this.boardService.delete(boardId, req.user)
		);
		return apiResponse;
	}

	// 글 확인
	@Get(':boardId')
	async readPost(@Param('boardId') boardId: string): Promise<ApiResponse> {
		const apiResponse = ApiResponse.response(
			SuccessCode.readPost(),
			await this.boardService.read(boardId)
		);
		return apiResponse;
	}
}
