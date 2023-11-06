import { User } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.page.html',
  styleUrls: ['./student-details.page.scss'],
})
export class StudentDetailsPage implements OnInit {
  student: User;
  ctotal: number = 0;
  ptotal:number=0;
  constructor(private location: Location, private srv: StudentsService) {}

  ngOnInit() {
    this.student = this.location.getState();
    this.srv.getAllClasses(this.student.uid).subscribe((s) => {
      this.ctotal = s.reduce((total, current) => total + current.sesiones, 0);
      this.ptotal= (this.student.totalclases/ this.ctotal);
    });
  }

 

  inscribir() {
    
  }

  mostrarPaquetesModal() {
    alert('sisoy!');
  }
}
