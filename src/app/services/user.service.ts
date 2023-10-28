import { User } from 'src/app/models/user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User;
  constructor(private db: AngularFirestore) {}

  async getUser(user: User) {
    let users = await this.db.collection('users').doc(user.uid);
    
  }
}
