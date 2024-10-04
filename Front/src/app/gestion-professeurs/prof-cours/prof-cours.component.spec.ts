import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfCoursComponent } from './prof-cours.component';

describe('ProfCoursComponent', () => {
  let component: ProfCoursComponent;
  let fixture: ComponentFixture<ProfCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfCoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
