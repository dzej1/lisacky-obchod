import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  stockOnHand: number;

  @ApiProperty()
  currentPrice: number;

  @ApiPropertyOptional()
  previousPrice: number | null;

  @ApiProperty()
  lastPriceChange: string;
}
