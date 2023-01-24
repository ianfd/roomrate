import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "accounts"})
export class AccountEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name: "email", type: "varchar", length: 256, nullable: false, unique: true})
    email: string;

    @Column({name: "username", type: "varchar", length: 256, nullable: false, unique: true})
    username: string;

    @Column({name: "password", type: "varchar", length: 1024, nullable: false})
    password: string;

    @CreateDateColumn({name: "create_date", type: "timestamp"})
    createDate: Date;

    @Column({name: "last_login_date", type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    lastLoginDate: Date;

}
