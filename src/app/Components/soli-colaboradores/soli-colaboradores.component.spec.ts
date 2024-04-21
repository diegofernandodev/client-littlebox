import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoliColaboradoresComponent } from './soli-colaboradores.component';

describe('SoliColaboradoresComponent', () => {
  let component: SoliColaboradoresComponent;
  let fixture: ComponentFixture<SoliColaboradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoliColaboradoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoliColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
