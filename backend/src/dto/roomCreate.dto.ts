import {RoomType} from "./roomType";
import {AccessibilityType} from "./accessibilityType";
import {ImageMediumType} from "./ImageMediumType";
import {AudioMediumType} from "./AudioMediumType";
import {ConferenceSystemType} from "./ConferenceSystemType";
import {ConstructionEffortType} from "./constructionEffortType";
import {TechnicalEffortType} from "./technicalEffortType";

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
