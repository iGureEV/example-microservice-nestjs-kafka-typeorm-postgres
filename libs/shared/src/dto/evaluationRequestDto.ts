import { IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { EOperation } from '../consts';

export class EvaluationRequestDto {
  @ApiProperty()
  @IsNumber()
  public a: number;

  @ApiProperty()
  @IsNumber()
  public b: number;

  @ApiProperty()
  @IsEnum(EOperation)
  public op: EOperation;
}
