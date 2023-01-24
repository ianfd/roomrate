import {Component, OnInit} from '@angular/core';
import {BackendService} from "../services/backend.service";
import {Router} from "@angular/router";
import {FacultyDto} from "../dto/faculty.dto";
import {HttpErrorResponse} from "@angular/common/http";
import {BuildingDto} from "../dto/building.dto";
import {RoomDto} from "../dto/room.dto";
import {CreateRoomComponent} from "../utils/offcanvas/create-room/create-room.component";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public loading: boolean = true;
  public showError: boolean = false;

  public errorMessage: string = "";

  public faculties: Map<string, FacultyDto> = new Map<string, FacultyDto>();
  public buildings: Map<string, BuildingDto> = new Map<string, BuildingDto>();

  public roomCount: number = 0;
  public page: number = 1;
  public pageSize: number = 15;

  public rooms: RoomDto[] = [];

  constructor(private backend: BackendService, private router: Router, private offcanvasService: NgbOffcanvas) {
  }

  ngOnInit(): void {
    if (!this.backend.isLoggedIn) {
      this.backend.logout(true);
      this.router.navigateByUrl("");
    } else {
      this.loadFaculties();
    }
  }

  public loadFaculties(): void {
    this.loading = true;
    this.backend.faculty.getAll().subscribe({
      next: (res) => {
        this.faculties.clear();
        for (const f of res) {
          this.faculties.set(f.id, f);
        }
        this.loadBuildings();
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

  public loadBuildings(): void {
    this.loading = true;
    this.backend.building.getAll().subscribe({
      next: (res) => {
        this.faculties.clear();
        for (const f of res) {
          this.buildings.set(f.id, f);
        }
        this.loading = false;
        this.showError = false;
        this.errorMessage = "";
        this.loadRoomsCount();
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

  public loadRoomsCount(): void {
    this.loading = true;
    this.backend.room.count().subscribe({
      next: (res) => {
        this.roomCount = res;
        this.loading = false;
        this.errorMessage = "";
        this.showError = false;
        this.page = 1;
        this.loadRooms();
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
    })
  }

  public loadRooms(): void {
    this.backend.room.getAll(this.page - 1, this.pageSize).subscribe({
      next: (res) => {
        this.showError = false;
        this.errorMessage = "";
        this.rooms = res;
        console.log(res)
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
    })
  }


  public reloadReset(): void {
    this.page = 1;
    this.loadRoomsCount();
  }

  public delete(id: string): void {
    this.backend.room.delete(id).subscribe({
      next: (res) => {
        this.showError = false;
        this.reloadReset();
      },
      error: (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = err.status + " | " + err.message + " | " + JSON.stringify(err.error);
      }
    })
  }

  public startCreate(): void {
    const r = this.offcanvasService.open(CreateRoomComponent);
    r.componentInstance.buildings = [...this.buildings.values()];
    r.result.then((result) => {
      console.log("closed")
      this.reloadReset();
    }, (reason) => {
      console.log("dismissed")
    });
  }

  public formatNum(num: number): string {
    return num.toString().substring(0, 7);
  }

}
