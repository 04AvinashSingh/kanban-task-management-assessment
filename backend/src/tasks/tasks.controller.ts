import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GetUser } from "../auth/decorators/get-user.decorator";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { MoveTaskDto } from "./dto/move-task.dto";

@ApiTags("Tasks")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: "Create a new task with optional subtasks" })
  async create(@GetUser("id") userId: string, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(userId, dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update task details, subtasks, or column" })
  async update(@Param("id") id: string, @GetUser("id") userId: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(id, userId, dto);
  }

  @Patch(":id/move")
  @ApiOperation({ summary: "Move and reorder task across/within columns" })
  async move(@Param("id") id: string, @GetUser("id") userId: string, @Body() dto: MoveTaskDto) {
    return this.tasksService.move(id, userId, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a task" })
  async remove(@Param("id") id: string, @GetUser("id") userId: string) {
    return this.tasksService.remove(id, userId);
  }
}
