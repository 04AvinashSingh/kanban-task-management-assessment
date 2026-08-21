import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ToggleSubtaskDto } from "./dto/toggle-subtask.dto";

@Injectable()
export class SubtasksService {
  constructor(private prisma: PrismaService) {}

  async toggle(id: string, userId: string, dto: ToggleSubtaskDto) {
    const subtask = await this.prisma.subtask.findUnique({
      where: { id },
      include: {
        task: {
          include: {
            column: { include: { board: true } },
          },
        },
      },
    });

    if (!subtask) throw new NotFoundException("Subtask not found");
    if (subtask.task.column.board.userId !== userId) throw new ForbiddenException("Unauthorized");

    return this.prisma.subtask.update({
      where: { id },
      data: { isCompleted: dto.isCompleted },
    });
  }

  async remove(id: string, userId: string) {
    const subtask = await this.prisma.subtask.findUnique({
      where: { id },
      include: {
        task: {
          include: {
            column: { include: { board: true } },
          },
        },
      },
    });

    if (!subtask) throw new NotFoundException("Subtask not found");
    if (subtask.task.column.board.userId !== userId) throw new ForbiddenException("Unauthorized");

    await this.prisma.subtask.delete({ where: { id } });
    return { success: true, message: "Subtask deleted" };
  }
}
