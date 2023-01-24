import {AccessibilityType} from "./dto/accessibilityType";
import {TechnicalEffortType} from "./dto/technicalEffortType";
import {ConstructionEffortType} from "./dto/constructionEffortType";
import {ConferenceSystemType} from "./dto/ConferenceSystemType";
import {AudioMediumType} from "./dto/AudioMediumType";
import {ImageMediumType} from "./dto/ImageMediumType";

export class Utils {

    public static isEmail(email: string): boolean {
        let r = new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$')
        return r.test(email);
    }

    public static isBlank(str: string): boolean {
        let s = str.replace(" ", "")
        return s.length == 0;
    }

    public static containsSpecialCharacters(str: string): boolean {
        let r = new RegExp('/[`!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/?~]/');
        return r.test(str);
    }

    public static containsWhitespace(str: string): boolean {
        return str.includes(" ");
    }

    public static isUUID(str: string): boolean {
        const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
        return regexExp.test(str);
    }

    public static generateRandomString(length: number) {
        let result: string = '';
        const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength: number = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    public static accessibilityPoints(accessibility: AccessibilityType): number {
        switch (accessibility) {
            case AccessibilityType.NONE:
                return 0;
            case AccessibilityType.FULLY:
                return 1;
            case AccessibilityType.PARTIALLY:
                return 0.5;
        }
    }

    public static usageTimePoints(usageTime: number): number {
        return 0.5 * usageTime;
    }

    public static techEffortPoints(techEffort: TechnicalEffortType): number {
        switch (techEffort) {
            case TechnicalEffortType.NONE:
                return 1.0;
            case TechnicalEffortType.MINIMAL:
                return 0.75;
            case TechnicalEffortType.MEDIUM:
                return 0.5;
            case TechnicalEffortType.EXPENSIVE:
                return 0.25;
            case TechnicalEffortType.VERY_EXPENSIVE:
                return 0.0;
        }
    }

    public static constructionEffortPoints(constructionEffort: ConstructionEffortType): number {
        switch (constructionEffort) {
            case ConstructionEffortType.NONE:
                return 1.0;
            case ConstructionEffortType.MINIMAL:
                return 0.75;
            case ConstructionEffortType.MEDIUM:
                return 0.5;
            case ConstructionEffortType.EXPENSIVE:
                return 0.25;
            case ConstructionEffortType.VERY_EXPENSIVE:
                return 0.0;
        }
    }

    public static effortPoints(techEffort: TechnicalEffortType, constructionEffort: ConstructionEffortType): number {
        let techE = Utils.techEffortPoints(techEffort);
        let consE = Utils.constructionEffortPoints(constructionEffort);
        return (0.75 * ((techE + consE) / 2));
    }

    public static conferencePoints(conferenceSystem: ConferenceSystemType): number {
        switch (conferenceSystem) {
            case ConferenceSystemType.NONE:
                return 1.0;
            case ConferenceSystemType.EXISTENT:
                return 0.0;
        }
    }

    public static audioPoints(audioMedium: AudioMediumType): number {
        switch (audioMedium) {
            case AudioMediumType.NONE:
                return 1.0;
            case AudioMediumType.MICROPHONE:
                return 0.5;
            case AudioMediumType.SPEAKERS:
                return 0.5;
            case AudioMediumType.SPEAKERS_MICROPHONE:
                return 0.0;
        }
    }

    public static imagePoints(imageMedium: ImageMediumType): number {
        switch (imageMedium) {
            case ImageMediumType.NONE:
                return 1.0;
            case ImageMediumType.MONITOR:
                return 0.0;
            case ImageMediumType.BEAMER:
                return 0.0;
        }
    }

    public static technicalPoints(conferenceSystem: ConferenceSystemType,
                                  audioMedium: AudioMediumType,
                                  imageMedium: ImageMediumType) {

        let conference = Utils.conferencePoints(conferenceSystem);
        let audio = Utils.audioPoints(audioMedium);
        let image = Utils.imagePoints(imageMedium);
        return (conference + audio + image) / 3;
    }

    public static capUtlPoints(capacity: number, utilization: number): number {
        return capacity * utilization;
    }






}
