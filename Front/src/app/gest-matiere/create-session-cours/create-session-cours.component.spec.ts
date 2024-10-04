import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSessionCoursComponent } from './create-session-cours.component';

describe('CreateSessionCoursComponent', () => {
  let component: CreateSessionCoursComponent;
  let fixture: ComponentFixture<CreateSessionCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSessionCoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSessionCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
