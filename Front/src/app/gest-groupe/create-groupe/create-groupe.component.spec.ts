import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupeComponent } from './create-groupe.component';

describe('CreateGroupeComponent', () => {
  let component: CreateGroupeComponent;
  let fixture: ComponentFixture<CreateGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGroupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
