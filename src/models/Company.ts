import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne} from "typeorm/browser";
import Product from './Product';
import CompanyTable from './CompanyTable';

@Entity()
export default class Company extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @OneToMany(type => Product, product => product.company)
    products: Product[];

    @OneToMany(type => CompanyTable, companyTable => companyTable.company)
    companyTables: CompanyTable[];
}