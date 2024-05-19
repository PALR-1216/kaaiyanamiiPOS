import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthmovilComponent } from './athmovil.component';

describe('AthmovilComponent', () => {
  let component: AthmovilComponent;
  let fixture: ComponentFixture<AthmovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthmovilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AthmovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
