import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEgresoComponent } from './crear-egreso.component';

describe('CrearEgresoComponent', () => {
  let component: CrearEgresoComponent;
  let fixture: ComponentFixture<CrearEgresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearEgresoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearEgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
