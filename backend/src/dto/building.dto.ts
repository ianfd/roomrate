import {BuildingType} from "./buildingType";

export interface BuildingDto {
    id: string;
    facultyId: string;
    name: string;
    nameExtension?: string;
    buildingType: BuildingType;
}
