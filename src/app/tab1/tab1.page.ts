import { Component } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { sesiones } from '../models/sesiones.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    // Aquí puedes agregar eventos al calendario
    {
      title: 'Clase de yoga',
      start: new Date(), // Fecha y hora de inicio del evento
      end: new Date(), // Fecha y hora de finalización del evento
    },
    // Agrega más eventos según sea necesario
  ];
  selectedDate: string = '';
  countClases: number = 0;
  clases: Array<sesiones> = [];

  constructor() {
    this.clases.push({
      clase: 'QABC',
      fecha: new Date(),
      instructor: 'MARY GARCIA',
      tiempo: 50,
    });
  }

  onDateSelect(event: any) {
    this.selectedDate = event.format('YYYY-MM-DD');
  }
  segmentChanged(event: any) {
    alert(event.detail.value);
  }
}
