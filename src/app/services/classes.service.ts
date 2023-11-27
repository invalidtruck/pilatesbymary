import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { sesion } from '../models/sesiones.model';
import { Observable, firstValueFrom, map, switchMap } from 'rxjs';
import { registroClases } from '../models/registroClases.models';
import { User } from 'firebase/auth';
import { updateDoc } from 'firebase/firestore/lite';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  constructor(private db: AngularFirestore) {}
  private collectionName: string = 'Sesiones';
  private registrocollectionName: string = 'Sesiones';

  misClases(
    uid: string,
    fechaIni = new Date(),
    fechaFin = new Date()
  ): Observable<any[]> {
    return this.db
      .collection<sesion>(this.collectionName, (q) =>
        q
          .where('instructoruid', '==', uid)
          .where('fecha', '>=', fechaIni)
          .where('fecha', '<=', fechaFin)
      )
      .snapshotChanges()
      .pipe(
        switchMap((sessions) =>
          Promise.all(
            sessions.map(async (session) => {
              const id = session.payload.doc.id;
              const data = session.payload.doc.data() as sesion;
              data.fecha = data.fecha.toDate();

              // Obtén los datos del usuario asociado al document reference 'instructor'
              const instructorDoc = await data.instructor.get();
              const instructorData = instructorDoc.data();

              // Retorna el objeto combinando los datos de la sesión y del usuario
              return { uid: id, ...data, instructor: instructorData };
            })
          )
        )
      );
  }

  obtenerRegistroClases(uid: string): Observable<any[]> {
    return this.db
      .collection('registroClases', (q) => q.where('idClase', '==', uid))
      .snapshotChanges()
      .pipe(
        switchMap((rclases) =>
          Promise.all(
            rclases.map(async (m) => {
              const id = m.payload.doc.id;
              let data = m.payload.doc.data() as registroClases;
              const userDoc = await data.user.get();
              const userData = userDoc.data();
              return { id, ...data, userInfo: userData };
            })
          )
        )
      );
  }



  async cancelar(uid: string) {
    try {
      await this.db.collection(this.collectionName).doc(uid).delete();

      const batch = this.db.firestore.batch();

      const querySnapshot = await this.db
        .collection(this.registrocollectionName, (q) => q.where('idClase', '==', uid))
        .get();

      querySnapshot.pipe(
        map((m) =>
          m.docs.map((doc) => {
            batch.delete(doc.ref);
          })
        )
      );

      await batch.commit();
    } catch (error) {
      console.error('Error al cancelar:', error);
    }
  }

  async cambiarEstado(claseid: string, idusuario:String, estado:String) {
    const docref = await this.db
      .collection('registroClases', (q) =>
        q.where('idClase', '==', claseid).where('idUsuario', '==', idusuario)
      )
      .get();

    await docref.forEach((f) =>
      f.docs.forEach((doc) => {
        doc.ref.update({
          estado: estado,
        });
      })
    );
  }

  async EliminarDeClase(claseid: string, idusuario: string) {
    try {
      const querySnapshot = await firstValueFrom(
        this.db.collection('registroClases',q=>q
          .where('idClase', '==', claseid)
          .where('idUsuario', '==', idusuario))
          .get()
          .pipe(
            map(query => query.docs),
          )
      );
  
      if (querySnapshot.length > 0) {
        for (const doc of querySnapshot) {
          await doc.ref.delete();
        }
        console.log('Documento(s) eliminado(s) correctamente');
      } else {
        console.log('No se encontró ningún documento que cumpla con los criterios de búsqueda.');
      }
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
    }
  }
  
}
