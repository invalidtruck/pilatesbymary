import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UsuariosPage } from './usuarios.page';

describe('UsuariosPage', () => {
  let component: UsuariosPage;
  let fixture: ComponentFixture<UsuariosPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(UsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
