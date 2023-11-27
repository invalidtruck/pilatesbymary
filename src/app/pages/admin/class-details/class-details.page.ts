import { ToastController } from '@ionic/angular';
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
  clase: sesion;
  registroClases: registroClases[] = [];
  registrosEnEspera: registroClases[] = [];
  constructor(
    private srv: ClassesService,
    private location: Location,
    private toastctrl: ToastController
  ) {
    this.clase = this.location.getState() as any;
    this.srv.obtenerRegistroClases(this.clase.uid).subscribe((arg) => {
      this.registroClases = arg.filter(
        (f) => f.estado === 'R' || f.estado === 'A'
      );
      this.registrosEnEspera = arg.filter((f) => f.estado === 'E');
    });
  }

  ngOnInit() {}

  async editarRegistro(registro, estado) {
    try {
      await this.srv.cambiarEstado(
        registro.idClase,
        registro.idUsuario,
        estado
      );
      this.showToast('Asistencia marcada!');
    } catch (error) {
      this.showToast(error);
    }
  }
  async eliminarRegistro(registro) {
    try {
      await this.srv.EliminarDeClase(registro.idClase, registro.idUsuario);
      this.showToast(
        `se elimino el asistente ${registro.userInfo?.name} ${registro.userInfo?.apellido}`
      );
    } catch (error) {
      this.showToast(error.message);
    }
  }

  async showToast(message) {
    const toast = await this.toastctrl.create({
      animated: true,
      message: message,
      duration: 2500,
      // icon:'plus',
    });
    toast.present();
  }
}
