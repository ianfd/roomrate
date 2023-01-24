import {BackendService} from "../backend.service";
import {FacultyCreateDto, FacultyDto, FacultyEditDto} from "../../dto/faculty.dto";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

export class FacultyHttp {


  constructor(private backend: BackendService) {
  }

  public create(req: FacultyCreateDto): Observable<void> {
    return this.backend.httpClient.post<void>(environment.backend + "faculty/create", req, this.backend.httpOptions);
  }

  public getAll(): Observable<FacultyDto[]> {
    return this.backend.httpClient.get<FacultyDto[]>(environment.backend + "faculty/all", this.backend.httpOptions);
  }

  public edit(req: FacultyEditDto): Observable<void> {
    return this.backend.httpClient.post<void>(environment.backend + "faculty/edit", req, this.backend.httpOptions);
  }

  public getId(id: string): Observable<FacultyDto | undefined> {
    return this.backend.httpClient.get<FacultyDto | undefined>(environment.backend + "faculty/id?id=" + id, this.backend.httpOptions);
  }


}
