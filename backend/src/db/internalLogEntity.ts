import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {LogType} from "../dto/logType";

@Entity({name: "internal_logs"})
export class InternalLogEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name: "sender", type: "varchar", length: 256, default: "SYSTEM", nullable: false})
    sender: string;

    @Column({name: "level", type: "enum", enum: LogType, default: LogType.INFO})
    level: LogType;

    @Column({name: "message", type: "text"})
    message: string;

    @CreateDateColumn({name: "create_date", type: "timestamp"})
    createDate: Date;

}
