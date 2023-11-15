import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  Year: number = new Date().getFullYear();
  constructor(
    private router: Router,
    private auth: FirebaseService,
    private userService: UserService,
    private toastController: ToastController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
    });
  }

  async login() {
    if (!this.form.valid) return;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    try {
      let data = await this.auth.login(user);

      if (data) {
        await this.userService.getUser(data.user.uid).then((user:User)=>{
        if(!user.isAdmin)
          this.router.navigate(['tabs']);
        else
          this.router.navigate(['tabs/admin/class']);
        
        });
        }
     
    } catch (error) {
      this.presentToast(error);
      // Manejar errores aquí si es necesario
    }
  }
async presentToast(error:Error) {
  const toast = await this.toastController.create({
    message: error.message,
    duration: 2000
  });
  toast.present();
}
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
