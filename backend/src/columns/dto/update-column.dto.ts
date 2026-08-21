import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateColumnDto {
  @ApiProperty({ example: "Review", required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: "#E5A449", required: false })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({ example: 3, required: false })
  @IsNumber()
  @IsOptional()
  order?: number;
}
