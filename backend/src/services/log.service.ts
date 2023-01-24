import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {InternalLogEntity} from "../db/internalLogEntity";
import {Repository} from "typeorm";
import {LogType} from "../dto/logType";
import {InternalLogDto} from "../dto/InternalLog.dto";

@Injectable()
export class LogService {

    constructor(@InjectRepository(InternalLogEntity) private repo: Repository<InternalLogEntity>) {
    }

    public async logMessage(sender: string, level: LogType, message: string): Promise<void> {
        const l = new InternalLogEntity();
        l.sender = sender;
        l.level = level;
        l.message = message;
        await this.repo.save(l);
    }

    public async getLatest(limit: number, page: number): Promise<InternalLogDto[]> {
        let r: InternalLogDto[] = [];
        let res = await this.repo.find({order: {createDate: "DESC"}, take: limit, skip: (limit * page)});
        for (const l of res) {
            r.push({
                id: l.id,
                level: l.level,
                message: l.message,
                sender: l.sender,
                date: l.createDate.getDate()
            })
        }
        return r;
    }

    public async countLatest(): Promise<number> {
        return this.repo.count();
    }



}
