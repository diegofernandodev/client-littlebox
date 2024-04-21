import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSolicitudComponent } from './add-edit-solicitud.component';

describe('AddEditSolicitudComponent', () => {
  let component: AddEditSolicitudComponent;
  let fixture: ComponentFixture<AddEditSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditSolicitudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
