import {BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm/browser";
import Account from './Account';
import ProductReference from './ProductReference';

@Entity()
export default class AccountComponent extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(type => Account, account => account.accountComponents)
    account: Account;

    @OneToMany(type => ProductReference, productReference => productReference.accountComponent)
    productReferences: ProductReference[];

    // constructor(name: string, email: string, password: string, phone: string,) {
    //     super();
    //     this.name = name;
    //     this.email = email;
    //     this.password = password;
    //     this.phone = phone;
    // }

}