import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitaAleatoriaPage } from './cita-aleatoria.page';

describe('CitaAleatoriaPage', () => {
  let component: CitaAleatoriaPage;
  let fixture: ComponentFixture<CitaAleatoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaAleatoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
