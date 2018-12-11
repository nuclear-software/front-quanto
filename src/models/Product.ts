import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm/browser";
import Company from './Company';
import ProductReference from './ProductReference';

@Entity()
export default class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    price: number;

    @ManyToOne(type => Company, company => company.products)
    company: Company;

    @OneToMany(type => ProductReference, productReference => productReference.product)
    productReferences: ProductReference[];
}