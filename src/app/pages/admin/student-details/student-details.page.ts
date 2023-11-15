import { paquete } from './../../../models/paquetes.model';
import { OverlayEventDetail } from '@ionic/core/components';
import { User } from 'src/app/models/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { StudentsService } from 'src/app/services/students.service';
import { IonModal } from '@ionic/angular';
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
  esInscrito: boolean;
  today:Date= new Date();

  //modal Variables
  fechaInicio: string;
  fechaFinal: string;
  diferenciaDias: number;
  paymentinfo: userPayment
  paqueteSel: paquete;
  paquetes: paquete[];

  constructor(
    private location: Location,
    private srv: StudentsService,
    private paqsrv: PackagesService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.student = this.location.getState();
    this.esInscrito = this.student.fechainscripcion !== undefined;
    this.srv.getAllClasses(this.student.uid).subscribe((s) => {
      this.ctotal = s.reduce((total, current) => total + current.sesiones_restantes, 0);
      this.ptotal = this.student.totalclases / this.ctotal;
    });

    this.paqsrv.list().subscribe((s) => {
      this.paquetes = s;
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

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.srv.Payment(this.student.uid, {
      fecharegistro: new Date(),
      costo:this.paqueteSel.costo,
      // paquete: paquete.uid,
      sesiones_compradas: this.paqueteSel.sesiones,
      vigencia: new Date()
    });
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(`Hello, ${ev.detail.data}!`);
    }
  }
}
