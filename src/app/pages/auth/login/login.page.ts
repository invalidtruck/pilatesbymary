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


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup= new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private router: Router,
    private auth: FirebaseService,
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
  
    const user: User ={
      email: this.form.value.email,
      password: this.form.value.password
    }
    try {
      let data = await this.auth.login(user); 
      if (data) this.router.navigate(['/tabs']);
    } catch (error) {
      // Manejar errores aquí si es necesario
    }
  }
  


  get f():{[key: string]:AbstractControl}{
    return this.form.controls
  }
  
}
