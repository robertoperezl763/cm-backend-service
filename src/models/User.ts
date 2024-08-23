import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, BeforeInsert, BeforeUpdate, AfterLoad, OneToMany } from "typeorm"
import {IsInt, Length, IsEmail, IsDate, Matches, validateOrReject} from 'class-validator';
import { getIsInvalidMessage } from "../helper/validation-messages";
import * as bcrypt from 'bcrypt';
import { Collection } from "./Collections";
import ExtendBaseEntity from './extend-base-entity'

@Entity()
@Unique(["email"])
export class User extends ExtendBaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail(undefined, {
        message: getIsInvalidMessage('Email')
    })
    email: string;

    @Column()
    @Length(1, 50)
    lastName: string;

    @Column()
    @Length(1, 50)
    firstName: string;
    

    @Column()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: `${getIsInvalidMessage('Password')}. Use a password with at least 8 symbols, including letters and digits`
    })
    password: string;



    @OneToMany(() => Collection, (collection) => collection.user)
    collections: Collection[];



    //this property stores a cached password used to check
    //if the password was changed during an update
    cachedPassword: string;

    @AfterLoad()
    cachePassword() {
        this.cachedPassword = this.password;
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.cachedPassword === this.password) return;
        const salt =  await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);

    }   

    async isPasswordValid(inputPassword: string): Promise<boolean> {
        return await bcrypt.compare(inputPassword, this.password);
    }
}
