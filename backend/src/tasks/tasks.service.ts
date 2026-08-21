import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { MoveTaskDto } from "./dto/move-task.dto";

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateTaskDto) {
    const column = await this.prisma.column.findUnique({
      where: { id: dto.columnId },
      include: { board: true, tasks: true },
    });

    if (!column) throw new NotFoundException("Column not found");
    if (column.board.userId !== userId) throw new ForbiddenException("Unauthorized");

    const order = column.tasks.length;
    const status = dto.status || column.name;

    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description || "",
        status,
        order,
        columnId: dto.columnId,
        subtasks: dto.subtasks
          ? {
              create: dto.subtasks.map((st) => ({
                title: st.title,
                isCompleted: false,
              })),
            }
          : undefined,
      },
      include: {
        subtasks: {
          orderBy: { createdAt: "asc" },
        },
      },
    });
  }

  async update(id: string, userId: string, dto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        column: { include: { board: true } },
        subtasks: true,
      },
    });

    if (!task) throw new NotFoundException("Task not found");
    if (task.column.board.userId !== userId) throw new ForbiddenException("Unauthorized");

    return this.prisma.$transaction(async (tx) => {
      let targetColumnId = task.columnId;
      let targetStatus = task.status;

      if (dto.columnId && dto.columnId !== task.columnId) {
        const targetCol = await tx.column.findUnique({ where: { id: dto.columnId } });
        if (!targetCol) throw new NotFoundException("Target column not found");
        targetColumnId = targetCol.id;
        targetStatus = dto.status || targetCol.name;
      } else if (dto.status && dto.status !== task.status) {
        targetStatus = dto.status;
      }

      await tx.task.update({
        where: { id },
        data: {
          ...(dto.title ? { title: dto.title } : {}),
          ...(dto.description !== undefined ? { description: dto.description } : {}),
          columnId: targetColumnId,
          status: targetStatus,
        },
      });

      if (dto.subtasks) {
        const existingSubtaskIds = task.subtasks.map((s) => s.id);
        const incomingIds = dto.subtasks.filter((s) => s.id).map((s) => s.id);
        const toDeleteIds = existingSubtaskIds.filter((sid) => !incomingIds.includes(sid));

        if (toDeleteIds.length > 0) {
          await tx.subtask.deleteMany({
            where: { id: { in: toDeleteIds } },
          });
        }

        for (const st of dto.subtasks) {
          if (st.id && existingSubtaskIds.includes(st.id)) {
            await tx.subtask.update({
              where: { id: st.id },
              data: {
                title: st.title,
                ...(st.isCompleted !== undefined ? { isCompleted: st.isCompleted } : {}),
              },
            });
          } else {
            await tx.subtask.create({
              data: {
                title: st.title,
                isCompleted: st.isCompleted || false,
                taskId: id,
              },
            });
          }
        }
      }

      return tx.task.findUnique({
        where: { id },
        include: {
          subtasks: { orderBy: { createdAt: "asc" } },
        },
      });
    });
  }

  async move(id: string, userId: string, dto: MoveTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        column: { include: { board: true } },
      },
    });

    if (!task) throw new NotFoundException("Task not found");
    if (task.column.board.userId !== userId) throw new ForbiddenException("Unauthorized");

    const targetColumn = await this.prisma.column.findUnique({
      where: { id: dto.targetColumnId },
      include: { board: true, tasks: { orderBy: { order: "asc" } } },
    });

    if (!targetColumn) throw new NotFoundException("Target column not found");
    if (targetColumn.board.userId !== userId) throw new ForbiddenException("Unauthorized");

    return this.prisma.$transaction(async (tx) => {
      // Reorder destination column
      const otherTasks = targetColumn.tasks.filter((t) => t.id !== id);
      otherTasks.splice(dto.newOrder, 0, task);

      for (let i = 0; i < otherTasks.length; i++) {
        await tx.task.update({
          where: { id: otherTasks[i].id },
          data: {
            order: i,
            columnId: targetColumn.id,
            status: targetColumn.name,
          },
        });
      }

      return tx.task.findUnique({
        where: { id },
        include: { subtasks: true },
      });
    });
  }

  async remove(id: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        column: { include: { board: true } },
      },
    });

    if (!task) throw new NotFoundException("Task not found");
    if (task.column.board.userId !== userId) throw new ForbiddenException("Unauthorized");

    await this.prisma.task.delete({ where: { id } });
    return { success: true, message: "Task deleted successfully" };
  }
}
