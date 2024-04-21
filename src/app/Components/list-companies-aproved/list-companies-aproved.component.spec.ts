import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompaniesAprovedComponent } from './list-companies-aproved.component';

describe('ListCompaniesAprovedComponent', () => {
  let component: ListCompaniesAprovedComponent;
  let fixture: ComponentFixture<ListCompaniesAprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCompaniesAprovedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCompaniesAprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
