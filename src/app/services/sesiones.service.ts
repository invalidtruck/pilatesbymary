import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { sesion } from '../models/sesiones.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SesionesService {
  constructor(private db: AngularFirestore) {}
  private collectionName = 'Sesiones';

  getSesionsByDay(fecha: Date) {
    var fechaD = new Date(fecha);
    const fechaIni = new Date(
      fechaD.getFullYear(),
      fechaD.getMonth(),
      fechaD.getDate()
    );
    const fechaFin = new Date(
      fechaD.getFullYear(),
      fechaD.getMonth(),
      fechaD.getDate() + 1
    );

    return this.db
      .collection<sesion>(this.collectionName, (query) =>
        query.where('fecha', '>=', fechaIni).where('fecha', '<=', fechaFin)
      )
      .valueChanges();
  }
  Add(sesion: sesion) {
    let oSesion: any = sesion;
    oSesion.instructor = this.db.doc(`usuarios/${sesion.instructoruid}`).ref;

    return this.db.collection<sesion>(this.collectionName).add(oSesion);
  }

  Delete(uid: string) {
    return this.db.collection(this.collectionName).doc(uid).delete();
  }
  Update(uid: string, sesion: sesion) {
    return this.db
      .collection<sesion>(this.collectionName)
      .doc(uid)
      .update(sesion);
  }
}
