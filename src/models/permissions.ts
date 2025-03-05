import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import ExtendBaseEntity from "./extend-base-entity";
import { User } from "./User";


@Entity()
@Unique(['name'])
export class Permission extends ExtendBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => User, (user) => user.permission)
    user: User[]
}