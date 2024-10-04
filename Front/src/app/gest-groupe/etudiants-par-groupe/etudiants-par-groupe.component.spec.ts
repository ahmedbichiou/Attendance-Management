import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantsParGroupeComponent } from './etudiants-par-groupe.component';

describe('EtudiantsParGroupeComponent', () => {
  let component: EtudiantsParGroupeComponent;
  let fixture: ComponentFixture<EtudiantsParGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantsParGroupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtudiantsParGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
