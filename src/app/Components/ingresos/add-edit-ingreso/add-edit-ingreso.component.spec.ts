import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditIngresoComponent } from './add-edit-ingreso.component';

describe('AddEditIngresoComponent', () => {
  let component: AddEditIngresoComponent;
  let fixture: ComponentFixture<AddEditIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditIngresoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
