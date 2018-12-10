import {BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne} from "typeorm/browser";
import AccountComponent from './AccountComponent';
import CompanyTable from './CompanyTable';

@Entity()
export default class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(type => CompanyTable, companyTable => companyTable.accounts)
    companyTable: CompanyTable;

    @OneToMany(type => AccountComponent, accountComponent => accountComponent.account)
    accountComponents: AccountComponent[];

    // constructor(name: string, email: string, password: string, phone: string,) {
    //     super();
    //     this.name = name;
    //     this.email = email;
    //     this.password = password;
    //     this.phone = phone;
    // }

}