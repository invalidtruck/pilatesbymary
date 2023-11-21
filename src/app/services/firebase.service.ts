import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import {
  getAuth,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth';
import { NavController } from '@ionic/angular';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  currentUser: User | null = null;
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private navCtrl: NavController,
    private user:UserService
  ) {}

  async login(user: User) {
    try {
      await this.auth.setPersistence('local'); // Configura la persistencia local
      const authResult = await this.auth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
      this.currentUser = authResult.user; // Almacena el usuario autenticado
      return authResult;
    } catch (error) {
      return error;
    }
  }
  async logOut() {
    await this.auth.signOut();
    this.currentUser = null;
  }

  async Create(user: User) {
    try {
      const data = await this.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      if (data) {
        // if data send email confirm
        const newuser = await this.db.collection('usuarios').doc(data.user.uid).set({
          nombre: user.name,
          apellido: user.apellido,
          fecharegistro: Date.now(),
          inscripcion: false,
          userid: data.user.uid,
          isAdmin: false,
          totalclases: 0,
          fechainscripcion: null,
        });
        await data.user.sendEmailVerification();
        return data;
      }
      return null;
    } catch (error) {
      return error;
    }
  }

  async checkAuthState() {
    this.auth.authState.subscribe(async (user) => {
      if (user) {
     const userInfo = await this.user.getUser(user.uid);
     if(userInfo.isAdmin)
        // Usuario autenticado, redirige a la página deseada
        this.navCtrl.navigateRoot('tabs/admin/class'); 
        else
        this.navCtrl.navigateRoot('tabs'); 
      } else {
        // Usuario no autenticado, muestra la página de inicio de sesión
        this.navCtrl.navigateRoot('/login');
      }
    });
  }
}
