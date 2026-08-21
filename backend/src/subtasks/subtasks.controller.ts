import { Body, Controller, Delete, Param, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GetUser } from "../auth/decorators/get-user.decorator";
import { SubtasksService } from "./subtasks.service";
import { ToggleSubtaskDto } from "./dto/toggle-subtask.dto";

@ApiTags("Subtasks")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("subtasks")
export class SubtasksController {
  constructor(private subtasksService: SubtasksService) {}

  @Patch(":id/toggle")
  @ApiOperation({ summary: "Toggle subtask completed status" })
  async toggle(@Param("id") id: string, @GetUser("id") userId: string, @Body() dto: ToggleSubtaskDto) {
    return this.subtasksService.toggle(id, userId, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete subtask" })
  async remove(@Param("id") id: string, @GetUser("id") userId: string) {
    return this.subtasksService.remove(id, userId);
  }
}
