import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, BeforeInsert, BeforeUpdate, CreateDateColumn, ManyToOne, OneToMany} from "typeorm"
import {validateOrReject, MaxLength, IsBoolean, IsOptional} from 'class-validator';
import { getIsInvalidMessage } from "../helper/validation-messages";
import { User } from "./User";
import { Item } from "./Items";
import ExtendBaseEntity from './extend-base-entity'

@Entity()
export class Collection extends ExtendBaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    
    @Column()
    name: string;

    @Column()
    @MaxLength(255, {
        message: getIsInvalidMessage('Description')
    })
    @IsOptional()
    description: string;

    @Column()
    imageURL: string; //HOW TF DO I HANDLE THIS
    

    @Column({default: false})
    @IsOptional()
    @IsBoolean({message: 'Author Toggle'})
    hasAuthor: Boolean;

    @Column({default: false})
    @IsOptional()
    @IsBoolean({message: 'Series Toggle'})
    hasSeries: Boolean;

    @Column({default: true})
    @IsOptional()
    @IsBoolean({message: 'Public Toggle'})
    isPublic: Boolean;

    @CreateDateColumn()
    createdDate: Date;

    @ManyToOne(() => User, (user) => user.collections)
    user: User;
    //######################
    //Missing stuff for UserID FK
    //######################


    //UNCOMMENT IN A SEC
    @OneToMany(() => Item, (item) => item.collection)
    items: Item[];
    
}