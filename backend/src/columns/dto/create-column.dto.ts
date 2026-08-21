import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateColumnDto {
  @ApiProperty({ example: "Review" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "#E5A449", required: false })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({ example: "board-uuid" })
  @IsString()
  @IsNotEmpty()
  boardId: string;

  @ApiProperty({ example: 3, required: false })
  @IsNumber()
  @IsOptional()
  order?: number;
}
