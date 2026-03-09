import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateItemDto } from './create-item.dto';

/**
 * DTO responsável por validar os dados recebidos
 * na criação de um pedido.
 * Garante que o payload enviado para a API
 * esteja no formato esperado antes de processar.
 */

export class CreateOrderDto {
  @IsString()
  numeroPedido!: string;

  @IsNumber()
  valorTotal!: number;

  @IsDateString()
  dataCriacao!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemDto)
  items!: CreateItemDto[];
}