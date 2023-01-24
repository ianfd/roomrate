import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {RoomType} from "../dto/roomType";
import {ImageMediumType} from "../dto/ImageMediumType";
import {AccessibilityType} from "../dto/accessibilityType";
import {AudioMediumType} from "../dto/AudioMediumType";
import {ConferenceSystemType} from "../dto/ConferenceSystemType";
import {ConstructionEffortType} from "../dto/constructionEffortType";
import {TechnicalEffortType} from "../dto/technicalEffortType";

@Entity({name: "rooms"})
export class RoomEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name: "building_id", type: "varchar", length: 256, unique: false, nullable: false})
    buildingId: string;

    @Column({name: "name", type: "varchar", length: 256, unique: true, nullable: false})
    name: string;

    @Column({name: "name_extension", type: "varchar", length: 512, nullable: true, unique: false})
    nameExtension?: string;

    @Column({name: "type", enum: RoomType, default: RoomType.NONE})
    type: RoomType;

    @Column({name: "accessible", type: "enum", enum: AccessibilityType, default: AccessibilityType.NONE, nullable: false})
    accessible: AccessibilityType;

    @Column({name: "utilization", type: "decimal", default: 0.0, nullable: false})
    utilization: number;

    @Column({name: "capacity", type: "decimal", default: 0.0, nullable: false})
    capacity: number;

    @Column({name: "image_medium", type: "enum", enum: ImageMediumType, default: ImageMediumType.NONE, nullable: false})
    imageMedium: ImageMediumType;

    @Column({name: "audio_medium", type: "enum", enum: AudioMediumType, default: AudioMediumType.NONE, nullable: false})
    audioMedium: AudioMediumType;

    @Column({name: "conference_system", type: "enum", enum: ConferenceSystemType, default: ConferenceSystemType.NONE, nullable: false})
    conferenceSystem: ConferenceSystemType;

    @Column({name: "construction_effort", type: "enum", enum: ConstructionEffortType, default: ConstructionEffortType.NONE, nullable: false})
    constructionEffort: ConstructionEffortType;

    @Column({name: "technical_effort", type: "enum", enum: TechnicalEffortType, default: TechnicalEffortType.NONE, nullable: false})
    technicalEffort: TechnicalEffortType;

    @Column({name: "usage_time", type: "numeric", default: 0, nullable: false})
    usageTime: number;

    @Column({name: "computed_score", type: "decimal", default: -1, nullable: false})
    computedScore: number;
}
