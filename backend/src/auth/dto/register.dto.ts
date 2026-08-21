import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({ example: "user@example.com", description: "User email address" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "password123", description: "User password (minimum 6 characters)" })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "Alex Developer", required: false, description: "User full name" })
  @IsString()
  @IsOptional()
  name?: string;
}
