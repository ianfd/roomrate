import {Component, OnInit} from '@angular/core';
import {BuildingDto} from "../dto/building.dto";
import {FacultyDto} from "../dto/faculty.dto";
import {BackendService} from "../services/backend.service";
import {Router} from "@angular/router";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {HttpErrorResponse} from "@angular/common/http";
import {CreateBuildingComponent} from "../utils/offcanvas/create-building/create-building.component";

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements OnInit {

  public loading: boolean = false;
  public showError: boolean = false;

  public errorMessage: string = "";

  public buildings: BuildingDto[] = [];
  public faculties: Map<string, FacultyDto> = new Map<string, FacultyDto>();

  constructor(private backend: BackendService, private router: Router, private offCanvasService: NgbOffcanvas) {
  }

  ngOnInit(): void {
    this.loadFaculties()
  }

  public loadFaculties(): void {
    this.backend.faculty.getAll().subscribe({
      next: (res) => {
        this.faculties.clear();
        for (const r of res) {
          this.faculties.set(r.id, r);
        }
        this.loadBuildings();
      },
      error: (err: HttpErrorResponse) => {
        this.showError = true;
        this.loading = false;
        this.errorMessage = err.status + " | " + err.message + " | " + JSON.stringify(err.error);
      }
    })
  }

  public loadBuildings(): void {
    this.loading = true;
    this.backend.building.getAll().subscribe({
      next: (res) => {
        this.buildings = res;
        this.loading = false;
        this.showError = false;
        this.errorMessage = "";
      },
      error: (err: HttpErrorResponse) => {
        this.showError = true;
        this.loading = false;
        this.errorMessage = err.status + " | " + err.message + " | " + JSON.stringify(err.error);
      }
    })
  }

  public startCreate(): void {
    const r = this.offCanvasService.open(CreateBuildingComponent);
    r.componentInstance.faculties = [...this.faculties.values()];
    r.result.then((result) => {
      console.log("closed")
      this.loadBuildings();
    }, (reason) => {
      console.log("dismissed")
    });
  }

}
