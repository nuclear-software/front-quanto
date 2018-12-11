import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, Double} from "typeorm/browser";
import Product from './Product';
import Account from './Account';

@Entity()
export default class ProductReference extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    quantity: number;

    @ManyToOne(type => Product, product => product.productReferences)
    product: Product;

    @ManyToOne(type => Account, account => account.productReferences, { onDelete: 'CASCADE' })
    account: Account;

}