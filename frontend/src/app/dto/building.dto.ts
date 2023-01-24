export interface BuildingDto {
  id: string;
  facultyId: string;
  name: string;
  nameExtension?: string;
  buildingType: BuildingType;
}

export enum BuildingType {
  ADMINISTRATION = 'ADMINISTRATION',
  LIBRARY = 'LIBRARY',
  LECTURE = 'LECTURE',
  RESIDENCE = 'RESIDENCE',
  RESEARCH = 'RESEARCH',
  OFFICES = 'OFFICES',
  DINING = 'DINING',
  SPORTS = 'SPORTS',
  FIRST_AID = 'FIRST_AID',
  PARKING = 'PARKING',
  POST_OFFICE = 'POST_OFFICE',
  WASTE = 'WASTE',
  MISCELLANEOUS = 'MISCELLANEOUS',
  OTHER = 'OTHER',
  NONE = 'NONE'
}

export interface BuildingCreateRequest {
  facultyId: string;
  name: string;
  nameExtension?: string;
  buildingType: BuildingType;
}
