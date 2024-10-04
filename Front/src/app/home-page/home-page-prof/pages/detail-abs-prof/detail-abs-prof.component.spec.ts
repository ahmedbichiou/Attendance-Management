import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAbsProfComponent } from './detail-abs-prof.component';

describe('DetailAbsProfComponent', () => {
  let component: DetailAbsProfComponent;
  let fixture: ComponentFixture<DetailAbsProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAbsProfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailAbsProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
