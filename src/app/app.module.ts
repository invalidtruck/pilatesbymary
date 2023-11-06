import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// =============== FIREBASE ========================
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MaskitoModule } from '@maskito/angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaskitoModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}


declare global {
  interface Date {
    toDate: () => Date;
  }
}
