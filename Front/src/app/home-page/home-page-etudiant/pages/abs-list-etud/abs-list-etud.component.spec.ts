import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsListEtudComponent } from './abs-list-etud.component';

describe('AbsListEtudComponent', () => {
  let component: AbsListEtudComponent;
  let fixture: ComponentFixture<AbsListEtudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsListEtudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbsListEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
