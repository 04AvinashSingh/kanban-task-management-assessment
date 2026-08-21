import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  async findAllForUser(userId: string) {
    return this.prisma.board.findMany({
      where: { userId },
      include: {
        columns: {
          orderBy: { order: "asc" },
          include: {
            tasks: {
              select: { id: true },
            },
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });
  }

  async findOne(id: string, userId: string) {
    const board = await this.prisma.board.findUnique({
      where: { id },
      include: {
        columns: {
          orderBy: { order: "asc" },
          include: {
            tasks: {
              orderBy: { order: "asc" },
              include: {
                subtasks: {
                  orderBy: { createdAt: "asc" },
                },
              },
            },
          },
        },
      },
    });

    if (!board) {
      throw new NotFoundException("Board not found");
    }

    if (board.userId !== userId) {
      throw new ForbiddenException("You do not have access to this board");
    }

    return board;
  }

  async create(userId: string, dto: CreateBoardDto) {
    return this.prisma.$transaction(async (tx) => {
      const board = await tx.board.create({
        data: {
          name: dto.name,
          userId,
        },
      });

      if (dto.columns && dto.columns.length > 0) {
        for (let i = 0; i < dto.columns.length; i++) {
          const col = dto.columns[i];
          await tx.column.create({
            data: {
              name: col.name,
              color: col.color || (i === 0 ? "#49C4E5" : i === 1 ? "#8471F2" : "#67E2AE"),
              order: i,
              boardId: board.id,
            },
          });
        }
      }

      return tx.board.findUnique({
        where: { id: board.id },
        include: {
          columns: {
            orderBy: { order: "asc" },
            include: {
              tasks: {
                include: { subtasks: true },
              },
            },
          },
        },
      });
    });
  }

  async update(id: string, userId: string, dto: UpdateBoardDto) {
    const board = await this.prisma.board.findUnique({
      where: { id },
      include: { columns: true },
    });

    if (!board) {
      throw new NotFoundException("Board not found");
    }
    if (board.userId !== userId) {
      throw new ForbiddenException("You do not have access to this board");
    }

    return this.prisma.$transaction(async (tx) => {
      if (dto.name) {
        await tx.board.update({
          where: { id },
          data: { name: dto.name },
        });
      }

      if (dto.columns) {
        const existingColIds = board.columns.map((c) => c.id);
        const incomingIds = dto.columns.filter((c) => c.id).map((c) => c.id);
        const toDeleteIds = existingColIds.filter((cid) => !incomingIds.includes(cid));

        if (toDeleteIds.length > 0) {
          await tx.column.deleteMany({
            where: { id: { in: toDeleteIds } },
          });
        }

        for (let i = 0; i < dto.columns.length; i++) {
          const col = dto.columns[i];
          if (col.id && existingColIds.includes(col.id)) {
            await tx.column.update({
              where: { id: col.id },
              data: {
                name: col.name,
                order: i,
                ...(col.color ? { color: col.color } : {}),
              },
            });
          } else {
            await tx.column.create({
              data: {
                name: col.name,
                color: col.color || (i === 0 ? "#49C4E5" : i === 1 ? "#8471F2" : "#67E2AE"),
                order: i,
                boardId: id,
              },
            });
          }
        }
      }

      return tx.board.findUnique({
        where: { id },
        include: {
          columns: {
            orderBy: { order: "asc" },
            include: {
              tasks: {
                orderBy: { order: "asc" },
                include: { subtasks: true },
              },
            },
          },
        },
      });
    });
  }

  async remove(id: string, userId: string) {
    const board = await this.prisma.board.findUnique({ where: { id } });
    if (!board) {
      throw new NotFoundException("Board not found");
    }
    if (board.userId !== userId) {
      throw new ForbiddenException("You do not have access to this board");
    }

    await this.prisma.board.delete({ where: { id } });
    return { success: true, message: "Board deleted successfully" };
  }
}
