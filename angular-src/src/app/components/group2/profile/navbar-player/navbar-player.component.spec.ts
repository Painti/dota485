import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPlayerComponent } from './navbar-player.component';

describe('NavbarPlayerComponent', () => {
  let component: NavbarPlayerComponent;
  let fixture: ComponentFixture<NavbarPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
