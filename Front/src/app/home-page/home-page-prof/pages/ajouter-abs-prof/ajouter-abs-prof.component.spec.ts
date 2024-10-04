import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAbsProfComponent } from './ajouter-abs-prof.component';

describe('AjouterAbsProfComponent', () => {
  let component: AjouterAbsProfComponent;
  let fixture: ComponentFixture<AjouterAbsProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterAbsProfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterAbsProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
