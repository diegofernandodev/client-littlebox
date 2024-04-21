import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLegalComponent } from './modal-legal.component';

describe('ModalLegalComponent', () => {
  let component: ModalLegalComponent;
  let fixture: ComponentFixture<ModalLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalLegalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
