import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfCoursGroupComponent } from './prof-cours-group.component';

describe('ProfCoursGroupComponent', () => {
  let component: ProfCoursGroupComponent;
  let fixture: ComponentFixture<ProfCoursGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfCoursGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfCoursGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
