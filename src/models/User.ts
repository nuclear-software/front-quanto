import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm/browser";
import Product from './Product';
import Company from './Company';

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @OneToMany(type => Company, company => company.user)
    companies: Company[];

    // constructor(name: string, email: string, password: string, phone: string,) {
    //     super();
    //     this.name = name;
    //     this.email = email;
    //     this.password = password;
    //     this.phone = phone;
    // }

}