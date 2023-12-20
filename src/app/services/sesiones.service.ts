import { Observable, firstValueFrom, forkJoin, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { sesion } from '../models/sesiones.model';
import { registroClases } from '../models/registroClases.models';

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
      .snapshotChanges().pipe(map(actions=>{
        return actions.map(m=>{
          let data = m.payload.doc.data();
          const uid = m.payload.doc.id;
          data.fecha == data.fecha.toDate();
          return {uid,... data}
        })
      }));
  }

  getRegistrosByClaseId(clases:string[]): Observable<registroClases[]>
  { 
   
    return this.db.collection("registroClases", q=>q.where("idClase","in" , clases))
    .snapshotChanges().pipe(map(ma=>{
      return ma.map(m=>{
        let data = m.payload.doc.data() as registroClases;
        const uid = m.payload.doc.id;
       
        return {uid , ...data}
      });
    }));
  }

  Add(sesion: sesion) {
    let oSesion: any = sesion;
    oSesion.instructor = this.db.doc(`usuarios/${sesion.instructoruid}`).ref;
    oSesion.enEspera=0;
    oSesion.registrado =0;
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
