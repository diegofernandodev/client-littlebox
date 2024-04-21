import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTerceroComponent } from './crear-tercero.component';

describe('CrearTerceroComponent', () => {
  let component: CrearTerceroComponent;
  let fixture: ComponentFixture<CrearTerceroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearTerceroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearTerceroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
