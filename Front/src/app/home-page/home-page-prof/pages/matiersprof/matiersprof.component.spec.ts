import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiersprofComponent } from './matiersprof.component';

describe('MatiersprofComponent', () => {
  let component: MatiersprofComponent;
  let fixture: ComponentFixture<MatiersprofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatiersprofComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatiersprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
