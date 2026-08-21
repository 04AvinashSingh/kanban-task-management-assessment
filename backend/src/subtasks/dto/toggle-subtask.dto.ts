import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class ToggleSubtaskDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isCompleted: boolean;
}
