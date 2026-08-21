import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class MoveTaskDto {
  @ApiProperty({ example: "new-column-uuid" })
  @IsString()
  @IsNotEmpty()
  targetColumnId: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  newOrder: number;
}
