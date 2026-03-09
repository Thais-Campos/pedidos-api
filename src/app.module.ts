import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { Item } from './order/entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'pedidos_api',
      entities: [Order, Item],
      synchronize: true,
    }),
    OrderModule,
  ],
})
export class AppModule {}