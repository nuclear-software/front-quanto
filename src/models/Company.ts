import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm/browser";
import Product from './Product';
import User from './User';
import CompanyTable from './CompanyTable';

@Entity()
export default class Company extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @ManyToOne(type => User, user => user.companies)
    user: User;

    @OneToMany(type => Product, product => product.company)
    products: Product[];

    @OneToMany(type => CompanyTable, companyTable => companyTable.company)
    companyTables: CompanyTable[];

    // constructor(name: string) {
    //     super();
    //     this.name = name;
    // }
}