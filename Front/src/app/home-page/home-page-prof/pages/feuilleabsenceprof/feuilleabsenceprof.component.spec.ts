import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeuilleabsenceprofComponent } from './feuilleabsenceprof.component';

describe('FeuilleabsenceprofComponent', () => {
  let component: FeuilleabsenceprofComponent;
  let fixture: ComponentFixture<FeuilleabsenceprofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeuilleabsenceprofComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeuilleabsenceprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
