import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlectedEtudiantComponent } from './slected-etudiant.component';

describe('SlectedEtudiantComponent', () => {
  let component: SlectedEtudiantComponent;
  let fixture: ComponentFixture<SlectedEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlectedEtudiantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlectedEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
