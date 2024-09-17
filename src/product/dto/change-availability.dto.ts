import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ChangeAvailabilityDto {
  @ApiProperty({
    description: 'Je produkt dostupny',
  })
  @IsBoolean()
  isAvailable: boolean;
}
