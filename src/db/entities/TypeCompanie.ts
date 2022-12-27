import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('TypeCompanies')
export default class TypeCompanie extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
