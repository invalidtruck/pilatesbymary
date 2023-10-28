import { User } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  userForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private auth: FirebaseService) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: new FormControl('', Validators.min(3)),
      apellido: new FormControl('', Validators.min(3)),
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
    });
  }

  async signUp() {
    if (!this.userForm.valid) return;
    const user: User = {
      name: this.userForm.controls['name'].value,
      apellido: this.userForm.controls['apellido'].value,
      email: this.userForm.controls['email'].value,
      password: this.userForm.controls['password'].value,
    };
    try {
      const data = await this.auth.Create(user);
    } catch (error) {
      console.log(error);
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

 
}
