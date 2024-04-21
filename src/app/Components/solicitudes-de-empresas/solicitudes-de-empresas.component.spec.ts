import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesDeEmpresasComponent } from './solicitudes-de-empresas.component';

describe('SolicitudesDeEmpresasComponent', () => {
  let component: SolicitudesDeEmpresasComponent;
  let fixture: ComponentFixture<SolicitudesDeEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudesDeEmpresasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudesDeEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
