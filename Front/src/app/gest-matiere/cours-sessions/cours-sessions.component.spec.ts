import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursSessionsComponent } from './cours-sessions.component';

describe('CoursSessionsComponent', () => {
  let component: CoursSessionsComponent;
  let fixture: ComponentFixture<CoursSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursSessionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
