import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class ColumnInputDto {
  @ApiProperty({ example: "Todo" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "#49C4E5", required: false })
  @IsString()
  @IsOptional()
  color?: string;
}

export class CreateBoardDto {
  @ApiProperty({ example: "Platform Launch" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: [ColumnInputDto], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ColumnInputDto)
  columns?: ColumnInputDto[];
}
