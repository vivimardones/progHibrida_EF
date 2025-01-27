import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaPublicacionComponent } from './lista-publicacion.component';

describe('ListaPublicacionComponent', () => {
  let component: ListaPublicacionComponent;
  let fixture: ComponentFixture<ListaPublicacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ListaPublicacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
