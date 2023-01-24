import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BuildingCreateRequest, BuildingType} from "../../../dto/building.dto";
import {FacultyDto} from "../../../dto/faculty.dto";
import {BackendService} from "../../../services/backend.service";
import {NgbActiveOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-create-building',
  templateUrl: './create-building.component.html',
  styleUrls: ['./create-building.component.scss']
})
export class CreateBuildingComponent implements OnInit {

  public loading: boolean = false;
  public showSuccess: boolean = false;
  public showError: boolean = false;

  public errorMessage: string = "";

  @Input() faculties: FacultyDto[] = [];

  public buildings: BuildingType[] = Object.values(BuildingType);

  public formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),

    nameExtended: new FormControl('', [Validators.max(511)]),

    faculty: new FormControl('', [Validators.required]),

    buildingType: new FormControl(BuildingType.NONE, [Validators.required])
  })

  constructor(private backend: BackendService, public offCanvas: NgbActiveOffcanvas) {

  }

  ngOnInit(): void {

  }

  public create(): void {
    if (this.formGroup.valid) {
      this.loading = true;
      let name = this.formGroup.get("name")?.value ?? "";
      let nameExtended = this.formGroup.get("nameExtended")?.value ?? "";
      let faculty = this.formGroup.get("faculty")?.value ?? "";
      let buildingType = <BuildingType>this.formGroup.get("buildingType")?.value ?? BuildingType.NONE;

      let req: BuildingCreateRequest = {
        name: name.trim(),
        buildingType: buildingType,
        facultyId: faculty
      }

      if (nameExtended.trim() !== "") {
        req.nameExtension = nameExtended.trim()
      }

      this.backend.building.create(req).subscribe({
        next: (res) => {
          this.loading = false;
          this.showSuccess = true;
          this.showError = false;
          this.errorMessage = "";
        },
        error: (err: HttpErrorResponse) => {
          this.showError = true;
          this.showSuccess = false;
          this.loading = false;
          this.errorMessage = err.status + " | " + err.message + " | " + JSON.stringify(err.error);
        }
      })

    }
  }

}
