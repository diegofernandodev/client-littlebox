import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTercerosComponent } from './list-terceros.component';

describe('ListTercerosComponent', () => {
  let component: ListTercerosComponent;
  let fixture: ComponentFixture<ListTercerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTercerosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
