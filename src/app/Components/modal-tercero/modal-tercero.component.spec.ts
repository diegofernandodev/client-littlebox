import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTerceroComponent } from './modal-tercero.component';

describe('ModalTerceroComponent', () => {
  let component: ModalTerceroComponent;
  let fixture: ComponentFixture<ModalTerceroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalTerceroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalTerceroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
