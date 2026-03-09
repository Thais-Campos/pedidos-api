import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }

  @Get('list')
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':orderId')
  findOne(@Param('orderId') orderId: string) {
    return this.orderService.findByOrderId(orderId);
  }

  @Put(':orderId')
  update(@Param('orderId') orderId: string, @Body() dto: CreateOrderDto) {
    return this.orderService.updateOrder(orderId, dto);
  }

  @Delete(':orderId')
  delete(@Param('orderId') orderId: string) {
    return this.orderService.deleteOrder(orderId);
  }

}