import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsPlayerComponent } from './totals-player.component';

describe('TotalsPlayerComponent', () => {
  let component: TotalsPlayerComponent;
  let fixture: ComponentFixture<TotalsPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalsPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalsPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
