import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class ChangeStockOnHandDto {
  @ApiProperty({
    description: 'Pocet kusu produktu na sklade',
  })
  @IsInt()
  @Min(0)
  newStockOnHand: number;
}
