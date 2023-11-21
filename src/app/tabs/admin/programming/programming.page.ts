import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Observable } from 'rxjs';
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

@Component({
  selector: 'app-programming',
  templateUrl: './programming.page.html',
  styleUrls: ['./programming.page.scss'],
})
export class ProgrammingPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  today: any = new Date().getUTCFullYear();
  Sesiones: sesion[];
  isConsulting: boolean = false;
  selDate: Date = new Date();
  form: FormGroup;

  maskedHora: MaskitoOptions = {
    mask: /([0-2])\d:[0-5]\d/,
  };

  constructor(
    private sesionService: SesionesService,
    private fb: FormBuilder,
    private userService: UserService,
    private toastController: ToastController
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
    this.sesionService.getSesionsByDay($event.detail.value).subscribe((s) => {
      this.Sesiones = s;
      this.isConsulting = false;
    });
  }
}
