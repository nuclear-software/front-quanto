import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne} from "typeorm/browser";
import Product from './Product';
import User from './User';
import CompanyTable from './CompanyTable';

@Entity()
export default class Company extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    // @OneToOne(type => User, user => user.company)
    // user: User;

    @OneToMany(type => Product, product => product.company)
    products: Product[];

    @OneToMany(type => CompanyTable, companyTable => companyTable.company)
    companyTables: CompanyTable[];

    // constructor(name: string) {
    //     super();
    //     this.name = name;
    // }
}