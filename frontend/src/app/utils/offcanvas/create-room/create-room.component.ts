import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {BackendService} from "../../../services/backend.service";
import {Router} from "@angular/router";
import {BuildingDto} from "../../../dto/building.dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  AccessibilityType,
  AudioMediumType,
  ConferenceSystemType,
  ConstructionEffortType,
  ImageMediumType,
  RoomCreateRequest,
  RoomType,
  TechnicalEffortType
} from "../../../dto/room.dto";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  @Input() buildings: BuildingDto[] = [];

  public loading: boolean = false;
  public showSuccess: boolean = false;
  public showError: boolean = false;

  public errorMessage: string = "";

  public IroomTypes = Object.values(RoomType);
  public IaccessibilityTypes = Object.values(AccessibilityType);
  public IimageMediumTypes = Object.values(ImageMediumType);
  public IaudioMediumTypes = Object.values(AudioMediumType);
  public IconferenceSystemTypes = Object.values(ConferenceSystemType);
  public IconstructionEffortTypes = Object.values(ConstructionEffortType);
  public ItechnicalEffortTypes = Object.values(TechnicalEffortType);

  public formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.minLength(2)/*, Validators.pattern(/^\\s*$/)*/]),
    nameExtended: new FormControl('', [Validators.maxLength(31)]),
    building: new FormControl('', [Validators.required, Validators.minLength(10)]),
    type: new FormControl(RoomType.NONE, [Validators.required]),
    accessibility: new FormControl(AccessibilityType.NONE, [Validators.required]),
    utilization: new FormControl(0.2, [Validators.required]),
    capacity: new FormControl(0, [Validators.required]),
    imageMedium: new FormControl(ImageMediumType.NONE, [Validators.required]),
    audioMedium: new FormControl(AudioMediumType.NONE, [Validators.required]),
    conferenceSystem: new FormControl(ConferenceSystemType.NONE, [Validators.required]),
    constructionEffort: new FormControl(ConstructionEffortType.NONE, [Validators.required]),
    technicalEffort: new FormControl(TechnicalEffortType.NONE, [Validators.required]),
    usageTime: new FormControl(0, [Validators.required])
  })


  constructor(public activeOffcanvas: NgbActiveOffcanvas, private backend: BackendService, private router: Router) {

  }

  ngOnInit(): void {
  }

  public create(): void {
    console.log(this.buildings)
    this.loading = true;
    this.showError = false;
    this.errorMessage = "";
    let name = (this.formGroup.get("name")?.value ?? "").trim();
    let nameExtended = (this.formGroup.get("nameExtended")?.value ?? "").trim();
    let building = this.formGroup.get("building")?.value ?? "";
    let type = (<RoomType>this.formGroup.get("type")?.value) ?? RoomType.NONE;
    let accessibility = (<AccessibilityType>this.formGroup.get("accessibility")?.value) ?? AccessibilityType.NONE;
    let utilization = this.formGroup.get("utilization")?.value || 0.2;
    let capacity = this.formGroup.get("capacity")?.value || 0;
    let imageMedium = (<ImageMediumType>this.formGroup.get("imageMedium")?.value) ?? ImageMediumType.NONE;
    let audioMedium = (<AudioMediumType>this.formGroup.get("audioMedium")?.value) ?? AudioMediumType.NONE;
    let conferenceSystem = (<ConferenceSystemType>this.formGroup.get("conferenceSystem")?.value) ?? ConferenceSystemType.NONE;
    let constructionEffort = (<ConstructionEffortType>this.formGroup.get("constructionEffort")?.value) ?? ConstructionEffortType.NONE;
    let technicalEffort = (<TechnicalEffortType>this.formGroup.get("technicalEffort")?.value) ?? TechnicalEffortType.NONE;
    let usageTime = this.formGroup.get("usageTime")?.value || 0;
    let req: RoomCreateRequest = {
      name: name,
      nameExtension: (nameExtended === "" ? undefined : nameExtended),
      buildingId: building,
      type: type,
      accessible: accessibility,
      utilization: utilization,
      capacity: capacity % 1,
      imageMedium: imageMedium,
      audioMedium: audioMedium,
      conferenceSystem: conferenceSystem,
      constructionEffort: constructionEffort,
      technicalEffort: technicalEffort,
      usageTime: usageTime
    }
    this.backend.room.create(req).subscribe({
      next: (res) => {
        this.loading = false;
        this.showSuccess = true;
        this.showError = false;
        this.errorMessage = "";
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.showError = true;
        this.showSuccess = false;
        this.errorMessage = err.status + " | " + err.message + " | " + JSON.stringify(err.error);
      }
    });
  }


}
