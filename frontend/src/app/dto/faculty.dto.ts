export interface FacultyDto {
  id: string;
  name: string;
  shortName: string;
}

export interface FacultyCreateDto {
  name: string;
  nameShort: string;
}

export interface FacultyEditDto {
  id: string;
  name: string;
  nameShort: string;
}
