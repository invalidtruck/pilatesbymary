import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {
  Students: User[];
  studentsWithHeader: User[]; // Lista que incluirá encabezados especiales

  constructor(private studentsService: StudentsService, private router:Router) {}

  ngOnInit() {
    this.studentsService.List().subscribe((s) => {
      this.Students = s;
      this.studentsWithHeader = this.addSpecialHeader(this.Students);
    });
  }


  details(student:User){
    this.router.navigate(['/student-details'],{state:student}); 
  }
// Función para agregar el encabezado especial
addSpecialHeader(students: User[]): User[] {
  const studentsWithHeader = [];
  let headerAdded = false; // Para evitar agregar el encabezado más de una vez

  for (const student of students) {
    if (student.fechainscripcion === null) {
      if (!headerAdded) {
        studentsWithHeader.push({
          fechainscripcion: null,
          name: 'Sin pago de inscripción',
        });
        headerAdded = true;
      }
    }
    studentsWithHeader.push(student);
  }

  return studentsWithHeader;
}
}
