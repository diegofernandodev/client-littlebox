import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCompanySolicitudComponent } from './modal-company-solicitud.component';

describe('ModalCompanySolicitudComponent', () => {
  let component: ModalCompanySolicitudComponent;
  let fixture: ComponentFixture<ModalCompanySolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCompanySolicitudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCompanySolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
