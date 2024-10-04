import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEtudiantsComponent } from './all-etudiants.component';

describe('AllEtudiantsComponent', () => {
  let component: AllEtudiantsComponent;
  let fixture: ComponentFixture<AllEtudiantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllEtudiantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
