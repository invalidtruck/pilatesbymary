import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { paquete } from '../models/paquetes.model';

@Injectable({
  providedIn: 'root',
})
export class PackagesService {
  constructor(private db: AngularFirestore) {}

  list() {
    return this.db
      .collection('Paquetes', q=>q.orderBy('sesiones','asc'))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as paquete;
            const uid = a.payload.doc.id;
            return { uid, ...data };
          });
        })
      );
  }
}
