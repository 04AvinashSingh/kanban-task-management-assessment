import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class ColumnUpdateInputDto {
  @ApiProperty({ example: "uuid-column", required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ example: "Todo" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "#49C4E5", required: false })
  @IsString()
  @IsOptional()
  color?: string;
}

export class UpdateBoardDto {
  @ApiProperty({ example: "Updated Platform Launch", required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: [ColumnUpdateInputDto], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ColumnUpdateInputDto)
  columns?: ColumnUpdateInputDto[];
}
