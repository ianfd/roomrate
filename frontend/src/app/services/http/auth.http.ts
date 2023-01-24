import {BackendService} from "../backend.service";
import {LoginRequest, LoginResponse, UserCreateRequest} from "../../dto/auth.dto";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

export class AuthHttp {

  constructor(private backend: BackendService) {
  }

  public login(req: LoginRequest): Observable<LoginResponse> {
    return this.backend.httpClient.post<LoginResponse>(environment.backend + "auth/login", req, this.backend.httpOptions);
  }

  public create(req: UserCreateRequest): Observable<void> {
    return this.backend.httpClient.post<void>(environment.backend + "auth/create", req, this.backend.httpOptions);
  }

}
