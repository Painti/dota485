import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewPlayerComponent } from './overview-player.component';

describe('OverviewPlayerComponent', () => {
  let component: OverviewPlayerComponent;
  let fixture: ComponentFixture<OverviewPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
