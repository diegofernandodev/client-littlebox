import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeleteIngresosComponent } from './list-delete-ingresos.component';

describe('ListDeleteIngresosComponent', () => {
  let component: ListDeleteIngresosComponent;
  let fixture: ComponentFixture<ListDeleteIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListDeleteIngresosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDeleteIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
