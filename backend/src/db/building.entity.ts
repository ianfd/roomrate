import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BuildingType} from "../dto/buildingType";

@Entity({name: "buildings"})
export class BuildingEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name: "faculty_id", type: "varchar", length: 128, nullable: false, unique: false})
    facultyId: string;

    @Column({name: "name", type: "varchar", length: 256, nullable: false, unique: true})
    name: string;

    @Column({name: "name_extension", length: 512, nullable: true, unique: false})
    nameExtension?: string;

    @Column({name: "type", type: "enum", enum: BuildingType, default: BuildingType.NONE})
    buildingType: BuildingType;
}
