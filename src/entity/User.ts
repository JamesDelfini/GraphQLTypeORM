import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "text"})
    email: string;

    @Column({type: "boolean", default: true})
    confirmed: boolean;

    @Column({type: "varchar", length: "230"})
    firstName: string;

    @Column("text")
    lastName: string;

    @Column()
    age: number;

}
