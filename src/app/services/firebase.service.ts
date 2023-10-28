import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

  async login(user: User) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  async Create(user: User) {
    try {
      const data = await this.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      if (data) {
        // if data send email confirm
        const newuser = await this.db.collection('usuarios').add({
          nombre: user.name,
          apellido: user.apellido,
          fecharegistro: Date.now(),
          inscripcion: false,
          userid: data.user.uid,
          admin: false,
        });
        await data.user.sendEmailVerification();

        return data;
      }
      return null;
    } catch (error) {
      return error;
    }
  }
}
