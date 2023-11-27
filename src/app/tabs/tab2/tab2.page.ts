import { Component } from '@angular/core';
import { sesion } from 'src/app/models/sesiones.model';
import { ClassesService } from 'src/app/services/classes.service';
import { SesionesService } from 'src/app/services/sesiones.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  isConsulting: boolean = false;
  today = new Date(Date.now()).toISOString();
  selDate: Date;
  date: string | undefined;
  type: 'string' | undefined; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  Sesiones:sesion[];
  SelClass: sesion;
  constructor(
    private sesionService: SesionesService,
    private classSvc: ClassesService
  ) {}

  onDateSelected($event: any) {
    const fechasel = new Date($event.detail.value);
    // this.today= $event.detail.value;

    this.isConsulting = true;
    this.selDate = fechasel;
    this.sesionService.getSesionsByDay($event.detail.value).subscribe((s) => {
      this.Sesiones = s;
      this.isConsulting = false;
    });
  }

  async getListaEspera(claseuid: string) {
    let data= await this.classSvc.obtenerRegistroClases(claseuid).toPromise();
    return data;
  }
  detalles(classuid: string) {}

  cancelar($event){

  }

  onWillDismiss(event){

  }
}
