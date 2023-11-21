import { Component, OnInit, ViewChild } from '@angular/core';
import { combineLatest, tap, switchMap, BehaviorSubject } from 'rxjs';
import { ClassesService } from 'src/app/services/classes.service';
import { UserService } from 'src/app/services/user.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { sesion } from 'src/app/models/sesiones.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('slideUpDown', [
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('300ms', style({ opacity: 0, transform: 'translateY(-20%)' })),
      ]),
    ]),
  ],
})
export class ClassPage implements OnInit {
  clases: any = [];
  fullname:string
  segmentChanged$ = new BehaviorSubject<number>(1);

  constructor(
    private sesionSvc: ClassesService,
    private userSvc: UserService,
    private route:Router
  ) {}

  
  ngOnInit() {
    this.setupSegmentChangeSubscription();
    this.fullname = this.userSvc.fullName;
  }

  private setupSegmentChangeSubscription() {
    combineLatest([this.segmentChanged$]).pipe(
      tap((segment) => this.handleSegmentChange(segment.toString())),
      switchMap((segment) =>
        this.sesionSvc.misClases(this.userSvc.getUserInfo()?.uid,
        new Date()
        , this.calculateEndDate(segment.toString()))
      )
    ).subscribe((s) => {
      this.clases = s;
    });
  }

  segmentChanged($event: any) {
    this.segmentChanged$.next($event.detail.value);
  }

  private handleSegmentChange(segment: string) {
    // Puedes agregar lógica adicional si es necesario al cambiar de segmento
  }


  public mostrarDetalle(clase:sesion)
  {
    this.route.navigate(['class-details'],{state:clase})
    
  }
 

  private calculateEndDate(segment: string): Date {
    const fechaFin = new Date();
    switch (segment) {
      case '1':
        return new Date(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate(), 23, 59, 59);
      case '2':
        return new Date(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate() + 6, 23, 59, 59);
      default:
        return new Date(fechaFin.getFullYear(), fechaFin.getMonth() + 1, 0,23,59,59);
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id; // Cambia 'id' por la propiedad única de tus elementos
  }


}
