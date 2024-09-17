import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { ChangeAvailabilityDto } from './dto/change-availability.dto';
import { ChangeStockOnHandDto } from './dto/change-stock-on-hand.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(name: string, stockOnHandOver: number) {
    const nameLike = `%${name}%`;

    //TODO: use experimental TypedRawQuery in prisma or use a validator to ensure type safety
    return this.prismaService.$queryRaw`
      WITH product_prices AS (
        SELECT
          product_id,
          price,
          created_at,
          ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY created_at DESC) AS price_order
        FROM product_price
      )
      SELECT
        p.id,
        p.name,
        psl.stock_on_hand AS "stockOnHand",
        cpp.price AS "currentPrice",
        ppp.price AS "previousPrice",
        cpp.created_at AS "lastPriceChange"
      FROM product p
      LEFT JOIN product_prices cpp ON p.id = cpp.product_id AND cpp.price_order = 1
      LEFT JOIN product_prices ppp ON p.id = ppp.product_id AND ppp.price_order = 2
      LEFT JOIN product_stock_level psl ON p.id = psl.product_id
      WHERE p.is_available = true AND psl.stock_on_hand > ${stockOnHandOver} AND p.name like ${nameLike};
    `;
  }

  async createProduct({
    price,
    stockOnHand,
    productAvailable,
    ...createProductDto
  }: CreateProductDto) {
    await this.prismaService.product.create({
      data: {
        ...createProductDto,
        productPrice: {
          create: { price },
        },
        productStockLevel: {
          create: { stockOnHand },
        },
        isAvailable: productAvailable,
      },
    });

    return true;
  }

  async updatePrice(productId: number, { newPrice }: UpdatePriceDto) {
    await this.prismaService.productPrice.create({
      data: {
        price: newPrice,
        productId,
      },
    });

    return true;
  }

  async changeAvailability(id: number, { isAvailable }: ChangeAvailabilityDto) {
    await this.prismaService.product.update({
      where: { id },
      data: { isAvailable },
    });

    return true;
  }

  async changeStockOnHand(
    productId: number,
    { newStockOnHand }: ChangeStockOnHandDto,
  ) {
    await this.prismaService.productStockLevel.update({
      where: { productId },
      data: { stockOnHand: newStockOnHand },
    });

    return true;
  }
}
