import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GetUser } from "../auth/decorators/get-user.decorator";
import { ColumnsService } from "./columns.service";
import { CreateColumnDto } from "./dto/create-column.dto";
import { UpdateColumnDto } from "./dto/update-column.dto";

@ApiTags("Columns")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("columns")
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new column in a board" })
  async create(@GetUser("id") userId: string, @Body() dto: CreateColumnDto) {
    return this.columnsService.create(userId, dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update column details" })
  async update(@Param("id") id: string, @GetUser("id") userId: string, @Body() dto: UpdateColumnDto) {
    return this.columnsService.update(id, userId, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete column and its tasks" })
  async remove(@Param("id") id: string, @GetUser("id") userId: string) {
    return this.columnsService.remove(id, userId);
  }
}
