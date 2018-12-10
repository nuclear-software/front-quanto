import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm/browser";
import Account from './Account';
import Company from './Company';

@Entity()
export default class CompanyTable extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    identifier: string;

    @OneToMany(type => Account, account => account.companyTable)
    accounts: Account[];

    @ManyToOne(type => Company, company => company.companyTables)
    company: Company;

    // constructor(name: string, description: string) {
    //     super();
    //     this.name = name;
    //     this.description = description;
    // }

}