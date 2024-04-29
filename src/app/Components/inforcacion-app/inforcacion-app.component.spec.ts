import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InforcacionAPPComponent } from './inforcacion-app.component';

describe('InforcacionAPPComponent', () => {
  let component: InforcacionAPPComponent;
  let fixture: ComponentFixture<InforcacionAPPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InforcacionAPPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InforcacionAPPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
