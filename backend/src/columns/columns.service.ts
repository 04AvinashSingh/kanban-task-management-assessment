import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateColumnDto } from "./dto/create-column.dto";
import { UpdateColumnDto } from "./dto/update-column.dto";

@Injectable()
export class ColumnsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateColumnDto) {
    const board = await this.prisma.board.findUnique({
      where: { id: dto.boardId },
      include: { columns: true },
    });
    if (!board) throw new NotFoundException("Board not found");
    if (board.userId !== userId) throw new ForbiddenException("Unauthorized");

    const count = board.columns.length;
    return this.prisma.column.create({
      data: {
        name: dto.name,
        color: dto.color || "#8471F2",
        order: dto.order !== undefined ? dto.order : count,
        boardId: dto.boardId,
      },
      include: {
        tasks: {
          include: { subtasks: true },
        },
      },
    });
  }

  async update(id: string, userId: string, dto: UpdateColumnDto) {
    const col = await this.prisma.column.findUnique({
      where: { id },
      include: { board: true },
    });
    if (!col) throw new NotFoundException("Column not found");
    if (col.board.userId !== userId) throw new ForbiddenException("Unauthorized");

    return this.prisma.column.update({
      where: { id },
      data: {
        ...(dto.name ? { name: dto.name } : {}),
        ...(dto.color ? { color: dto.color } : {}),
        ...(dto.order !== undefined ? { order: dto.order } : {}),
      },
      include: {
        tasks: {
          include: { subtasks: true },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    const col = await this.prisma.column.findUnique({
      where: { id },
      include: { board: true },
    });
    if (!col) throw new NotFoundException("Column not found");
    if (col.board.userId !== userId) throw new ForbiddenException("Unauthorized");

    await this.prisma.column.delete({ where: { id } });
    return { success: true, message: "Column deleted successfully" };
  }
}
