import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSuperUsuarioComponent } from './crear-super-usuario.component';

describe('CrearSuperUsuarioComponent', () => {
  let component: CrearSuperUsuarioComponent;
  let fixture: ComponentFixture<CrearSuperUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearSuperUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearSuperUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
