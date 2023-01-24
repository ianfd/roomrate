import {BadRequestException, Injectable} from "@nestjs/common";
import {BuildingService} from "./building.service";
import {RoomDto} from "../dto/room.dto";
import {Utils} from "../utils";
import {FacultyService} from "./faculty.service";
import {InjectRepository} from "@nestjs/typeorm";
import {RoomEntity} from "../db/room.entity";
import {Repository} from "typeorm";
import {RoomCreateRequest} from "../dto/roomCreate.dto";
import {AudioMediumType} from "../dto/AudioMediumType";
import {RoomType} from "../dto/roomType";
import {ImageMediumType} from "../dto/ImageMediumType";
import {ConstructionEffortType} from "../dto/constructionEffortType";
import {ConferenceSystemType} from "../dto/ConferenceSystemType";
import {AccessibilityType} from "../dto/accessibilityType";
import {TechnicalEffortType} from "../dto/technicalEffortType";

@Injectable()
export class RoomService {

    constructor(private buildingService: BuildingService,
                private facultyService: FacultyService,
                @InjectRepository(RoomEntity) private repo: Repository<RoomEntity>) {
    }

    public async getAll(limit: number, page: number): Promise<RoomDto[]> {
        let rooms = await this.repo.find({take: limit, skip: limit * page, order: {computedScore: "DESC"}});
        return this.arrayToDto(rooms);
    }

    public async countAll(): Promise<number> {
        return this.repo.count();
    }

    public async delete(id: string): Promise<void> {
        if (!Utils.isUUID(id)) {
            throw new BadRequestException({desc: "Room invalid, request denied."});
        }
        await this.repo.delete({id: id});
    }

    public async getByBuilding(id: string, limit: number, page: number): Promise<RoomDto[]> {
        if (!Utils.isUUID(id)) {
            throw new BadRequestException({desc: "Building invalid, request denied."})
        }

        if (!await this.buildingService.existsById(id)) {
            throw new BadRequestException({desc: "Building not found, request denied."})
        }

        let rooms = await this.repo.find({where: {buildingId: id}, take: limit, skip: limit * page});
        return this.arrayToDto(rooms);
    }

    public async countByBuilding(id: string): Promise<number> {
        if (!Utils.isUUID(id)) {
            throw new BadRequestException({desc: "Building invalid, request denied."});
        }
        return this.repo.countBy({buildingId: id});
    }

    public async existsByName(name: string): Promise<boolean> {
        name = name.replace(" ", "").toUpperCase();
        return (await this.repo.countBy({name: name})) == 1;
    }


    public async create(create: RoomCreateRequest): Promise<void> {
        if (!Utils.isUUID(create.buildingId)) {
            throw new BadRequestException({desc: "Building invalid, request denied."});
        }
        if (!await this.buildingService.existsById(create.buildingId)) {
            throw new BadRequestException({desc: "Building not existing, request denied."});
        }
        if (await this.existsByName(create.name)) {
            throw new BadRequestException({desc: "Name already exists, request denied."});
        }
        if (Math.abs(create.capacity) > 1) create.capacity = 1.0 / Math.abs(create.capacity); // prevent that value is bigger than 1 or smaller than 0
        if (Math.abs(create.utilization) > 1) create.utilization = 1.0 / Math.abs(create.utilization); // prevent that value is bigger than 1 or smaller than 0
        if (Math.abs(create.usageTime) > 1) create.usageTime = 1.0 / Math.abs(create.usageTime); // prevent that value is bigger than 1 or smaller than 0
        let s = new RoomEntity();
        s.name = create.name.replace(" ", "").toUpperCase();
        s.audioMedium = create.audioMedium ?? AudioMediumType.NONE;
        s.utilization = create.utilization || 0.0;
        s.capacity = create.capacity || 0.0;
        s.type = create.type ?? RoomType.NONE;
        s.usageTime = create.usageTime || 0.0;
        s.imageMedium = create.imageMedium ?? ImageMediumType.NONE;
        s.constructionEffort = create.constructionEffort ?? ConstructionEffortType.NONE;
        s.technicalEffort = create.technicalEffort ?? TechnicalEffortType.NONE;
        if (create.nameExtension) s.nameExtension = create.nameExtension;
        s.conferenceSystem = create.conferenceSystem ?? ConferenceSystemType.NONE;
        s.accessible = create.accessible ?? AccessibilityType.NONE;
        s.buildingId = create.buildingId;
        s.computedScore = await this.calculatePoints(this.toDto(s));
        await this.repo.save(s);
    }

    private toDto(room: RoomEntity): RoomDto {
        return {
            id: room.id,
            name: room.name,
            buildingId: room.buildingId,
            type: room.type,
            accessible: room.accessible,
            computedScore: room.computedScore,
            conferenceSystem: room.conferenceSystem,
            nameExtension: room.nameExtension,
            constructionEffort: room.constructionEffort,
            technicalEffort: room.technicalEffort,
            audioMedium: room.audioMedium,
            imageMedium: room.imageMedium,
            usageTime: room.usageTime,
            utilization: room.utilization,
            capacity: room.capacity
        };
    }

    private arrayToDto(rooms: RoomEntity[]): RoomDto[] {
        let r: RoomDto[] = [];
        for (const room of rooms) {
            r.push(this.toDto(room));
        }
        return r;
    }

    public async getMaxPoints(): Promise<number> {
        let r = await this.repo.find({order: {computedScore: "DESC"}, take: 1});
        if (r && r.length == 1) {
            return r[0].computedScore;
        }
        return 1; // if there is no score computed yet
    }

    public async getMinPoints(): Promise<number> {
        let r = await this.repo.find({order: {computedScore: "ASC"}, take: 2});
        if (r && r.length > 1) {
            return r[0].computedScore;
        }
        return 0; // if there is no score computed yet
    }

    private async calculatePoints(room: RoomDto): Promise<number> {
        let accessP = Utils.accessibilityPoints(room.accessible ?? AccessibilityType.NONE);
        let roomP = Utils.capUtlPoints(room.capacity || 0.0, room.utilization || 0.0);
        let techP = Utils.technicalPoints(room.conferenceSystem ?? ConferenceSystemType.NONE, room.audioMedium ?? AudioMediumType.NONE, room.imageMedium ?? ImageMediumType.NONE);
        let effortP = Utils.effortPoints(room.technicalEffort ?? TechnicalEffortType.NONE, room.constructionEffort ?? ConstructionEffortType.NONE);
        let maxPoints = await this.getMaxPoints();
        let minPoints = await this.getMinPoints();
        if (maxPoints == minPoints) { // happens when there is only one room with a score
            minPoints = 0; // so that we have the max for our cap (TBE)
        }
        return (accessP * (roomP + techP + 0.75 * effortP + 0.5 * room.usageTime) - minPoints) / (maxPoints - minPoints);

    }
}
