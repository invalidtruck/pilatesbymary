import { ClassesService } from 'src/app/services/classes.service';
import { Location } from '@angular/common';
import { sesion } from '../../../models/sesiones.model';
import { SesionesService } from './../../../services/sesiones.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clase-detalle',
  templateUrl: './clase-detalle.page.html',
  styleUrls: ['./clase-detalle.page.scss'],
})
export class ClaseDetallePage implements OnInit {
  clase: any;
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  constructor(private location: Location, private csvv: ClassesService) {
    this.clase = this.location.getState();
  }

  cancelar($ev:any){
    if($ev.detail.role =="confirm")
      this.csvv.cancelar(this.clase.id);
  }
  ngOnInit() {}
}
