import {BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne} from "typeorm/browser";
import CompanyTable from './CompanyTable';
import ProductReference from './ProductReference';

@Entity()
export default class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(type => CompanyTable, companyTable => companyTable.accounts)
    companyTable: CompanyTable;

    @OneToMany(type => ProductReference, productReference => productReference.account)
    productReferences: ProductReference[];
}