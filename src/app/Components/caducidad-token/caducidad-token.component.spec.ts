import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaducidadTokenComponent } from './caducidad-token.component';

describe('CaducidadTokenComponent', () => {
  let component: CaducidadTokenComponent;
  let fixture: ComponentFixture<CaducidadTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaducidadTokenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaducidadTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
