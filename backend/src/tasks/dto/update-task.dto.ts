import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class SubtaskUpdateDto {
  @ApiProperty({ example: "subtask-uuid", required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ example: "Talk to potential users" })
  @IsString()
  title: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  isCompleted?: boolean;
}

export class UpdateTaskDto {
  @ApiProperty({ example: "Updated Task Title", required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: "Updated Task Description", required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: "column-uuid", required: false })
  @IsString()
  @IsOptional()
  columnId?: string;

  @ApiProperty({ example: "Doing", required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ type: [SubtaskUpdateDto], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SubtaskUpdateDto)
  subtasks?: SubtaskUpdateDto[];
}
