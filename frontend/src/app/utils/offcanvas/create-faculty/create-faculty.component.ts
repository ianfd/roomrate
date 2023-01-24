import {Component, OnInit} from '@angular/core';
import {NgbActiveOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {BackendService} from "../../../services/backend.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-faculty',
  templateUrl: './create-faculty.component.html',
  styleUrls: ['./create-faculty.component.scss']
})
export class CreateFacultyComponent implements OnInit {

  public loading: boolean = false;
  public showSuccess: boolean = false;
  public showError: boolean = false;

  public errorMessage: string = "";

  public formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.max(511), Validators.min(5)/*, Validators.pattern(/^\\s*$/)*/]),
    nameShort: new FormControl('', [Validators.required, Validators.max(31), Validators.min(1)/*,Validators.pattern(/^\\s*$/)*/]),
  })

  constructor(public activeOffcanvas: NgbActiveOffcanvas, private backend: BackendService, private router: Router) {

  }

  ngOnInit(): void {

  }

  public create(): void {
    this.loading = true;
    const name = this.formGroup.get("name")?.value
    const nameShort = this.formGroup.get("nameShort")?.value
    if (this.formGroup.valid && name && nameShort) {
      this.backend.faculty.create({name: name, nameShort: nameShort}).subscribe({
        next: (res) => {
          this.loading = false;
          this.showError = false;
          this.errorMessage = "";
          this.showSuccess = true;
        },
        error: (err: HttpErrorResponse) => {
          switch (err.status) {
            case 401:
              this.backend.logout(true);
              this.router.navigateByUrl("");
              this.activeOffcanvas.close();
              break;
            default:
              this.showError = true;
              this.loading = false;
              this.showSuccess = false;
              this.errorMessage = err.status + " | " + err.message + " | " + JSON.stringify(err.error)
              console.log(err);
              break;
          }

        }
      });

    } else {
      this.loading = false;
      this.showSuccess = false;
      this.showError = true;
      this.errorMessage = JSON.stringify(this.formGroup.errors);
    }
  }

}
