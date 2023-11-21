
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirebaseService } from './services/firebase.service';
import { FcmService } from "./services/fcm/fcm.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private firebaseService: FirebaseService, private fcm:FcmService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.firebaseService.checkAuthState(); // Verifica el estado de autenticación
      this.fcm.initPush();
    });
  }

  

}

