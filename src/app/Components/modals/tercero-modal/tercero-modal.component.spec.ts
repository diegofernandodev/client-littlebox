import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerceroModalComponent } from './tercero-modal.component';

describe('TerceroModalComponent', () => {
  let component: TerceroModalComponent;
  let fixture: ComponentFixture<TerceroModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerceroModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TerceroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
