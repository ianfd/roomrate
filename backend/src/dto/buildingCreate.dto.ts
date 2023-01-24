import {BuildingType} from "./buildingType";

export interface BuildingCreateRequest {
    facultyId: string;
    name: string;
    nameExtension?: string;
    buildingType: BuildingType;
}
