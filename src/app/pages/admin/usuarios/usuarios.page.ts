import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  results: User[] = [];
  public studentList = [...this.results];

  constructor(
    private srv: StudentsService,
    private modalCtrl: ModalController
    ) {}

  ngOnInit() {
    this.srv.List().subscribe((s) => {
      this.results = s;
      this.studentList = [...this.results];
    });
  }
  onSearchChange($e) {
    const query = $e.target.value.toLowerCase();
    this.studentList = this.results.filter(
      (d) =>
        d.name.toLowerCase().indexOf(query) > -1 ||
        d.apellido.toLowerCase().indexOf(query) > -1
    );
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(user) {
    return this.modalCtrl.dismiss(user, 'confirm');
  }

}
