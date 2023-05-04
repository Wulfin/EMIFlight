import {Component, OnInit} from '@angular/core';
import {Plane} from "../model/plane";
import {PlaneService} from "../service/plane.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {AuthService} from "../service/authentication/auth.service";

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  public planes!: Plane[];
  public editPlane!: Plane;
  public deletePlane!: Plane;

  constructor(private planeService: PlaneService, private authService: AuthService) { }

  secondFunction = async () => {
    await this.authService.isAuthenticated()
  }

  ngOnInit() {
    this.secondFunction()
  }

  public getPlanes(): void {
    this.planeService.getPlanes().subscribe(
      (response: Plane[]) => {
        this.planes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddPlane(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('' +
      'add-plane-form').click();
    this.planeService.addPlane(addForm.value).subscribe(
      (response: Plane) => {
        console.log(response);
        this.getPlanes();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdatePlane(plane: Plane): void {
    this.planeService.updatePlane(plane).subscribe(
      (response: Plane) => {
        console.log(response);
        this.getPlanes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePlane(planeId: string): void {
    this.planeService.deletePlane(planeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getPlanes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchPlanes(key: string): void {
    const results: Plane[] = [];
    for (const plane of this.planes) {
      if (plane.model.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || plane.companyName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(plane);
      }
    }
    this.planes = results;
    if (results.length === 0 || !key) {
      this.getPlanes();
    }
  }

  public onOpenModal(plane: Plane, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPlaneModal');
    }
    if (mode === 'edit') {
      this.editPlane = plane;
      button.setAttribute('data-target', '#updatePlaneModal');
    }
    if (mode === 'delete') {
      this.deletePlane = plane;
      button.setAttribute('data-target', '#deletePlaneModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

}
