import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdatePriceDto {
  @ApiProperty({
    description: 'Nova cena produktu',
  })
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  newPrice: number;
}
