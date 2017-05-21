import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesPlayerComponent } from './heroes-player.component';

describe('HeroesPlayerComponent', () => {
  let component: HeroesPlayerComponent;
  let fixture: ComponentFixture<HeroesPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
