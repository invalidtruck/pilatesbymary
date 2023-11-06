import { User } from './../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { userPayment } from '../models/userPayment.model';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private db:AngularFirestore) {

   }

List(){
  return this.db
  .collection<User>("usuarios",
    q=> q.where('isAdmin',"!=",true)
  ).snapshotChanges()
  .pipe(
    map(actions => {
      return actions.map(a => {
        let data = a.payload.doc.data() as User;
        data.fechainscripcion = data.fechainscripcion.toDate();
        data.fecharegistro = data.fecharegistro.toDate();
        const uid = a.payload.doc.id; // Obtener el uid del documento
        return { uid, ...data };
      });
    })
  );
}

Inscription(User:User)
{

}
Payment(userPayment: userPayment){

}

AddClasses(){

}
getAllClasses(userid:string){
return this.db.collection("usuarios").doc(userid)
              .collection("payments", q=>q.where("vigencia",">=",new Date()))
.snapshotChanges()
.pipe(
  map(actions => {
    return actions.map(a => {
      let data = a.payload.doc.data() as userPayment;
      const uid = a.payload.doc.id; // Obtener el uid del documento
      return { uid, ...data };
    });
  }));
}
}
