import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, Double} from "typeorm/browser";
import Company from './Company';
import Product from './Product';
import AccountComponent from './AccountComponent';

@Entity()
export default class ProductReference extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    quantity: number;

    @ManyToOne(type => Product, product => product.productReferences)
    product: Product;

    @ManyToOne(type => AccountComponent, accountComponent => accountComponent.productReferences)
    accountComponent: AccountComponent;

    // constructor(name: string, description: string) {
    //     super();
    //     this.name = name;
    //     this.description = description;
    // }

}