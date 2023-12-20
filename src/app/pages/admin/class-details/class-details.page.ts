import { ModalController, ToastController } from '@ionic/angular';
import { ClassesService } from 'src/app/services/classes.service';
import { registroClases } from './../../../models/registroClases.models';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { sesion } from 'src/app/models/sesiones.model';
import { UsuariosPage } from '../usuarios/usuarios.page';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.page.html',
  styleUrls: ['./class-details.page.scss'],
})
export class ClassDetailsPage implements OnInit {
  clase: sesion;
  registroClases: registroClases[] = [];
  registrosEnEspera: registroClases[] = [];
  isLoading:boolean=true;

  constructor(
    private srv: ClassesService,
    private location: Location,
    private toastctrl: ToastController,
    private modalCtrl: ModalController
  ) {
    this.clase = this.location.getState() as any;
    this.srv.obtenerRegistroClases(this.clase.uid).subscribe((arg) => {
      this.registroClases = arg.filter(
        (f) => f.estado === 'R' || f.estado === 'A'
      );
      this.registrosEnEspera = arg.filter((f) => f.estado === 'E');
      this.isLoading =false;
    });
  }

  ngOnInit() {}

  async editarRegistro(registro, estado) {
    try {
      
      await this.srv.cambiarEstado(
        registro.idUsuario,
        estado,
        this.clase
      );

      this.clase.registrado = this.clase.registrado +1;
      this.clase.enEspera = this.clase.enEspera -1;
      const message =
        estado == 'R' ? 'Se agrego a la clase!' : 'Asistencia marcada!';
      this.showToast(message);
    } catch (error) {
      this.showToast(error);
    }
  }
  async eliminarRegistro(registro) {
    try {
      await this.srv.EliminarDeClase(registro.idClase, registro.idUsuario, this.clase);
      this.clase.registrado = this.clase.registrado-1;
      this.showToast(
        `se elimino el asistente ${registro.userInfo?.name} ${registro.userInfo?.apellido}`
      );
    } catch (error) {
      this.showToast(error.message);
    }
  }
  async agregarRegistro() {
    try {
      const modal = await this.modalCtrl.create({
        component: UsuariosPage,
      });
      await modal.present();
      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {
        let estado = '';
        if (this.clase.registrado < this.clase.total) estado = 'R';
        else if (this.clase.enEspera < this.clase.listaespera) estado = 'E';
        else return;
        if (await this.srv.AgregarAClase(this.clase.uid, data, estado)) {
          if (estado == 'E') this.clase.enEspera = this.clase.enEspera + 1;
          if (estado == 'R') this.clase.registrado = this.clase.registrado + 1;
        }
      }
    } catch (error) {
      console.log(error);
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
