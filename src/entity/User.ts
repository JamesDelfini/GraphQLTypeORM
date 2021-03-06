import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  email: string;

  @Column({ type: "boolean", default: true })
  confirmed: boolean;

  @Column({ type: "varchar", length: "230" })
  firstName: string;

  @Column("text")
  lastName: string;

  @Column()
  age: number;
}
