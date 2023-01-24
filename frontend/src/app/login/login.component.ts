import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../services/backend.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private backend: BackendService, private router: Router) {
  }

  public showError: boolean = false;
  public errorMessage: string = "";
  public loading: boolean = false;

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.min(3)]),
    password: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
    this.showError = false;
    this.errorMessage = "";
    if (this.backend.isLoggedIn) {
      this.router.navigateByUrl("/main");
    }
  }

  public login(): void {
    this.showError = false;
    this.loading = true;
    this.errorMessage = "";
    if (this.loginForm.valid) {
      let username = this.loginForm.get("username")?.value;
      let password = this.loginForm.get("password")?.value;
      this.backend.auth.login({username: username, password: password}).subscribe({
        next: (res) => {
          if (res.success && res.userInfo) {
            this.backend.login(res.userInfo.jwt, res.userInfo.username, res.userInfo.email);
            this.loading = false;
            this.router.navigateByUrl("/main");
          } else {
            this.loading = false;
            this.showError = true;
            this.errorMessage = res.message;
          }
        },
        error: (err: HttpErrorResponse) => {
          switch (err.status) {
            case 401:
              this.backend.logout(true);
              this.router.navigateByUrl("/");
              break;
            default:
              console.log(err);
              break;
          }
        }
      });

    }
  }

}
