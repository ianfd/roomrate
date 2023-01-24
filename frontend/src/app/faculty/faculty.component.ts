import {Component, OnInit} from '@angular/core';
import {BackendService} from "../services/backend.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {FacultyDto} from "../dto/faculty.dto";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {CreateFacultyComponent} from "../utils/offcanvas/create-faculty/create-faculty.component";

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {

  public loading: boolean = false;
  public showError: boolean = false;

  public errorMessage: string = "";

  public faculties: FacultyDto[] = [];


  constructor(private backend: BackendService, private router: Router, private offCanvasService: NgbOffcanvas) {
    if (!this.backend.isLoggedIn) {
      this.backend.logout(true);
      this.router.navigateByUrl("");
    } else {
      this.loadFaculties();
    }
  }

  ngOnInit(): void {
  }

  public loadFaculties(): void {
    this.loading = true;
    this.backend.faculty.getAll().subscribe({
      next: (res) => {
        this.loading = false;
        this.showError = false;
        this.errorMessage = "";
        this.faculties = res;
      },
      error: (err: HttpErrorResponse) => {
        switch (err.status) {
          case 401:
            this.backend.logout(true);
            this.router.navigateByUrl("");
            break;
          default:
            console.log(err);
            this.loading = false;
            this.showError = true;
            this.errorMessage = err.status + " | " + err.message + " | " + JSON.stringify(err.error);
            break;
        }
      }
    });
  }

  public startCreate(): void {
    this.offCanvasService.open(CreateFacultyComponent).result.then(
      (result) => {
        console.log("closed reloading faculties");
        this.loadFaculties();
      },
      (reason) => {
        console.log("dismissed this one")
      }
    )
  }

}
