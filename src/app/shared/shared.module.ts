import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomInputComponent } from './components/custom-input/custom-input.component';



@NgModule({
  declarations: [CustomInputComponent],
  exports:[CustomInputComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SharedModule { }
