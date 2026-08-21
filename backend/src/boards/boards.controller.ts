import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GetUser } from "../auth/decorators/get-user.decorator";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

@ApiTags("Boards")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("boards")
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  @ApiOperation({ summary: "Get all boards for current user" })
  async findAll(@GetUser("id") userId: string) {
    return this.boardsService.findAllForUser(userId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get board by ID with columns, tasks, and subtasks" })
  async findOne(@Param("id") id: string, @GetUser("id") userId: string) {
    return this.boardsService.findOne(id, userId);
  }

  @Post()
  @ApiOperation({ summary: "Create a new board with columns" })
  async create(@GetUser("id") userId: string, @Body() dto: CreateBoardDto) {
    return this.boardsService.create(userId, dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update board name and/or columns" })
  async update(@Param("id") id: string, @GetUser("id") userId: string, @Body() dto: UpdateBoardDto) {
    return this.boardsService.update(id, userId, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete board by ID" })
  async remove(@Param("id") id: string, @GetUser("id") userId: string) {
    return this.boardsService.remove(id, userId);
  }
}
