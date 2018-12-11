import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm/browser";
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

    @OneToOne(type => Company )
    @JoinColumn()
    company: Company;
}