import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAutorizedComponent } from './no-autorized.component';

describe('NoAutorizedComponent', () => {
  let component: NoAutorizedComponent;
  let fixture: ComponentFixture<NoAutorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoAutorizedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoAutorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
