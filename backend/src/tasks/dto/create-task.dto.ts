import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class SubtaskInputDto {
  @ApiProperty({ example: "Talk to potential users" })
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class CreateTaskDto {
  @ApiProperty({ example: "Design landing page wireframes" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: "Create high-fidelity mockups for hero and pricing", required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: "column-uuid" })
  @IsString()
  @IsNotEmpty()
  columnId: string;

  @ApiProperty({ example: "Todo", required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ type: [SubtaskInputDto], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SubtaskInputDto)
  subtasks?: SubtaskInputDto[];
}
