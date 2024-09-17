import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { ChangeAvailabilityDto } from './dto/change-availability.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ChangeStockOnHandDto } from './dto/change-stock-on-hand.dto';
import { Product } from './entity/product.entity';

@Controller('product')
@ApiTags('obchod')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiQuery({ required: false, name: 'name' })
  @ApiQuery({ required: false, name: 'stockOnHandOver' })
  @ApiOkResponse({
    description: 'Seznam produktu',
    type: [Product],
  })
  @ApiBadRequestResponse({
    description: 'Neplatny vstup.',
  })
  findAll(
    @Query('name') name = '',
    @Query('stockOnHandOver', new DefaultValuePipe(-1), ParseIntPipe)
    stockOnHandOver: number,
  ) {
    return this.productService.findAll(name, stockOnHandOver);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Produkt byl pridan.',
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: 'Neplatny vstup.',
  })
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Put(':id/update-price')
  @ApiOkResponse({
    description: 'Cena produktu byla upravena.',
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: 'Neplatny vstup.',
  })
  updatePrice(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePriceDto: UpdatePriceDto,
  ) {
    return this.productService.updatePrice(id, updatePriceDto);
  }

  @Put(':id/change-availability')
  @ApiOkResponse({
    description: 'Dostupnost produktu byla zmenena.',
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: 'Neplatny vstup.',
  })
  changeAvailability(
    @Param('id', ParseIntPipe) id: number,
    @Body() changeAvailabilityDto: ChangeAvailabilityDto,
  ) {
    return this.productService.changeAvailability(id, changeAvailabilityDto);
  }

  @Put(':id/change-stock-on-hand')
  @ApiOkResponse({
    description: 'Mnozstvi produktu na sklade bylo zmeneno.',
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: 'Neplatny vstup.',
  })
  changeStockOnHand(
    @Param('id', ParseIntPipe) id: number,
    @Body() changeAvailabilityDto: ChangeStockOnHandDto,
  ) {
    return this.productService.changeStockOnHand(id, changeAvailabilityDto);
  }
}
