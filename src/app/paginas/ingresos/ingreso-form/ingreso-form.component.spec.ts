import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IngresoFormComponent } from './ingreso-form.component';

describe('IngresoFormComponent', () => {
  let component: IngresoFormComponent;
  let fixture: ComponentFixture<IngresoFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IngresoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngresoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
