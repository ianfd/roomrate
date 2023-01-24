import {BackendService} from "../backend.service";
import {Observable} from "rxjs";
import {BuildingCreateRequest, BuildingDto} from "../../dto/building.dto";
import {environment} from "../../../environments/environment";

export class BuildingHttp {

  constructor(private backend: BackendService) {
  }

  public getAll(): Observable<BuildingDto[]> {
    return this.backend.httpClient.get<BuildingDto[]>(environment.backend + "building/all", this.backend.httpOptions);
  }

  public create(req: BuildingCreateRequest): Observable<void> {
    return this.backend.httpClient.post<void>(environment.backend + "building/create", req, this.backend.httpOptions);
  }

}
