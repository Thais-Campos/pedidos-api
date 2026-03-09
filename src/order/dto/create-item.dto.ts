import { IsInt, IsNumber, IsString } from 'class-validator';

/**
 * DTO que representa cada item dentro do pedido.
 * Usado para validar os itens enviados no array "items".
 */

export class CreateItemDto {
  @IsString()
  idItem!: string;

  @IsInt()
  quantidadeItem!: number;

  @IsNumber()
  valorItem!: number;
}