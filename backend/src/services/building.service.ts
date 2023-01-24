import {BadRequestException, Injectable} from "@nestjs/common";
import {BuildingDto} from "../dto/building.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {BuildingEntity} from "../db/building.entity";
import {Repository} from "typeorm";
import {Utils} from "../utils";
import {BuildingCreateRequest} from "../dto/buildingCreate.dto";
import {FacultyService} from "./faculty.service";

@Injectable()
export class BuildingService {

    constructor(@InjectRepository(BuildingEntity) private repo: Repository<BuildingEntity>,
                private facultyService: FacultyService) {
    }

    public async getAll(): Promise<BuildingDto[]> {
        let r: BuildingDto[] = [];
        let res = await this.repo.find();
        for (const b of res) {
            r.push({
                id: b.id,
                name: b.name,
                nameExtension: b.nameExtension,
                buildingType: b.buildingType,
                facultyId: b.facultyId
            });
        }
        return r;
    }

    public async getByFaculty(facultyId: string): Promise<BuildingDto[]> {
        let r: BuildingDto[] = [];
        let res = await this.repo.findBy({facultyId: facultyId});
        for (const b of res) {
            r.push({
                id: b.id,
                name: b.name,
                nameExtension: b.nameExtension,
                buildingType: b.buildingType,
                facultyId: b.facultyId
            });
        }
        return r;
    }

    public async getById(id: string): Promise<BuildingDto | undefined> {
        if (!Utils.isUUID(id)) {
            throw new BadRequestException({desc: "Faulty request, invalid format."});
        }
        return await this.repo.findOneBy({id: id});
    }

    public async existsByName(name: string): Promise<boolean> {
        name = name.replace(" ", ""); // replacing all white spaces
        return (await this.repo.countBy({name: name.toUpperCase()})) == 1;
    }

    public async existsById(id: string): Promise<boolean> {
        if (!Utils.isUUID(id)) return false;
        return (await this.repo.countBy({id: id})) == 1;
    }

    public async create(create: BuildingCreateRequest): Promise<void> {
        if (!Utils.isUUID(create.facultyId)) {
            throw new BadRequestException({desc: "Faculty request, invalid format."});
        }

        if (!await this.facultyService.existsById(create.facultyId)) {
            throw new BadRequestException({desc: "Faculty doesn't exist, invalid request."});
        }

        create.name = create.name.replace(" ", "").toUpperCase(); // replacing all white spaces
        if (await this.existsByName(create.name)) {
            throw new BadRequestException({desc: "A building with that name already exists, invalid request."})
        }

        let j = new BuildingEntity();
        j.name = create.name;
        if (create.nameExtension) {
            j.nameExtension = create.nameExtension;
        }
        j.facultyId = create.facultyId;
        j.buildingType = create.buildingType;
        await this.repo.save(j);
    }

    public async delete(id: string): Promise<void> {
        if (!Utils.isUUID(id)) {
            throw new BadRequestException({desc: "Building id false format, invalid request."})
        }

        if (await this.existsById(id)) {
            await this.repo.delete({id: id}); // deleting when there is one
        }
    }

}
