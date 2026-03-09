import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { Item } from './entities/item.entity';
import { CreateOrderDto } from './dto/create-order.dto';

/**
 * Service responsável pelas regras de negócio relacionadas aos pedidos.
 * Aqui ocorre a transformação (mapping) do payload recebido pela API
 * para o modelo persistido no banco de dados.
 */

@Injectable()
export class OrderService {
    constructor(
        // Repositório responsável pelas operações da tabela de pedidos
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        // Repositório responsável pelos itens do pedido
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
    ) { }

    async createOrder(dto: CreateOrderDto) {

        // Realiza o mapping entre o formato recebido pela API
        // e o formato utilizado internamente pela aplicação
        const order = this.orderRepository.create({
            orderId: dto.numeroPedido.split('-')[0],
            value: dto.valorTotal,
            creationDate: new Date(dto.dataCriacao),
        });

        await this.orderRepository.save(order);

        const items = dto.items.map((item) => {
            return this.itemRepository.create({
                productId: Number(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorItem,
                order: order,
            });
        });

        await this.itemRepository.save(items);

        return order;
    }

    // Busca um pedido pelo orderId e retorna também seus itens
    async findByOrderId(orderId: string) {
        const order = await this.orderRepository.findOne({
            where: { orderId },
            relations: ['items'],
        });

        if (!order) {
            throw new NotFoundException('Pedido não encontrado');
        }

        return order;
    }

    async findAll() {
        return this.orderRepository.find({
            relations: ['items'],
        });
    }

    async updateOrder(orderId: string, dto: CreateOrderDto) {
        const order = await this.orderRepository.findOne({
            where: { orderId },
            relations: ['items'],
        });

        if (!order) {
            throw new NotFoundException('Pedido não encontrado');
        }

        order.value = dto.valorTotal;
        order.creationDate = new Date(dto.dataCriacao);

        await this.orderRepository.save(order);

        return order;
    }

    async deleteOrder(orderId: string) {
        const order = await this.orderRepository.findOne({
            where: { orderId },
        });

        if (!order) {
            throw new NotFoundException('Pedido não encontrado');
        }

        await this.orderRepository.remove(order);

        return { message: 'Pedido deletado com sucesso' };
    }
}