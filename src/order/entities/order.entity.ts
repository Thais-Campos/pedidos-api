import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity('orders')
export class Order {
  @PrimaryColumn()
  orderId!: string;

  @Column('decimal')
  value!: number;

  @Column()
  creationDate!: Date;

  @OneToMany(() => Item, (item) => item.order, { cascade: true })
  items!: Item[];
}