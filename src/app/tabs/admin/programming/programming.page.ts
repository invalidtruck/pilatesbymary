import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Observable, forkJoin, of, switchMap } from 'rxjs';
import { sesion } from 'src/app/models/sesiones.model';
import { SesionesService } from 'src/app/services/sesiones.service';
import { OverlayEventDetail } from '@ionic/core/components';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';
import { ToastController } from '@ionic/angular';
import { registroClases } from 'src/app/models/registroClases.models';

@Component({
  selector: 'app-programming',
  templateUrl: './programming.page.html',
  styleUrls: ['./programming.page.scss'],
})
export class ProgrammingPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  horarios = [
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ];
  today: any = new Date().getUTCFullYear();
  Sesiones: sesion[];
  idsSesiones: string[];
  isConsulting: boolean = false;
  selDate: Date = new Date();
  form: FormGroup;
  registroClases: registroClases[];
  maskedHora: MaskitoOptions = {
    mask: /([0-2])\d:[0-5]\d/,
  };
  isModalOpen: boolean = false;
  selHora: string =  '';
  constructor(
    private sesionService: SesionesService,
    private fb: FormBuilder,
    private userService: UserService,
    private toastController: ToastController,
    private route: Router
  ) {
    this.form = this.fb.group({
      clase: new FormControl('', Validators.required),
      fecha: new FormControl(new Date()),
      instructoruid: new FormControl(this?.userService?.getUserInfo()?.userid),
      hora: new FormControl('', Validators.required),
      duracion: new FormControl('', Validators.required),
      listaespera: new FormControl('', Validators.required),
      total: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  setOpenModal(hora: string = null) {
    this.isModalOpen = true;
    this.selHora= hora;
    this.form.patchValue({
      hora: hora,
    });
  }

  confirm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.modal.dismiss(this.form.value, 'confirm');
  }
  WillPresent(event: Event) {
    this.form.reset();
  }

  onWillDismiss(event: Event) {
    this.isModalOpen = false;
    try {
      const ev = event as CustomEvent<OverlayEventDetail<sesion>>;
      if (ev.detail.role === 'confirm' && this.form.valid) {
        let sesion = ev.detail.data;
        sesion.instructoruid = this?.userService?.getUserInfo()?.uid;
        sesion.fecha = new Date();
        this.sesionService.Add(sesion).then(async (t) => {
          const toast = await this.toastController.create({
            header: 'Clase Añadida!',
            // message: 'Clase Añadida!',
            duration: 3000,
            buttons: [
              {
                icon: 'close',
                htmlAttributes: {
                  'aria-label': 'close',
                },
              },
            ],
          });
          await toast.present();
        });
      }
    } catch (error) {}
  }
  SelDia($event: any) {
    this.isConsulting = true;
    this.selDate = new Date($event.detail.value);

    this.sesionService
      .getSesionsByDay($event.detail.value)
      .pipe(
        switchMap((sesiones) => {
          this.Sesiones = sesiones;
          this.idsSesiones = sesiones.map((sesion) => sesion.uid);
          this.ordenarSesionesPorHora();

          // Devuelve un nuevo observable para switchMap
          if (this.idsSesiones.length === 0) {
            this.isConsulting = false;
            return of([]);
          }
          return this.sesionService.getRegistrosByClaseId(this.idsSesiones);
        })
      )
      .subscribe((registroClases) => {
        this.registroClases = registroClases;
        this.isConsulting = false;
      });
  }

  getClaseName(claseid) {
    return this.Sesiones.filter((f) => f.uid == claseid)[0]?.clase;
  }

  getRegistroClases(claseid) {
    return this.registroClases?.filter((f) => f.idClase === claseid)[0]
      ?.fullName;
  }

  private convertirHoraParaOrdenar(hora: string): string {
    const [hh, mm] = hora.split(':');
    return `${hh.padStart(2, '0')}:${mm.padStart(2, '0')}`;
  }

  private ordenarSesionesPorHora() {
    this.Sesiones?.sort((a, b) => {
      const horaA = this.convertirHoraParaOrdenar(a.hora);
      const horaB = this.convertirHoraParaOrdenar(b.hora);
      return horaA.localeCompare(horaB);
    });
  }
  haySesionesEnHora(hora: string): boolean {
    // Verificar si hay sesiones para la hora específica
    return this.Sesiones?.some((sesion) => sesion.hora === hora);
  }

  getSesionesEnHora(hora: string): any[] {
    // Obtener las sesiones para la hora específica
    return this.Sesiones?.filter((sesion) => sesion.hora === hora);
  }

  getDetalleClase(clase: sesion) {
    delete clase.instructor;
    if ((clase.fecha as any).seconds !== undefined)
      clase.fecha = clase.fecha.toDate();
    this.route.navigate(['class-details'], { state: clase });
  }
}
