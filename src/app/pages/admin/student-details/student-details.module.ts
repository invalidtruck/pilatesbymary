import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentDetailsPageRoutingModule } from './student-details-routing.module';

import { StudentDetailsPage } from './student-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    StudentDetailsPageRoutingModule
  ],
  declarations: [StudentDetailsPage]
})
export class StudentDetailsPageModule {}
