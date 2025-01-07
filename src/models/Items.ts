import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, RelationId} from "typeorm"
import {MaxLength, IsOptional} from 'class-validator';
import { getIsInvalidMessage } from "../helper/validation-messages";
import { Collection } from "./Collections";
import ExtendBaseEntity from './extend-base-entity'

@Entity()
export class Item extends ExtendBaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    //######################
    //Missing stuff for UserID FK
    //######################

    @Column()
    name: string;

    @Column()
    @MaxLength(255, {
        message: getIsInvalidMessage('Description')
    })
    @IsOptional()
    description: string;

    @Column({nullable: true})
    @IsOptional()
    imageURL: string; //HOW TF DO I HANDLE THIS
    
    @Column({nullable: true})
    @IsOptional()
    imageUID: string

    @Column({nullable: true})
    @IsOptional()
    author: string;

    
    @Column({nullable: true})
    @IsOptional()
    series: string; 

    @CreateDateColumn()
    createdDate: Date;



    @ManyToOne(() => Collection, (collection) => collection.items, {
        onDelete: 'CASCADE'
    })
    collection: Collection;

    @RelationId((item: Item) => item.collection)
    collectionId: number
    
}
