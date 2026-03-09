import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { Item } from './entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Item])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}