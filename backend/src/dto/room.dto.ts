import {RoomType} from "./roomType";
import {AccessibilityType} from "./accessibilityType";
import {AudioMediumType} from "./AudioMediumType";
import {ConferenceSystemType} from "./ConferenceSystemType";
import {ConstructionEffortType} from "./constructionEffortType";
import {ImageMediumType} from "./ImageMediumType";
import {TechnicalEffortType} from "./technicalEffortType";

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
