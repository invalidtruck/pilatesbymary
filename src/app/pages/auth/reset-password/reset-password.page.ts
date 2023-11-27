import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  form: FormGroup;
  isEmailSent: boolean = false;
  Response: string="";
  constructor(
    private auth: FirebaseService, 
    private toastController: ToastController,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email]),
      });
  }
  ngOnInit() {}
  async sendEmail() {
    try {
      if (this.form.valid)
      console.log(this.form.get('email'));
        await this.auth.forgetPassword(this.form.get('email').value);
        this.isEmailSent = true;
        this.Response= "Se enviaron las instrucciones a su correo, favor de validar"
    } catch (error) {
      this.isEmailSent=true;
      this.Response = error.message
      debugger;
    }
  }

  // async presentToast(position: 'top' | 'middle' | 'bottom') {
  //   const toast = await this.toastController.create({
  //     message: 'Hello World!',
  //     duration: 2000,
  //     position: position,
  //   });

  //   await toast.present();
  // }
}
