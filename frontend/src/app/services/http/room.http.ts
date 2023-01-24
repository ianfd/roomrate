import {BackendService} from "../backend.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {RoomCreateRequest, RoomDto} from "../../dto/room.dto";

export class RoomHttp {

  constructor(private backend: BackendService) {
  }

  public count(): Observable<number> {
    return this.backend.httpClient.get<number>(environment.backend + "room/count", this.backend.httpOptions);
  }

  public getAll(page: number, limit: number): Observable<RoomDto[]> {
    return this.backend.httpClient.get<RoomDto[]>(environment.backend + "room/all?page=" + page + "&limit=" + limit, this.backend.httpOptions);
  }

  public create(req: RoomCreateRequest): Observable<void> {
    return this.backend.httpClient.post<void>(environment.backend + "room/create", req, this.backend.httpOptions);
  }

  public delete(id: string): Observable<void> {
    return this.backend.httpClient.get<void>(environment.backend + "room/delete?id="+id, this.backend.httpOptions);
  }

}
