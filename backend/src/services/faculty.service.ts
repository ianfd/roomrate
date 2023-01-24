import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FacultyEntity} from "../db/faculty.entity";
import {Repository} from "typeorm";
import {FacultyDto} from "../dto/faculty.dto";
import {FacultyCreateDto} from "../dto/facultyCreate.dto";
import {FacultyEditDto} from "../dto/facultyEdit.dto";
import {Utils} from "../utils";

@Injectable()
export class FacultyService {

    constructor(@InjectRepository(FacultyEntity) private repo: Repository<FacultyEntity>) {
    }

    public async getAll(): Promise<FacultyDto[]> {
        let r: FacultyDto[] = [];
        let resp = await this.repo.find();
        for (const f of resp) {
            r.push({
                id: f.id,
                name: f.name,
                shortName: f.shortName
            })
        }
        return r;
    }

    public async create(faculty: FacultyCreateDto): Promise<void> {
        if (!faculty.name || !faculty.nameShort || faculty.nameShort.length > 15) {
            throw new BadRequestException({desc: "Unable to complete request. Some arguments are falsely formatted or missing."})
        }

        if (await this.existsByShortName(faculty.nameShort)) {
            throw new BadRequestException({desc: "Short name already exists. Please choose another one."})
        }

        const r = new FacultyEntity();
        r.shortName = faculty.nameShort.toUpperCase();
        r.name = faculty.name;
        await this.repo.save(r);
    }

    public async editFaculty(faculty: FacultyEditDto): Promise<void> {
        if (!faculty.id || !faculty.nameShort || !faculty.name) {
            throw new BadRequestException({desc: "Faulty request, please see documentation for request details."});
        }

        if (Utils.isBlank(faculty.id) || Utils.isBlank(faculty.name) || Utils.isBlank(faculty.nameShort)) {
            throw new BadRequestException({desc: "Faulty request, please see documentation for request details."});
        }

        if (!await this.existsById(faculty.id)) {
            throw new BadRequestException({desc: "Faulty request, faculty id does not exist."})
        }

        let fac = await this.repo.findOneBy({id: faculty.id});
        if (fac.shortName !== faculty.nameShort.toUpperCase() && await this.existsByShortName(faculty.nameShort)) {
            throw new BadRequestException({desc: "Faulty request, name already exists."});
        }

        fac.shortName = faculty.nameShort.toUpperCase();
        fac.name = faculty.name;
        await this.repo.save(fac);
    }

    public async existsById(id: string): Promise<boolean> {
        if (!Utils.isUUID(id)) {
            return false;
        }
        return (await this.repo.countBy({id: id})) == 1;
    }

    public async existsByShortName(shortName: string): Promise<boolean> {
        return (await this.repo.countBy({shortName: shortName.toUpperCase()})) == 1;
    }

    public async getById(id: string): Promise<FacultyDto | undefined> {
        if (!Utils.isUUID(id)) {
            return undefined;
        }
        return this.repo.findOneBy({id: id});
    }

}
