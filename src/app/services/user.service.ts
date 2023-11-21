import { User } from 'src/app/models/user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {firstValueFrom, lastValueFrom} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User;

  constructor(private db: AngularFirestore) {}

  async getUser(uid: string) {
    try {
      const userDoc = (await firstValueFrom(this.db.collection('usuarios').doc(uid).get())).data() as User
      // const userDoc = await firstValueFrom(this.db.collection('usuarios',(ref)=> ref.where('userid','==', uid )).get())
      if (userDoc) {
        this.user = userDoc;
        this.user.uid = uid;
        return this.user;
      } else {
        this.user = null; // Usuario no encontrado
        return null;
      }
      
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      this.user = null; // Manejar el error adecuadamente
      return null;
    }
  }

  // Getter para obtener el usuario
  getUserInfo(): User {
    return this.user;
  }

  
  public get fullName() : string {
    return `${this.user.name} ${this.user.apellido}`;
  }
  

  
}
