import { User } from './../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { userPayment } from '../models/userPayment.model';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private db: AngularFirestore) {}
  paymentCollectionName= 'payment';
  userCollectionName= 'usuarios';


  List() {
    return this.db
      .collection<User>(this.userCollectionName, (q) => q.where('isAdmin', '!=', true))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            let data = a.payload.doc.data() as User;
            data.fechainscripcion = data.fechainscripcion?.toDate();
            data.fecharegistro = data.fecharegistro?.toDate();
            const uid = a.payload.doc.id; // Obtener el uid del documento
            return { uid, ...data };
          });
        })
      );
  }

  async Inscription(user: User) {
    return await this.db.collection<User>(this.userCollectionName).doc(user.uid).update({
      fechainscripcion: user.fechainscripcion,
      costoinscripcion: user.costoinscripcion,
    });
  }
  Payment(uid: string, userPayment: userPayment) {
    return this.db
      .collection(this.userCollectionName)
      .doc(uid)
      .collection(this.paymentCollectionName)
      .add(userPayment);
  }

  AddClasses() {}
  getAllClasses(userid: string) {


    let now = new Date();
    now= new Date(now.getFullYear(), now.getMonth(), now.getDate(),0,0,0);

    return this.db
      .collection<userPayment>(this.userCollectionName)
      .doc(userid)
      .collection(this.paymentCollectionName, (q) => q.where('vigencia', '>=', now))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as userPayment;
            const uid = a.payload.doc.id; // Obtener el uid del documento
            return { uid, ...data };
          });
        })
      );
  }


  getHistorial(uid:string,limit:number=5)
  {
    return this.db
    .collection<userPayment>(this.userCollectionName)
    .doc(uid)
    .collection(this.paymentCollectionName, (q) => 
                                                q.limit(limit)
                                                 .orderBy("fecharegistro","desc"))
    .snapshotChanges()
    .pipe(
      map((actions) => {
        return actions.map((a) => {
          let data = a.payload.doc.data() as userPayment;

          data.fecharegistro= data.fecharegistro.toDate();
          data.vigencia= data.vigencia.toDate();
          const uid = a.payload.doc.id; // Obtener el uid del documento
          return { uid, ...data };
        });
      })
    );
  }


}
