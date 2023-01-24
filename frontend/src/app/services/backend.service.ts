import {Injectable} from '@angular/core';
import {AuthHttp} from "./http/auth.http";
import {FacultyHttp} from "./http/faculty.http";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {UserDataDto} from "../dto/auth.dto";
import {BuildingHttp} from "./http/building.http";
import {RoomHttp} from "./http/room.http";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  public isLoggedIn: boolean = false;
  public checkedCookie: boolean = false;
  public jwt: string = "";
  public username: string = "";
  public email: string = "";
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private readonly _authHttp: AuthHttp;
  private readonly _facultyHttp: FacultyHttp;
  private readonly _buildingHttp: BuildingHttp;
  private readonly _roomHttp: RoomHttp;

  constructor(public httpClient: HttpClient, private cookieService: CookieService) {
    this.checkAuth();
    this._authHttp = new AuthHttp(this);
    this._facultyHttp = new FacultyHttp(this);
    this._buildingHttp = new BuildingHttp(this);
    this._roomHttp = new RoomHttp(this);
  }

  private checkAuth(): void {
    this.checkedCookie = true;
    if (this.cookieService.check("rr-auth") && this.cookieService.check("rr-ud")) {
      const jwt = this.cookieService.get("rr-auth");
      const ud: UserDataDto = JSON.parse(this.cookieService.get("rr-ud"));
      this.login(jwt, ud.username, ud.email);
    } else {
      this.logout();
    }
  }

  public login(jwt: string, username: string, email: string): void {
    this.jwt = jwt;
    this.username = username;
    this.email = email;
    this.isLoggedIn = true;
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': jwt
    });
    this.cookieService.set("rr-auth", jwt);
    this.cookieService.set("rr-ud", JSON.stringify({username: username, email: email}));
  }

  public logout(remove?: boolean): void {
    if (remove) {
      this.cookieService.delete("rr-auth");
      this.cookieService.delete("rr-ud")
    }
    this.isLoggedIn = false;
    this.jwt = "";
    this.username = "";
    this.email = "";
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }


  get auth(): AuthHttp {
    return this._authHttp;
  }

  get faculty(): FacultyHttp {
    return this._facultyHttp;
  }

  get building(): BuildingHttp {
    return this._buildingHttp;
  }

  get room(): RoomHttp {
    return this._roomHttp;
  }
}
