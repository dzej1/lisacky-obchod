import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nazev produktu',
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Cena produktu',
  })
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  price: number;

  @ApiProperty({
    description: 'Mnozstvi produktu na sklade',
  })
  @IsInt()
  stockOnHand: number;

  @ApiPropertyOptional({
    description: 'Je produkt dostupny?',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  productAvailable?: boolean;
}
