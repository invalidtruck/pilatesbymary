import { paquete } from './../../../models/paquetes.model';
import { OverlayEventDetail } from '@ionic/core/components';
import { User } from 'src/app/models/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { StudentsService } from 'src/app/services/students.service';
import { IonModal, ToastController } from '@ionic/angular';
import { PackagesService } from 'src/app/services/packages.service';
import { ChangeDetectorRef } from '@angular/core';
import { userPayment } from 'src/app/models/userPayment.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.page.html',
  styleUrls: ['./student-details.page.scss'],
})
export class StudentDetailsPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  student: User;
  ctotal: number = 0;
  ptotal: number = 0;
  sesionesTotalesVigentes: number = 0;
  esInscrito: boolean;
  today: Date = new Date();

  //modal Variables
  fechaInicio: any = new Date().toISOString();
  fechaFinal: any = this.getNewDate(50).toISOString();
  diferenciaDias: number;
  paymentinfo: userPayment;
  paqueteSel: paquete;
  paquetes: paquete[];
  cSesiones: number = 0;
  payments: userPayment[];
  limit: number = 5;

  constructor(
    private location: Location,
    private srv: StudentsService,
    private paqsrv: PackagesService,
    private changeDetector: ChangeDetectorRef,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.student = this.location.getState();
    this.esInscrito = this.student.fechainscripcion !== undefined;
    this.srv.getAllClasses(this.student.uid).subscribe((s) => {
      this.ctotal = s.reduce(
        (total, current) => total + current.sesiones_restantes,
        0
      );
      this.sesionesTotalesVigentes = s.reduce(
        (total, current) => total + current.sesiones_compradas,
        0
      );
      this.ptotal = this.ctotal / this.sesionesTotalesVigentes; // progressbar
    });

    // this.srv.getHistorial(this.student.uid, this.limit).subscribe((s) => {
    //   this.payments = s;
    // });

    this.paqsrv.list().subscribe((s) => {
      this.paquetes = s;
      this.paqueteSel = s[0];
    });
  }

  toggleChange(event: any) {
    if (event.detail.checked) {
      this.inscribir();
    } else {
      // Lógica cuando el toggle se desactiva
      this.esInscrito = false;
    }
  }

  paqueteSeleccionado(paquete: paquete) {
    this.paqueteSel = paquete;
  }

  inscribir() {
    const result = confirm('¿Inscribir?');
    if (result) {
      this.esInscrito = true;
      this.student.fechainscripcion = new Date();
      this.student.costoinscripcion = 1500;
      this.srv.Inscription(this.student).then(() => {
        this.changeDetector.detectChanges();
      });
    } else {
      this.esInscrito = false;
      this.changeDetector.detectChanges();
    }
  }

  mostrarPaquetesModal() {
    this.modal.present();
  }

  getNewDate(dias: number = 30) {
    const fecha = new Date();
    return new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate() + dias,
      23,
      59,
      59
    );
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    try {
      this.srv.Payment(this.student.uid, {
        fecharegistro: new Date(this.fechaInicio),
        costo: this.paqueteSel.costo,
        // paquete: paquete.uid,
        sesiones_compradas: this.paqueteSel.sesiones,
        sesiones_restantes: this.paqueteSel.sesiones,
        vigencia: new Date(this.fechaFinal),
      });
      await this.presentToast('se agregaron las sesiones!');

      this.modal.dismiss(null, 'confirm');
    } catch (error) {
      this.presentToast(error);
    }
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    await toast.present();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(`Hello, ${ev.detail.data}!`);
    }
  }
}
