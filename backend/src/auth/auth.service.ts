import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcryptjs";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { createDefaultBoardsForUser } from "../../prisma/seed";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase().trim() },
    });
    if (existing) {
      throw new ConflictException("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase().trim(),
        password: hashedPassword,
        name: dto.name || dto.email.split("@")[0],
        isGuest: false,
      },
    });

    // Seed default boards for new user
    await createDefaultBoardsForUser(user.id, this.prisma);

    const token = this.generateToken(user.id, user.email, user.isGuest);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isGuest: user.isGuest,
      },
      accessToken: token,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase().trim() },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const token = this.generateToken(user.id, user.email, user.isGuest);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isGuest: user.isGuest,
      },
      accessToken: token,
    };
  }

  async guestLogin() {
    const guestId = Math.random().toString(36).substring(2, 9);
    const email = `guest_${guestId}@kanban.temp`;
    const hashedPassword = await bcrypt.hash("guest_pass", 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        name: "Guest User",
        password: hashedPassword,
        isGuest: true,
      },
    });

    // Seed Figma boards for this guest
    await createDefaultBoardsForUser(user.id, this.prisma);

    const token = this.generateToken(user.id, user.email, true);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isGuest: true,
      },
      accessToken: token,
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        isGuest: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    return user;
  }

  private generateToken(userId: string, email: string, isGuest: boolean): string {
    const payload = { sub: userId, email, isGuest };
    return this.jwtService.sign(payload);
  }
}
