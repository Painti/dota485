import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesPlayerComponent } from './matches-player.component';

describe('MatchesPlayerComponent', () => {
  let component: MatchesPlayerComponent;
  let fixture: ComponentFixture<MatchesPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchesPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
