import { ClassesService } from 'src/app/services/classes.service';
import { registroClases } from './../../../models/registroClases.models';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { sesion } from 'src/app/models/sesiones.model';


@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.page.html',
  styleUrls: ['./class-details.page.scss'],
})
export class ClassDetailsPage implements OnInit {
  clase:sesion;
  registroClases: registroClases[]=[];
  registrosEnEspera:registroClases[]=[];
  constructor(
    private srv: ClassesService,
    private location:Location
  ) { 
    this.clase= (this.location.getState() as any);
    this.srv.obtenerRegistroClases(this.clase.uid)
      .subscribe((arg) => {
        this.registroClases = arg.filter(f=>f.estado==='R');
        this.registrosEnEspera = arg.filter(f=>f.estado!='R');
      });
  }

  ngOnInit() {
  }

  editarOpciones(e)
  {

  }

  editarRegistro(e){

  }
  eliminarRegistro(e)
  {

  }
}
