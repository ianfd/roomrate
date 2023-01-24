import {LogType} from "./logType";

export interface InternalLogDto {
    id: string;
    sender: string;
    level: LogType;
    message: string;
    date: number;
}
