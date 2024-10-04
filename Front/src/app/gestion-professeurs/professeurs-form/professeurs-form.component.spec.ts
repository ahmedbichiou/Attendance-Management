import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseursFormComponent } from './professeurs-form.component';

describe('ProfesseursFormComponent', () => {
  let component: ProfesseursFormComponent;
  let fixture: ComponentFixture<ProfesseursFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfesseursFormComponent]
    });
    fixture = TestBed.createComponent(ProfesseursFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
