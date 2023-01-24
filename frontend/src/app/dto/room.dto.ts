export interface RoomDto {
  id: string;
  buildingId: string;
  name: string;
  nameExtension?: string;
  type: RoomType;
  accessible: AccessibilityType;
  utilization: number; // Value smaller than 1
  capacity: number;
  imageMedium: ImageMediumType;
  audioMedium: AudioMediumType;
  conferenceSystem: ConferenceSystemType;
  constructionEffort: ConstructionEffortType;
  technicalEffort: TechnicalEffortType;
  usageTime: number;
  computedScore: number; // is -1 when the score isn't already computed

}

export enum RoomType {
  OFFICE = 'OFFICE',
  ADMINISTRATION = 'ADMINISTRATION',
  LIBRARY = 'LIBRARY',
  SEMINAR = 'SEMINAR',
  STUDY = 'STUDY',
  LECTURE_HALL = 'LECTURE_HALL',
  FACILITY_MANAGEMENT = 'FACILITY_MANAGEMENT',
  EMERGENCY = 'EMERGENCY',
  TOILET = 'TOILET',
  SERVER_ROOM = 'SERVER_ROOM',
  STORAGE = 'STORAGE',
  MISCELLANEOUS = 'MISCELLANEOUS',
  COMPUTER = 'COMPUTER',
  LAB = 'LAB',
  NONE = 'NONE'
}

export enum AccessibilityType {
  NONE = 'NONE',
  PARTIALLY = 'PARTIALLY',
  FULLY = 'FULLY'
}

export enum ImageMediumType {
  NONE = 'NONE',
  MONITOR = 'MONITOR',
  BEAMER = 'BEAMER'
}

export enum AudioMediumType {
  NONE = 'NONE',
  SPEAKERS = 'SPEAKERS',
  MICROPHONE = 'MICROPHONE',
  SPEAKERS_MICROPHONE = 'SPEAKERS_MICROPHONE'
}

export enum ConferenceSystemType {
  NONE = 'NONE',
  EXISTENT = 'EXISTENT'
}

export enum ConstructionEffortType {
  NONE = 'NONE',
  MINIMAL = 'MINIMAL',
  MEDIUM = 'MEDIUM',
  EXPENSIVE = 'EXPENSIVE',
  VERY_EXPENSIVE = 'VERY_EXPENSIVE'
}

export enum TechnicalEffortType {
  NONE = 'NONE',
  MINIMAL = 'MINIMAL',
  MEDIUM = 'MEDIUM',
  EXPENSIVE = 'EXPENSIVE',
  VERY_EXPENSIVE = 'VERY_EXPENSIVE'
}

export interface RoomCreateRequest {

  buildingId: string;
  name: string;
  nameExtension?: string;
  type: RoomType;
  accessible: AccessibilityType;
  utilization: number; // Value smaller than 1
  capacity: number;
  imageMedium: ImageMediumType;
  audioMedium: AudioMediumType;
  conferenceSystem: ConferenceSystemType;
  constructionEffort: ConstructionEffortType;
  technicalEffort: TechnicalEffortType;
  usageTime: number;

}
