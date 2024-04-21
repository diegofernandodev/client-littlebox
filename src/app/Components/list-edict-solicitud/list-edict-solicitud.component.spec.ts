import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEdictSolicitudComponent } from './list-edict-solicitud.component';

describe('ListEdictSolicitudComponent', () => {
  let component: ListEdictSolicitudComponent;
  let fixture: ComponentFixture<ListEdictSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListEdictSolicitudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListEdictSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
