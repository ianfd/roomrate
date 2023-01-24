import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AccountEntity} from "./db/account.entity";
import {BuildingEntity} from "./db/building.entity";
import {FacultyEntity} from "./db/faculty.entity";
import {InternalLogEntity} from "./db/internalLogEntity";
import {RoomEntity} from "./db/room.entity";
import {ConfigModule} from "@nestjs/config";
import {FacultyService} from "./services/faculty.service";
import {LogService} from "./services/log.service";
import {RoomService} from "./services/room.service";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from "./services/auth/auth.service";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {AuthController} from "./controller/auth.controller";
import {FacultyController} from "./controller/faculty.controller";
import {BuildingController} from "./controller/building.controller";
import {RoomController} from "./controller/room.controller";
import {BuildingService} from "./services/building.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `env/${process.env.NODE_ENV}.env`
        }),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '1d'}
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT) || 5432,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [AccountEntity, BuildingEntity, FacultyEntity, InternalLogEntity, RoomEntity],
            ssl: false,
            migrationsTableName: "migrations",
            synchronize: true
        }),
        TypeOrmModule.forFeature([AccountEntity, BuildingEntity, FacultyEntity, InternalLogEntity, RoomEntity]),
    ],
    controllers: [AuthController, FacultyController, BuildingController, RoomController],
    providers: [AppService, FacultyService, BuildingService, LogService, RoomService, AuthService, JwtStrategy],
})
export class AppModule {
}
