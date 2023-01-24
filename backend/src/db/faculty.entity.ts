import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "faculties"})
export class FacultyEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name: "name", type: "varchar", length: 512, nullable: false, unique: true})
    name: string;

    @Column({name: "short_name", type: "varchar", length: 32, nullable: false, unique: true})
    shortName: string;

}
